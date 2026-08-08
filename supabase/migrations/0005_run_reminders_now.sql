-- UniMatch Ghana — run the reminder job on demand
--
-- The scheduled run happens once a week at 06:00 UTC on a Monday. That is a
-- long time to wait to find out whether it works, and a long time to wait to
-- recover if a Monday is missed.
--
-- This runs the identical path: same vault secret, same pg_net call, same
-- function. Testing it therefore tests the real thing, rather than a manual
-- shortcut that could pass while the scheduled one fails.
--
-- Safe to call twice. reminder_log's primary key means the second run inside a
-- week claims nothing and sends nothing.

create or replace function public.run_reminders_now()
returns text
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.trigger_deadline_reminders();
  return 'queued';
end;
$$;

comment on function public.run_reminders_now is
  'Fires the weekly reminder job immediately, through the same pg_cron path. '
  'Service role only.';

revoke all on function public.run_reminders_now() from public;
revoke all on function public.run_reminders_now() from anon;
revoke all on function public.run_reminders_now() from authenticated;
grant execute on function public.run_reminders_now() to service_role;
