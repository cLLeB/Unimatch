import type { SupabaseClient } from '@supabase/supabase-js'
import { describe, expect, it } from 'vitest'
import { SupabaseStudentRepository } from './supabaseRepository'
import { INITIAL_STATE, type StudentState } from './types'

/**
 * Signing in must only ever add.
 *
 * A student entered their profile and grades on a phone, then signed in on a
 * laptop. The laptop created an empty row, the phone loaded that empty row
 * over its own data, and the work was gone. Every case below is a device
 * meeting an account for the first time.
 */

const USER = 'user-1'

const populated: StudentState = {
  ...INITIAL_STATE,
  profile: { name: 'Caleb Kyere Boateng', email: 'caleb@example.com', school: '', track: '' },
  results: {
    examYear: 2026,
    core: { english: 'A1', mathematics: 'A1', science: 'B2', social: 'B2' },
    electives: [
      { subject: 'Elective Mathematics', grade: 'A1' },
      { subject: 'Physics', grade: 'B2' },
      { subject: 'Chemistry', grade: 'B3' },
    ],
  },
  savedProgrammeIds: ['knust-human-biology-medicine'],
}

const otherRemote: StudentState = {
  ...INITIAL_STATE,
  profile: { name: 'Someone Else', email: 'else@example.com', school: '', track: '' },
  savedProgrammeIds: ['ug-law'],
}

/** Minimal stand-in for the two PostgREST calls the repository makes. */
function fakeClient(row: StudentState | null) {
  const saved: StudentState[] = []
  let stored = row

  const client = {
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: async () =>
            stored === null
              ? { data: null, error: null }
              : {
                  data: {
                    user_id: USER,
                    name: stored.profile.name,
                    email: stored.profile.email,
                    school: stored.profile.school,
                    track: stored.profile.track,
                    results: stored.results,
                    saved_programme_ids: stored.savedProgrammeIds,
                    compared_programme_ids: stored.comparedProgrammeIds,
                    checklist: stored.checklist,
                    search_history: stored.searchHistory,
                    reminders: stored.reminders,
                    theme: stored.theme,
                  },
                  error: null,
                },
        }),
      }),
      upsert: async (row_: { name: string; results: StudentState['results'] }) => {
        saved.push({
          ...INITIAL_STATE,
          profile: { ...INITIAL_STATE.profile, name: row_.name },
          results: row_.results,
        })
        return { error: null }
      },
    }),
  } as unknown as SupabaseClient

  return { client, saved, setStored: (s: StudentState | null) => (stored = s) }
}

describe('first sign-in on a device', () => {
  it('adopts this device’s work when the account has no row yet', async () => {
    const { client, saved } = fakeClient(null)
    const loaded = await new SupabaseStudentRepository(client, USER, populated).load()

    expect(loaded).toEqual(populated)
    expect(saved).toHaveLength(1)
    expect(saved[0]!.profile.name).toBe('Caleb Kyere Boateng')
  })

  it('adopts this device’s work when the account row is empty', async () => {
    // The exact case that lost the phone's profile: a laptop had signed in
    // first and left a blank row behind.
    const { client, saved } = fakeClient(INITIAL_STATE)
    const loaded = await new SupabaseStudentRepository(client, USER, populated).load()

    expect(loaded).toEqual(populated)
    expect(saved).toHaveLength(1)
  })

  it('keeps the account when it holds something and this device does not', async () => {
    const { client, saved } = fakeClient(otherRemote)
    const loaded = await new SupabaseStudentRepository(client, USER, INITIAL_STATE).load()

    expect(loaded.profile.name).toBe('Someone Else')
    expect(loaded.savedProgrammeIds).toEqual(['ug-law'])
    expect(saved).toHaveLength(0)
  })

  it('keeps the account when both hold something, so a sign-in never overwrites', async () => {
    const { client, saved } = fakeClient(otherRemote)
    const loaded = await new SupabaseStudentRepository(client, USER, populated).load()

    expect(loaded.profile.name).toBe('Someone Else')
    expect(saved).toHaveLength(0)
  })

  it('starts empty when neither side holds anything', async () => {
    const { client } = fakeClient(null)
    expect(await new SupabaseStudentRepository(client, USER).load()).toEqual(INITIAL_STATE)
  })
})

describe('when Supabase is unreachable', () => {
  function failingClient() {
    return {
      from: () => ({
        select: () => ({
          eq: () => ({
            maybeSingle: async () => ({ data: null, error: { message: 'network down' } }),
          }),
        }),
        upsert: async () => ({ error: { message: 'network down' } }),
        delete: () => ({ eq: async () => ({ error: { message: 'network down' } }) }),
      }),
    } as unknown as SupabaseClient
  }

  it('falls back to this device rather than losing the session', async () => {
    const loaded = await new SupabaseStudentRepository(failingClient(), USER, populated).load()
    expect(loaded).toEqual(populated)
  })

  it('falls back to an empty state when the device has nothing either', async () => {
    expect(await new SupabaseStudentRepository(failingClient(), USER).load()).toEqual(INITIAL_STATE)
  })

  it('does not throw when a save fails', async () => {
    await expect(
      new SupabaseStudentRepository(failingClient(), USER).save(populated),
    ).resolves.toBeUndefined()
  })

  it('does not throw when a clear fails', async () => {
    await expect(
      new SupabaseStudentRepository(failingClient(), USER).clear(),
    ).resolves.toBeUndefined()
  })
})
