/**
 * The weekly deadline reminder.
 *
 * Invoked by pg_cron on Monday mornings (see migration 0003). Reads every
 * student who opted in, works out which upcoming deadlines touch a university
 * they have shortlisted, and sends one mail each through Resend.
 *
 * Two things this deliberately does not do:
 *
 * - It does not run for anyone who has saved nothing. There is nothing personal
 *   to tell them, and a generic list is what gets a domain marked as spam.
 * - It does not send twice in a week. reminder_log carries a unique constraint
 *   on (user_id, sent_for_week, channel), and the insert happens BEFORE the
 *   send. A crash mid-run therefore drops a mail rather than repeating one:
 *   with a sending domain that also carries our sign-in links, silence is the
 *   cheaper failure.
 */
import { createClient } from 'jsr:@supabase/supabase-js@2'
import data from '../_shared/reminder-data.json' with { type: 'json' }
import {
  deadlinesForStudent,
  hasUsableAddress,
  upcomingDeadlines,
  weekKey,
  type ReminderData,
  type StudentRow,
} from '../_shared/selection.ts'
import { renderReminder } from '../_shared/render.ts'
import { signUserId, unsubscribeUrl } from '../_shared/signature.ts'

const CHANNEL = 'email'

function required(name: string): string {
  const value = Deno.env.get(name)
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

interface SendOutcome {
  considered: number
  sent: number
  skippedNoDeadlines: number
  skippedAlreadySent: number
  failed: number
}

Deno.serve(async (request: Request): Promise<Response> => {
  // The function is deployed with --no-verify-jwt so pg_cron can reach it, so
  // this shared secret is the only thing standing between the internet and a
  // button that mails every student. Checked before anything else happens.
  const provided = request.headers.get('x-reminder-secret')
  if (!provided || provided !== Deno.env.get('REMINDER_CRON_SECRET')) {
    return new Response('Forbidden', { status: 403 })
  }

  const supabase = createClient(required('SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'))
  const resendKey = required('RESEND_API_KEY')
  const fromAddress = Deno.env.get('REMINDER_FROM_EMAIL') ??
    'UniMatch Ghana <noreply@unimatchgh.app>'
  const unsubscribeSecret = required('REMINDER_UNSUBSCRIBE_SECRET')
  const functionsBase = `${required('SUPABASE_URL')}/functions/v1`

  const now = new Date()
  const week = weekKey(now)
  const upcoming = upcomingDeadlines(data as ReminderData, now)

  const outcome: SendOutcome = {
    considered: 0,
    sent: 0,
    skippedNoDeadlines: 0,
    skippedAlreadySent: 0,
    failed: 0,
  }

  // Nothing is closing anywhere in the next month. Send no mail at all rather
  // than an empty summary.
  if (upcoming.length === 0) {
    return Response.json({ week, ...outcome, note: 'no deadlines in window' })
  }

  const { data: students, error } = await supabase
    .from('student_state')
    .select('user_id, email, name, saved_programme_ids')
    .eq('reminders->>email', 'true')

  if (error) {
    console.error('Could not read student_state', error)
    return Response.json({ error: 'query failed' }, { status: 500 })
  }

  for (const student of (students ?? []) as StudentRow[]) {
    outcome.considered += 1

    if (!hasUsableAddress(student)) {
      outcome.skippedNoDeadlines += 1
      continue
    }

    const theirs = deadlinesForStudent(
      student.saved_programme_ids ?? [],
      upcoming,
      data as ReminderData,
    )
    if (theirs.length === 0) {
      outcome.skippedNoDeadlines += 1
      continue
    }

    // Claim the week first. The unique constraint makes this the lock: if a
    // second run is already in flight, or this one is a retry, the insert
    // fails and we move on without sending.
    const claim = await supabase.from('reminder_log').insert({
      user_id: student.user_id,
      sent_for_week: week,
      channel: CHANNEL,
      deadline_ids: theirs.map((deadline) => deadline.id),
    })

    if (claim.error) {
      outcome.skippedAlreadySent += 1
      continue
    }

    try {
      const token = await signUserId(student.user_id, unsubscribeSecret)
      const link = unsubscribeUrl(functionsBase, student.user_id, token)
      const { subject, html, text } = renderReminder(student.name ?? '', theirs, link)

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [student.email.trim()],
          subject,
          html,
          text,
          // One-click unsubscribe. Gmail and Outlook surface this as a button
          // next to the sender, and its absence is itself a spam signal.
          headers: {
            'List-Unsubscribe': `<${link}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Resend responded ${response.status}: ${await response.text()}`)
      }

      const body = (await response.json()) as { id?: string }
      await supabase
        .from('reminder_log')
        .update({ provider_message_id: body.id ?? null })
        .eq('user_id', student.user_id)
        .eq('sent_for_week', week)
        .eq('channel', CHANNEL)

      outcome.sent += 1
    } catch (sendError) {
      // The claim stays. Retrying inside the same week would risk a duplicate,
      // and the log row records that this student was missed.
      console.error(`Send failed for ${student.user_id}`, sendError)
      await supabase
        .from('reminder_log')
        .update({ failed_reason: String(sendError).slice(0, 500) })
        .eq('user_id', student.user_id)
        .eq('sent_for_week', week)
        .eq('channel', CHANNEL)
      outcome.failed += 1
    }
  }

  console.log('Reminder run complete', { week, ...outcome })
  return Response.json({ week, ...outcome })
})
