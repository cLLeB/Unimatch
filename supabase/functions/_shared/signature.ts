/**
 * Signed unsubscribe links.
 *
 * The unsubscribe link has to work from an inbox, with no session and no
 * sign-in — someone who wants out should not have to log in to get out. So the
 * link carries the user id and a signature over it, and the endpoint trusts the
 * signature rather than a cookie.
 *
 * Web Crypto, so the same code runs on Deno in the Edge Function and on Node
 * under vitest.
 */

const encoder = new TextEncoder()

async function key(secret: string): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
}

function toBase64Url(bytes: ArrayBuffer): string {
  let binary = ''
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/** HMAC-SHA256 of `userId`, base64url encoded. */
export async function signUserId(userId: string, secret: string): Promise<string> {
  if (!secret) throw new Error('Refusing to sign with an empty secret')
  const signature = await crypto.subtle.sign('HMAC', await key(secret), encoder.encode(userId))
  return toBase64Url(signature)
}

/**
 * Constant-time comparison, so a caller cannot narrow the signature one
 * character at a time by timing the response.
 */
export async function verifyUserId(
  userId: string,
  token: string,
  secret: string,
): Promise<boolean> {
  const expected = await signUserId(userId, secret)
  if (expected.length !== token.length) return false

  let mismatch = 0
  for (let index = 0; index < expected.length; index += 1) {
    mismatch |= expected.charCodeAt(index) ^ token.charCodeAt(index)
  }
  return mismatch === 0
}

export function unsubscribeUrl(functionsBase: string, userId: string, token: string): string {
  const url = new URL(`${functionsBase.replace(/\/$/, '')}/unsubscribe`)
  url.searchParams.set('u', userId)
  url.searchParams.set('t', token)
  return url.toString()
}
