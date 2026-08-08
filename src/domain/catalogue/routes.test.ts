import { describe, expect, it } from 'vitest'
import { easierRouteFor, otherRoutesFor } from './routes'
import type { Catalogue, Programme } from './types'

/**
 * A student who misses the regular cut-off may still reach the same programme
 * by another route. Getting this wrong in either direction matters: hiding a
 * route costs them a place, inventing one wastes an application fee.
 */

const provenance = {
  source: 'Test fixture',
  year: 2026,
  lastVerified: '2026-08-08',
  confidence: 'authoritative' as const,
}

function programme(
  id: string,
  name: string,
  aggregate: number,
  overrides: Partial<Programme> = {},
): Programme {
  return {
    id,
    name,
    universityId: 'ucc',
    faculty: 'School of Business',
    degreeType: 'BSc',
    durationYears: 4,
    campus: 'Cape Coast',
    region: 'Central',
    admissionTrack: 'regular',
    qualificationLevel: 'degree',
    requirements: {
      minimumAggregate: aggregate,
      coreSubjects: [],
      electiveSubjects: [],
      notes: [],
    },
    provenance,
    ...overrides,
  }
}

const regular = programme('ucc-accounting', 'Accounting', 15)
const distance = programme('ucc-accounting-distance', 'Accounting', 24, {
  admissionTrack: 'distance',
})
const feePaying = programme('ucc-accounting-fee-paying', 'Accounting', 19, {
  admissionTrack: 'fee-paying',
})
/** Same subject, spelled with the degree in the name. */
const withDegreeInName = programme('ucc-accounting-city', 'Accounting (BSc)', 21, {
  admissionTrack: 'city-campus',
})
const elsewhere = programme('knust-accounting', 'Accounting', 12, { universityId: 'knust' })
const different = programme('ucc-marketing', 'Marketing', 17)

const catalogue: Catalogue = {
  universities: [],
  programmes: [regular, distance, feePaying, withDegreeInName, elsewhere, different],
  deadlines: [],
}

describe('other routes into the same programme', () => {
  const routes = otherRoutesFor(catalogue, regular)

  it('finds every other track at the same university', () => {
    expect(routes.map((r) => r.track)).toEqual(['distance', 'city-campus', 'fee-paying'])
  })

  it('lists the loosest first, which is the one a struggling student can reach', () => {
    expect(routes.map((r) => r.aggregate)).toEqual([24, 21, 19])
  })

  it('says how much looser each route is', () => {
    expect(routes.map((r) => r.difference)).toEqual([9, 6, 4])
  })

  it('matches a subject spelled with its degree in the name', () => {
    expect(routes.some((r) => r.programme.id === 'ucc-accounting-city')).toBe(true)
  })

  it('never includes the programme being viewed', () => {
    expect(routes.some((r) => r.programme.id === regular.id)).toBe(false)
  })

  it('never crosses to another university', () => {
    expect(routes.some((r) => r.programme.universityId !== 'ucc')).toBe(false)
  })

  it('never includes a different subject', () => {
    expect(routes.some((r) => r.programme.name === 'Marketing')).toBe(false)
  })

  it('reports a tighter route as a negative difference', () => {
    expect(otherRoutesFor(catalogue, distance).map((r) => r.difference)).toEqual([-3, -5, -9])
  })

  it('returns nothing for a programme offered one way only', () => {
    expect(otherRoutesFor(catalogue, different)).toEqual([])
  })
})

describe('suggesting a route the student can actually reach', () => {
  it('stays quiet when they already meet the one they are looking at', () => {
    expect(easierRouteFor(catalogue, regular, 12)).toBeUndefined()
    // Exactly on the cut-off still qualifies.
    expect(easierRouteFor(catalogue, regular, 15)).toBeUndefined()
  })

  it('offers the route with the most margin, not merely the nearest', () => {
    // Aggregate 20 misses regular (15) and fee-paying (19). Both city-campus
    // (21) and distance (24) admit; distance wins because a single point of
    // margin evaporates when next year's cut-off moves.
    expect(easierRouteFor(catalogue, regular, 20)?.track).toBe('distance')
  })

  it('offers a route when only the loosest admits them', () => {
    expect(easierRouteFor(catalogue, regular, 23)?.track).toBe('distance')
  })

  it('stays quiet when no route admits them', () => {
    expect(easierRouteFor(catalogue, regular, 30)).toBeUndefined()
  })

  it('stays quiet when there are no other routes at all', () => {
    expect(easierRouteFor(catalogue, different, 30)).toBeUndefined()
  })
})
