import { describe, expect, it } from 'vitest'
import type { AdmissionDeadline } from '../catalogue/types'
import {
  CLOSING_SOON_DAYS,
  daysUntil,
  formatDeadlineDate,
  resolve,
  resolveAll,
  statusOf,
} from './status'

const NOW = new Date('2025-01-06T00:00:00Z')

function deadline(id: string, closesOn: string): AdmissionDeadline {
  return {
    id,
    universityId: 'knust',
    scope: 'All Programmes',
    closesOn,
    provenance: {
      source: 'test',
      year: 2025,
      lastVerified: '2025-01-01',
      confidence: 'estimated',
    },
  }
}

describe('daysUntil', () => {
  it('counts whole days ahead', () => {
    expect(daysUntil('2025-03-28', NOW)).toBe(81)
  })

  it('is zero on the closing day', () => {
    expect(daysUntil('2025-01-06', NOW)).toBe(0)
  })

  it('goes negative once passed', () => {
    expect(daysUntil('2024-12-31', NOW)).toBe(-6)
  })

  it('ignores the time of day', () => {
    expect(daysUntil('2025-01-07T23:59:59Z', NOW)).toBe(1)
  })

  it('rejects an unparseable date', () => {
    expect(() => daysUntil('not-a-date', NOW)).toThrow(RangeError)
  })
})

describe('statusOf', () => {
  it('is open when comfortably ahead', () => {
    expect(statusOf('2025-02-14', NOW)).toBe('open')
  })

  it('is closing soon within the threshold', () => {
    expect(statusOf('2025-01-31', NOW)).toBe('closing-soon')
  })

  it(`is closing soon at exactly ${CLOSING_SOON_DAYS} days`, () => {
    expect(statusOf('2025-02-05', NOW)).toBe('closing-soon')
  })

  it(`is open at ${CLOSING_SOON_DAYS + 1} days`, () => {
    expect(statusOf('2025-02-06', NOW)).toBe('open')
  })

  it('is closing soon on the final day', () => {
    expect(statusOf('2025-01-06', NOW)).toBe('closing-soon')
  })

  it('is closed the day after', () => {
    expect(statusOf('2025-01-05', NOW)).toBe('closed')
  })

  /** The prototype's own fixtures must classify the same way. */
  it.each([
    ['2025-03-28', 'open'],
    ['2025-01-31', 'closing-soon'],
    ['2025-02-14', 'open'],
    ['2025-01-24', 'closing-soon'],
    ['2024-12-31', 'closed'],
    ['2025-03-15', 'open'],
  ])('prototype fixture %s → %s', (date, expected) => {
    expect(statusOf(date, NOW)).toBe(expected)
  })
})

describe('resolve', () => {
  it('derives status and days rather than storing them', () => {
    expect(resolve(deadline('a', '2025-01-31'), NOW)).toMatchObject({
      status: 'closing-soon',
      daysLeft: 25,
    })
  })
})

describe('resolveAll', () => {
  it('sorts soonest first and pushes closed to the end', () => {
    const sorted = resolveAll(
      [
        deadline('far', '2025-03-28'),
        deadline('closed', '2024-12-31'),
        deadline('soon', '2025-01-24'),
      ],
      NOW,
    )
    expect(sorted.map((d) => d.id)).toEqual(['soon', 'far', 'closed'])
  })

  it('returns an empty list unchanged', () => {
    expect(resolveAll([], NOW)).toEqual([])
  })
})

describe('formatDeadlineDate', () => {
  it('renders a long-form date', () => {
    expect(formatDeadlineDate('2025-03-28')).toBe('28 March 2025')
  })
})
