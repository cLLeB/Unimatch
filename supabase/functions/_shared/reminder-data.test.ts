import { describe, expect, it } from 'vitest'
import { buildReminderData } from '../../../scripts/build-function-data'
import generated from './reminder-data.json' with { type: 'json' }
import deadlinesSeed from '../../../data/seed/deadlines.json' with { type: 'json' }

/**
 * The Edge Function reads a generated copy of the catalogue rather than the
 * seed itself, because the Supabase CLI only reliably ships what lives under
 * supabase/functions/. A copy that can drift is a copy that will: the failure
 * mode is the job mailing students last term's deadlines, which nobody would
 * notice until a date had already passed.
 *
 * If this fails, run: npm run data:functions
 */
describe('reminder-data.json', () => {
  it('matches what the seed would generate right now', () => {
    expect(generated).toEqual(buildReminderData())
  })

  it('carries every deadline from the seed', () => {
    expect(generated.deadlines).toHaveLength(deadlinesSeed.length)
  })

  it('maps every programme to a university that exists', () => {
    const known = new Set(Object.keys(generated.universities))
    const orphans = Object.entries(generated.programmeUniversity)
      .filter(([, universityId]) => !known.has(universityId))
      .map(([programmeId]) => programmeId)
    expect(orphans).toEqual([])
  })

  it('maps every deadline to a university that exists', () => {
    const known = new Set(Object.keys(generated.universities))
    const orphans = generated.deadlines
      .filter((deadline) => !known.has(deadline.universityId))
      .map((deadline) => deadline.id)
    expect(orphans).toEqual([])
  })

  it('gives every dated deadline a parseable date', () => {
    for (const deadline of generated.deadlines) {
      if (!('closesOn' in deadline) || deadline.closesOn === undefined) continue
      expect(Number.isNaN(new Date(deadline.closesOn).getTime())).toBe(false)
    }
  })

  it('gives every deadline a source a student can check', () => {
    for (const deadline of generated.deadlines) {
      expect(deadline.sourceUrl).toMatch(/^https?:\/\//)
    }
  })
})
