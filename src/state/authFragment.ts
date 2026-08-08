/**
 * What Supabase left in the URL fragment when it sent the student back.
 *
 * A magic link returns `#access_token=...&refresh_token=...&type=magiclink` on
 * success, and `#error=access_denied&error_code=otp_expired&...` when the link
 * has already been used or has timed out. Email security scanners routinely
 * open links before the student does, which consumes a one-time token, so the
 * error case is common and must read as an explanation rather than a dead end.
 */
export type AuthNotice =
  | { kind: 'signed-in' }
  | { kind: 'error'; message: string }

/** Supabase's error codes, in words a student can act on. */
const MESSAGES: Record<string, string> = {
  otp_expired:
    'That sign-in link has expired or was already opened. Links last one hour and work once. Request a new one and it will work.',
  access_denied:
    'That sign-in link is no longer valid. Request a new one and it will work.',
}

export function readAuthFragment(hash: string): AuthNotice | null {
  if (!hash || hash.length < 2) return null

  const params = new URLSearchParams(hash.replace(/^#/, ''))

  const error = params.get('error_code') ?? params.get('error')
  if (error) {
    return {
      kind: 'error',
      message:
        MESSAGES[error] ??
        params.get('error_description')?.replace(/\+/g, ' ') ??
        'That sign-in link did not work. Request a new one.',
    }
  }

  if (params.get('access_token')) return { kind: 'signed-in' }

  return null
}
