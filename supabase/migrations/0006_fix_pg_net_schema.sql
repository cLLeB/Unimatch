-- UniMatch Ghana — call pg_net by its real schema
--
-- 0003 and 0004 called extensions.net.http_post(). pg_net does not live under
-- extensions: it creates its own `net` schema and puts http_post there,
-- regardless of the `with schema` clause on create extension. Postgres reads
-- the three-part name as database.schema.function and rejects it:
--
--   0A000: cross-database references are not implemented
--
-- Nothing caught this because the only caller was a cron job whose failures go
-- to the cron.job_run_details table, not to anything anyone reads. It would
-- have failed quietly at 06:00 every Monday.

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

  perform net.http_post(
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

-- Let an operator read back what the function actually replied, so a failed run
-- is visible without database access. pg_net writes responses asynchronously,
-- so this is worth checking a few seconds after run_reminders_now().
create or replace function public.last_reminder_response()
returns table (status_code int, body text, created timestamptz)
language sql
security definer
set search_path = ''
as $$
  select r.status_code, r.content, r.created
    from net._http_response r
   order by r.created desc
   limit 5;
$$;

comment on function public.last_reminder_response is
  'The five most recent pg_net responses, newest first. Service role only.';

revoke all on function public.last_reminder_response() from public;
revoke all on function public.last_reminder_response() from anon;
revoke all on function public.last_reminder_response() from authenticated;
grant execute on function public.last_reminder_response() to service_role;
