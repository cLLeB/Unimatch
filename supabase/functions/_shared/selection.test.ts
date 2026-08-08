import { describe, expect, it } from 'vitest'
import { daysUntil as domainDaysUntil } from '../../../src/domain/deadlines/status'
import {
  daysUntil,
  deadlinesForStudent,
  hasUsableAddress,
  upcomingDeadlines,
  weekKey,
  type ReminderData,
} from './selection.ts'

/**
 * A small fixture rather than the generated file, so a catalogue edit cannot
 * make these tests pass or fail for reasons that have nothing to do with the
 * logic. reminder-data.test.ts is what guards the real file.
 */
const data: ReminderData = {
  universities: { ug: 'UG', knust: 'KNUST', ucc: 'UCC' },
  programmeUniversity: {
    'ug-law': 'ug',
    'ug-medicine': 'ug',
    'knust-business-administration': 'knust',
    'ucc-medicine': 'ucc',
  },
  deadlines: [
    { id: 'ug-open', universityId: 'ug', scope: 'General', sourceUrl: 'https://ug/1' },
    {
      id: 'ug-dated',
      universityId: 'ug',
      scope: 'Diploma to Degree',
      closesOn: '2026-08-21',
      sourceUrl: 'https://ug/2',
    },
    {
      id: 'knust-dated',
      universityId: 'knust',
      scope: 'Undergraduate',
      closesOn: '2026-08-31',
      sourceUrl: 'https://knust/1',
    },
    {
      id: 'ucc-past',
      universityId: 'ucc',
      scope: 'Regular First Degree',
      closesOn: '2026-06-15',
      sourceUrl: 'https://ucc/1',
    },
    {
      id: 'ug-far',
      universityId: 'ug',
      scope: 'Next intake',
      closesOn: '2026-12-01',
      sourceUrl: 'https://ug/3',
    },
  ],
}

/** A Saturday, so the week-boundary tests are not accidentally on a Monday. */
const SATURDAY = new Date('2026-08-08T12:00:00Z')

describe('daysUntil', () => {
  it('agrees with the domain implementation it was copied from', () => {
    // The copy exists because the Supabase CLI only reliably bundles files
    // under supabase/functions/. This is what stops the two drifting.
    const cases = ['2026-08-21', '2026-08-08', '2026-06-15', '2026-12-01', '2027-01-01']
    for (const closesOn of cases) {
      expect(daysUntil(closesOn, SATURDAY)).toBe(domainDaysUntil(closesOn, SATURDAY))
    }
  })

  it('is zero on the closing day itself and negative after', () => {
    expect(daysUntil('2026-08-08', SATURDAY)).toBe(0)
    expect(daysUntil('2026-08-07', SATURDAY)).toBe(-1)
  })

  it('ignores the time of day, so a run at 06:00 counts the same as one at noon', () => {
    const earlyMorning = new Date('2026-08-08T06:00:00Z')
    const lateNight = new Date('2026-08-08T23:59:00Z')
    expect(daysUntil('2026-08-21', earlyMorning)).toBe(daysUntil('2026-08-21', lateNight))
  })

  it('rejects a date it cannot parse rather than counting nonsense', () => {
    expect(() => daysUntil('not-a-date', SATURDAY)).toThrow(RangeError)
  })
})

describe('weekKey', () => {
  it('returns the Monday of the containing week', () => {
    expect(weekKey(SATURDAY)).toBe('2026-08-03')
  })

  it('is stable across every day of one week, which is what makes it a lock', () => {
    const monday = new Date('2026-08-03T00:00:00Z')
    const keys = new Set<string>()
    for (let offset = 0; offset < 7; offset += 1) {
      keys.add(weekKey(new Date(monday.getTime() + offset * 86_400_000)))
    }
    expect([...keys]).toEqual(['2026-08-03'])
  })

  it('rolls over on Monday, not on Sunday', () => {
    expect(weekKey(new Date('2026-08-09T23:00:00Z'))).toBe('2026-08-03') // Sunday
    expect(weekKey(new Date('2026-08-10T00:00:00Z'))).toBe('2026-08-10') // Monday
  })
})

