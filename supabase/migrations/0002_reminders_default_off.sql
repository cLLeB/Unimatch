-- UniMatch Ghana: turn reminder defaults off
--
-- 0001 defaulted `reminders.email` to true, and the Deadlines page marked the
-- email channel as available. Neither was backed by anything: there is no
-- scheduled job and no sending provider wired up, so every student was opted
-- in to a weekly summary that could not be sent.
--
-- This sets the column default to all-off and clears the existing opt-ins.
-- Resetting stored rows is safe precisely because no mail was ever sent:
-- nobody is being unsubscribed from something they were receiving.
--
-- When the reminder job ships, students opt in themselves. A preference that
-- was never a real choice is not consent to carry forward.

alter table public.student_state
  alter column reminders set default
    '{"sms": false, "email": false, "whatsapp": false}'::jsonb;

update public.student_state
   set reminders = '{"sms": false, "email": false, "whatsapp": false}'::jsonb,
       updated_at = now()
 where reminders->>'email' = 'true'
    or reminders->>'sms' = 'true'
    or reminders->>'whatsapp' = 'true';
