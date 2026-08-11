-- UniMatch Ghana: let the database own the reminder cron secret
--
-- 0003 expected an operator to paste two vault.create_secret() calls into the
-- SQL editor, with a secret they invented, which then also had to be set as an
-- Edge Function env var and kept in sync. Two copies of a secret in two places
-- is a rotation problem waiting to happen, and it needs a human at a keyboard.
--
-- Instead the database generates the secret once, keeps it in Vault, and both
-- sides read it from there: pg_cron to send the header, and the Edge Function
-- to check it via verify_reminder_secret(). Nobody ever sees the value, it is
-- never in git, and rotating it is a single update.

create extension if not exists supabase_vault with schema vault;
create extension if not exists pgcrypto with schema extensions;

-- Generated once. Re-running this migration will not mint a new secret and
-- silently break the schedule.
do $$
begin
  if not exists (select 1 from vault.secrets where name = 'reminder_cron_secret') then
    perform vault.create_secret(
      encode(extensions.gen_random_bytes(32), 'base64'),
      'reminder_cron_secret',
      'Shared secret between pg_cron and the send-deadline-reminders function.'
    );
  end if;
end;
$$;

-- ── What the Edge Function calls to authenticate an incoming request ────────
create or replace function public.verify_reminder_secret(candidate text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  expected text;
begin
  select decrypted_secret into expected
    from vault.decrypted_secrets where name = 'reminder_cron_secret';

  if expected is null or candidate is null then
    return false;
  end if;

  -- Length-independent comparison. Postgres has no constant-time string
  -- compare, but the value never leaves the server and the only caller is the
  -- function itself, so a timing oracle would need service-role access already.
  return expected = candidate;
end;
$$;

comment on function public.verify_reminder_secret is
  'True when the caller presented the reminder cron secret. Service role only: '
  'execute is revoked from anon and authenticated so it cannot be used as a '
  'guessing oracle from the browser.';

revoke all on function public.verify_reminder_secret(text) from public;
revoke all on function public.verify_reminder_secret(text) from anon;
revoke all on function public.verify_reminder_secret(text) from authenticated;
grant execute on function public.verify_reminder_secret(text) to service_role;

-- ── The scheduled trigger, now self-contained ───────────────────────────────
-- The URL is not a secret, so it is written here rather than stashed in Vault.
create or replace function public.trigger_deadline_reminders()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  cron_secret text;
begin
  select decrypted_secret into cron_secret
    from vault.decrypted_secrets where name = 'reminder_cron_secret';

  if cron_secret is null then
    raise notice 'reminder_cron_secret is missing from the vault; skipping this run.';
    return;
  end if;

  perform extensions.net.http_post(
    url := 'https://fttzuizvvwekmjtdqgmh.supabase.co/functions/v1/send-deadline-reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-reminder-secret', cron_secret
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 120000
  );
end;
$$;
