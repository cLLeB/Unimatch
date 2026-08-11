import { webcrypto } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { signUserId, unsubscribeUrl, verifyUserId } from './signature.ts'

// The suite runs under jsdom, whose crypto shim has no subtle. Deno gives the
// function the real thing, so Node's WebCrypto, the same standard API, stands
// in here. The alternative, switching this file to the node environment, breaks
// on the shared jsdom setup file.
if (!globalThis.crypto?.subtle) {
  Object.defineProperty(globalThis, 'crypto', { value: webcrypto, configurable: true })
}

const SECRET = 'a-long-random-secret-value-for-tests'
const OTHER_SECRET = 'a-different-long-random-secret-value'
const USER = '3f1c9d02-6a4e-4f8b-9c11-2d7e5a0b8c33'

describe('signUserId', () => {
  it('is deterministic, so a link keeps working after a redeploy', async () => {
    expect(await signUserId(USER, SECRET)).toBe(await signUserId(USER, SECRET))
  })

  it('differs per user', async () => {
    const other = await signUserId('11111111-1111-1111-1111-111111111111', SECRET)
    expect(await signUserId(USER, SECRET)).not.toBe(other)
  })

  it('differs per secret, so rotating invalidates old links', async () => {
    expect(await signUserId(USER, SECRET)).not.toBe(await signUserId(USER, OTHER_SECRET))
  })

  it('is URL-safe, since it travels as a query parameter', async () => {
    expect(await signUserId(USER, SECRET)).toMatch(/^[A-Za-z0-9_-]+$/)
  })

  it('refuses to sign with an empty secret rather than producing a guessable token', async () => {
    await expect(signUserId(USER, '')).rejects.toThrow(/empty secret/i)
  })
})

describe('verifyUserId', () => {
  it('accepts a token it produced', async () => {
    const token = await signUserId(USER, SECRET)
    expect(await verifyUserId(USER, token, SECRET)).toBe(true)
  })

  it('rejects a token for a different user, which is the whole point', async () => {
    const token = await signUserId('11111111-1111-1111-1111-111111111111', SECRET)
    expect(await verifyUserId(USER, token, SECRET)).toBe(false)
  })

  it('rejects a token signed with a different secret', async () => {
    const token = await signUserId(USER, OTHER_SECRET)
    expect(await verifyUserId(USER, token, SECRET)).toBe(false)
  })

  it('rejects a token with a single character changed', async () => {
    const token = await signUserId(USER, SECRET)
    const flipped = (token[0] === 'a' ? 'b' : 'a') + token.slice(1)
    expect(await verifyUserId(USER, flipped, SECRET)).toBe(false)
  })

  it('rejects a truncated token rather than matching on a prefix', async () => {
    const token = await signUserId(USER, SECRET)
    expect(await verifyUserId(USER, token.slice(0, -1), SECRET)).toBe(false)
  })

  it('rejects an empty token', async () => {
    expect(await verifyUserId(USER, '', SECRET)).toBe(false)
  })
})

describe('unsubscribeUrl', () => {
  it('builds a link against the functions base', () => {
    const url = unsubscribeUrl('https://project.supabase.co/functions/v1', USER, 'tok')
    expect(url).toBe(
      `https://project.supabase.co/functions/v1/unsubscribe?u=${USER}&t=tok`,
    )
  })

  it('does not double the slash when the base has a trailing one', () => {
    const url = unsubscribeUrl('https://project.supabase.co/functions/v1/', USER, 'tok')
    expect(url).not.toContain('v1//unsubscribe')
  })

  it('percent-encodes a token, so a + in base64 could never break the link', () => {
    const url = unsubscribeUrl('https://project.supabase.co/functions/v1', USER, 'a+b/c=')
    expect(url).toContain('t=a%2Bb%2Fc%3D')
  })

  it('round-trips through a real URL parse, which is what the function does', async () => {
    const token = await signUserId(USER, SECRET)
    const parsed = new URL(unsubscribeUrl('https://p.supabase.co/functions/v1', USER, token))
    expect(parsed.searchParams.get('u')).toBe(USER)
    expect(await verifyUserId(USER, parsed.searchParams.get('t') ?? '', SECRET)).toBe(true)
  })
})
