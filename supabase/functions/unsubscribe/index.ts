/**
 * One-click unsubscribe from the reminder email.
 *
 * Reachable with no session: the link arrives in an inbox, and making someone
 * sign in to stop receiving mail is how you earn a spam complaint instead of an
 * unsubscribe. The signature on the user id is what authorises the change.
 *
 * Handles POST as well as GET because Gmail and Outlook fire a background POST
 * when a reader uses their built-in unsubscribe button (RFC 8058).
 */
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { verifyUserId } from '../_shared/signature.ts'

function required(name: string): string {
  const value = Deno.env.get(name)
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

function page(title: string, message: string, status: number): Response {
  return new Response(
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} — UniMatch Ghana</title>
</head>
<body style="margin:0;padding:48px 24px;background:#f8fafc;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:420px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:28px;">
    <div style="font-size:18px;font-weight:700;color:#0f766e;">UniMatch Ghana</div>
    <h1 style="font-size:17px;color:#0f172a;margin:16px 0 8px;">${title}</h1>
    <p style="font-size:14px;color:#475569;line-height:1.6;margin:0;">${message}</p>
    <p style="font-size:13px;color:#475569;margin-top:20px;">
      <a href="https://unimatchgh.app/deadlines" style="color:#0f766e;">
        Deadlines are still on the site
      </a>
    </p>
  </div>
</body>
</html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  )
}

Deno.serve(async (request: Request): Promise<Response> => {
  const url = new URL(request.url)
  const userId = url.searchParams.get('u')
  const token = url.searchParams.get('t')

  if (!userId || !token) {
    return page('That link is incomplete', 'Open the link from your email again.', 400)
  }

  const valid = await verifyUserId(userId, token, required('REMINDER_UNSUBSCRIBE_SECRET'))
  if (!valid) {
    return page(
      'That link is not valid',
      'It may have been altered in transit. Turn reminders off from your profile instead.',
      403,
    )
  }

  const supabase = createClient(required('SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'))

  // Read first, then write back with only the email flag cleared. An update
  // with a bare object would replace the whole jsonb value, and SMS and
  // WhatsApp are separate consents — clearing them would be deciding something
  // the reader did not ask for, even though neither is connected yet.
  const existing = await supabase
    .from('student_state')
    .select('reminders')
    .eq('user_id', userId)
    .maybeSingle()

  if (existing.error || !existing.data) {
    console.error('Unsubscribe could not read state', existing.error)
    return page(
      'We could not find that account',
      'Turn reminders off from your profile instead.',
      404,
    )
  }

  const current = (existing.data.reminders ?? {}) as Record<string, boolean>
  const { error } = await supabase
    .from('student_state')
    .update({ reminders: { ...current, email: false } })
    .eq('user_id', userId)

  if (error) {
    console.error('Unsubscribe write failed', error)
    return page(
      'We could not save that',
      'Please try the link again, or turn reminders off from your profile.',
      500,
    )
  }

  return page(
    'You are unsubscribed',
    'No more deadline emails will be sent. You can turn them back on any time from your profile.',
    200,
  )
})
