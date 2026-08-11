-- UniMatch Ghana: deadline reminder log and weekly schedule
--
-- Backs supabase/functions/send-deadline-reminders. The log is not analytics:
-- its unique constraint is the only thing preventing a retried or double-fired
-- cron from mailing the same student the same summary twice.

create table if not exists public.reminder_log (
  user_id uuid not null references auth.users (id) on delete cascade,

  -- The Monday of the week the summary covers, matching weekKey() in
  -- supabase/functions/_shared/selection.ts. Ghana is GMT all year, so the
  -- UTC week and the local week are the same week.
  sent_for_week date not null,
  channel text not null check (channel in ('email', 'sms', 'whatsapp')),

  deadline_ids text[] not null default '{}',
  provider_message_id text,
  failed_reason text,
  sent_at timestamptz not null default now(),

  primary key (user_id, sent_for_week, channel)
);

comment on table public.reminder_log is
  'One row per student per week per channel. The primary key is the send lock: '
  'the function inserts before it sends, so a duplicate run loses the race and '
  'skips rather than sending twice.';

create index if not exists reminder_log_week_idx
  on public.reminder_log (sent_for_week desc);

-- ── Row-level security ──────────────────────────────────────────────────────
-- Enabled with a single read policy. The Edge Function uses the service role,
-- which bypasses RLS; students can see their own send history and nothing else.
alter table public.reminder_log enable row level security;

drop policy if exists "students read own reminder log" on public.reminder_log;
create policy "students read own reminder log"
  on public.reminder_log for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- ── The weekly schedule ─────────────────────────────────────────────────────
-- pg_cron fires the Edge Function over HTTP via pg_net.
--
-- The URL and the shared secret are read from Vault rather than written here,
-- because a migration is committed to git and a secret in git is a secret you
-- have to rotate. Create them once, in the SQL editor:
--
--   select vault.create_secret(
--     'https://fttzuizvvwekmjtdqgmh.supabase.co/functions/v1/send-deadline-reminders',
--     'reminder_function_url');
--   select vault.create_secret('<a long random string>', 'reminder_cron_secret');
--
-- The same random string goes to the function as REMINDER_CRON_SECRET:
--   npx supabase secrets set REMINDER_CRON_SECRET='<the same string>'

create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

create or replace function public.trigger_deadline_reminders()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  function_url text;
  cron_secret text;
begin
  select decrypted_secret into function_url
    from vault.decrypted_secrets where name = 'reminder_function_url';
  select decrypted_secret into cron_secret
    from vault.decrypted_secrets where name = 'reminder_cron_secret';

  if function_url is null or cron_secret is null then
    raise notice 'Reminder secrets are not in the vault; skipping this run.';
    return;
  end if;

  perform extensions.net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-reminder-secret', cron_secret
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 120000
  );
end;
$$;

comment on function public.trigger_deadline_reminders is
  'Called by pg_cron. Returns quietly if the vault secrets are absent, so an '
  'un-provisioned project schedules the job without erroring every Monday.';

-- 06:00 UTC Monday. Ghana is GMT, so that is 6am for a student in Accra:
-- before school, and early enough that a Monday deadline is still actionable.
select cron.unschedule('unimatch-deadline-reminders')
  where exists (
    select 1 from cron.job where jobname = 'unimatch-deadline-reminders'
  );

select cron.schedule(
  'unimatch-deadline-reminders',
  '0 6 * * 1',
  $$select public.trigger_deadline_reminders()$$
);