describe('upcomingDeadlines', () => {
  it('keeps only dated deadlines inside the window, soonest first', () => {
    const result = upcomingDeadlines(data, SATURDAY)
    expect(result.map((deadline) => deadline.id)).toEqual(['ug-dated', 'knust-dated'])
    expect(result.map((deadline) => deadline.daysLeft)).toEqual([13, 23])
  })

  it('excludes open-ended intakes, which have nothing to count down to', () => {
    const result = upcomingDeadlines(data, SATURDAY)
    expect(result.some((deadline) => deadline.id === 'ug-open')).toBe(false)
  })

  it('excludes deadlines that have already passed', () => {
    const result = upcomingDeadlines(data, SATURDAY)
    expect(result.some((deadline) => deadline.id === 'ucc-past')).toBe(false)
  })

  it('excludes deadlines beyond the window', () => {
    const result = upcomingDeadlines(data, SATURDAY)
    expect(result.some((deadline) => deadline.id === 'ug-far')).toBe(false)
  })

  it('includes a deadline exactly on the window edge, and drops the next day', () => {
    // ug-dated is 13 days out from the Saturday.
    expect(upcomingDeadlines(data, SATURDAY, 13).map((d) => d.id)).toContain('ug-dated')
    expect(upcomingDeadlines(data, SATURDAY, 12).map((d) => d.id)).not.toContain('ug-dated')
  })

  it('includes a deadline closing today', () => {
    const dayBefore = new Date('2026-08-21T09:00:00Z')
    const result = upcomingDeadlines(data, dayBefore)
    expect(result.find((deadline) => deadline.id === 'ug-dated')?.daysLeft).toBe(0)
  })

  it('resolves the university short name a student would recognise', () => {
    expect(upcomingDeadlines(data, SATURDAY)[0]?.universityName).toBe('UG')
  })

  it('falls back to the id rather than printing undefined for an unknown university', () => {
    const orphaned: ReminderData = {
      ...data,
      universities: {},
    }
    expect(upcomingDeadlines(orphaned, SATURDAY)[0]?.universityName).toBe('ug')
  })

  it('returns nothing when every deadline is outside the window', () => {
    expect(upcomingDeadlines(data, new Date('2026-01-01T00:00:00Z'))).toEqual([])
  })
})

describe('deadlinesForStudent', () => {
  const upcoming = upcomingDeadlines(data, SATURDAY)

  it('returns only deadlines at universities the student saved a programme at', () => {
    const result = deadlinesForStudent(['ug-law'], upcoming, data)
    expect(result.map((deadline) => deadline.id)).toEqual(['ug-dated'])
  })

  it('covers every university the student saved, not just the first', () => {
    const result = deadlinesForStudent(['ug-law', 'knust-business-administration'], upcoming, data)
    expect(result.map((deadline) => deadline.id)).toEqual(['ug-dated', 'knust-dated'])
  })

  it('does not repeat a university when two saved programmes share one', () => {
    const result = deadlinesForStudent(['ug-law', 'ug-medicine'], upcoming, data)
    expect(result.map((deadline) => deadline.id)).toEqual(['ug-dated'])
  })

  it('sends nothing to a student who has saved nothing', () => {
    // Deliberate: a generic list of every deadline in the country is what gets
    // a sending domain marked as spam.
    expect(deadlinesForStudent([], upcoming, data)).toEqual([])
  })

  it('sends nothing when the saved university has no deadline in the window', () => {
    expect(deadlinesForStudent(['ucc-medicine'], upcoming, data)).toEqual([])
  })

  it('ignores programme ids that are no longer in the catalogue', () => {
    const result = deadlinesForStudent(['withdrawn-programme', 'ug-law'], upcoming, data)
    expect(result.map((deadline) => deadline.id)).toEqual(['ug-dated'])
  })

  it('sends nothing when every saved programme is unknown', () => {
    expect(deadlinesForStudent(['gone', 'also-gone'], upcoming, data)).toEqual([])
  })

  it('preserves the soonest-first order', () => {
    const result = deadlinesForStudent(['knust-business-administration', 'ug-law'], upcoming, data)
    expect(result.map((deadline) => deadline.daysLeft)).toEqual([13, 23])
  })
})

describe('hasUsableAddress', () => {
  it('rejects the empty string the table defaults to', () => {
    expect(hasUsableAddress({ email: '' })).toBe(false)
  })

  it('rejects whitespace only', () => {
    expect(hasUsableAddress({ email: '   ' })).toBe(false)
  })

  it('rejects a value with no @', () => {
    expect(hasUsableAddress({ email: 'kwame' })).toBe(false)
  })

  it('accepts a real address', () => {
    expect(hasUsableAddress({ email: 'ama@example.com' })).toBe(true)
  })
})
