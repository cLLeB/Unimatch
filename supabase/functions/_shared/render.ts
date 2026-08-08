/**
 * The reminder email itself.
 *
 * Plain HTML with inline styles and a text alternative. Gmail strips <style>
 * blocks, Outlook ignores most of CSS, and a student on a phone in Ghana is
 * paying for the bytes — so this stays small and does not load a single remote
 * image.
 *
 * Every deadline links to the university's own portal rather than to UniMatch.
 * The site is not the authority on when applications close, and the mail should
 * not pretend otherwise.
 */
import type { SelectedDeadline } from './selection.ts'

export interface EmailContent {
  subject: string
  html: string
  text: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function countdown(daysLeft: number): string {
  if (daysLeft === 0) return 'closes today'
  if (daysLeft === 1) return '1 day left'
  return `${daysLeft} days left`
}

function formatDate(closesOn: string): string {
  return new Date(closesOn).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function subjectFor(deadlines: readonly SelectedDeadline[]): string {
  const soonest = deadlines[0]
  if (!soonest) return 'Your UniMatch deadline summary'

  if (soonest.daysLeft <= 7) {
    return `${soonest.universityName} closes in ${soonest.daysLeft} days`
  }
  return deadlines.length === 1
    ? `1 application deadline coming up`
    : `${deadlines.length} application deadlines coming up`
}

export function renderReminder(
  studentName: string,
  deadlines: readonly SelectedDeadline[],
  unsubscribeLink: string,
): EmailContent {
  const greeting = studentName.trim() ? `Hi ${studentName.trim().split(/\s+/)[0]},` : 'Hi,'

  const rows = deadlines
    .map(
      (deadline) => `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #e2e8f0;">
          <div style="font-size:15px;font-weight:600;color:#0f172a;">
            ${escapeHtml(deadline.universityName)}
          </div>
          <div style="font-size:13px;color:#475569;margin-top:2px;">
            ${escapeHtml(deadline.scope)}
          </div>
          <div style="font-size:13px;color:#0f766e;font-weight:600;margin-top:6px;">
            ${escapeHtml(countdown(deadline.daysLeft))}
            <span style="color:#475569;font-weight:400;">
              &middot; closes ${escapeHtml(formatDate(deadline.closesOn))}
            </span>
          </div>
          <a href="${escapeHtml(deadline.sourceUrl)}"
             style="font-size:13px;color:#0f766e;text-decoration:underline;">
            Check the university portal
          </a>
        </td>
      </tr>`,
    )
    .join('')

  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;padding:24px;background:#f8fafc;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0"
         style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;">
    <tr>
      <td style="padding:24px;">
        <div style="font-size:18px;font-weight:700;color:#0f766e;">UniMatch Ghana</div>
        <p style="font-size:14px;color:#0f172a;line-height:1.5;">
          ${escapeHtml(greeting)} these deadlines are coming up at universities you have shortlisted.
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${rows}</table>
        <p style="font-size:12px;color:#475569;line-height:1.5;margin-top:20px;">
          Dates are the ones each university has published, and we check them against the
          university's own page. They can still change without notice, so confirm on the
          portal before you rely on any of them.
        </p>
        <p style="font-size:12px;color:#475569;margin-top:20px;border-top:1px solid #e2e8f0;padding-top:16px;">
          You are getting this because you turned on deadline reminders.
          <a href="${escapeHtml(unsubscribeLink)}" style="color:#0f766e;">Unsubscribe</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`

  const text = [
    greeting,
    '',
    'These deadlines are coming up at universities you have shortlisted:',
    '',
    ...deadlines.map(
      (deadline) =>
        `- ${deadline.universityName} — ${deadline.scope}\n` +
        `  ${countdown(deadline.daysLeft)}, closes ${formatDate(deadline.closesOn)}\n` +
        `  ${deadline.sourceUrl}`,
    ),
    '',
    'Dates are the ones each university has published. They can still change,',
    'so confirm on the portal before you rely on any of them.',
    '',
    `Unsubscribe: ${unsubscribeLink}`,
  ].join('\n')

  return { subject: subjectFor(deadlines), html, text }
}
