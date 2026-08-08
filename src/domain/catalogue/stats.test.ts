import { describe, expect, it } from 'vitest'
import { computeStats, describeCompetitiveness, type ProgrammeStats } from './stats'
import type { Catalogue, Programme } from './types'

const provenance = {
  source: 'Test fixture',
  year: 2025,
  lastVerified: '2026-08-07',
  confidence: 'authoritative' as const,
}

function programme(
  id: string,
  name: string,
  cutoff: number,
  universityId = 'ug',
  faculty = 'Science',
): Programme {
  return {
    id,
    name,
    universityId,
    faculty,
    degreeType: 'BSc',
    durationYears: 4,
    campus: 'Accra',
    region: 'Greater Accra',
    admissionTrack: 'regular',
    qualificationLevel: 'degree',
    requirements: { minimumAggregate: cutoff, coreSubjects: [], electiveSubjects: [], notes: [] },
    provenance,
  }
}

const catalogue: Catalogue = {
  universities: [
    { id: 'ug', name: 'University of Ghana', shortName: 'UG', city: 'Accra', region: 'Greater Accra' },
    { id: 'knust', name: 'KNUST', shortName: 'KNUST', city: 'Kumasi', region: 'Ashanti' },
    { id: 'ucc', name: 'UCC', shortName: 'UCC', city: 'Cape Coast', region: 'Central' },
  ],
  programmes: [
    programme('ug-medicine', 'Medicine', 8),
    programme('ug-nursing', 'Nursing', 15),
    programme('ug-arts', 'Arts', 24, 'ug', 'Humanities'),
    programme('knust-nursing', 'Nursing', 12, 'knust'),
    programme('ucc-nursing', 'Nursing', 18, 'ucc'),
  ],
  deadlines: [],
}

describe('computeStats', () => {
  const medicine = catalogue.programmes[0]!
  const stats = computeStats(catalogue, medicine)

  it('ranks nationally by cut-off, most competitive first', () => {
    expect(stats.nationalRank).toBe(1)
    expect(stats.totalProgrammes).toBe(5)
  })

  it('ranks within the programme own university', () => {
    expect(stats.universityRank).toBe(1)
    expect(stats.universityTotal).toBe(3)
  })

  it('identifies the hardest entry at a university', () => {
    expect(stats.isMostCompetitiveAtUniversity).toBe(true)
    expect(stats.isMostAccessibleAtUniversity).toBe(false)
  })

  it('identifies the most accessible entry at a university', () => {
    const arts = computeStats(catalogue, catalogue.programmes[2]!)
    expect(arts.isMostAccessibleAtUniversity).toBe(true)
    expect(arts.isMostCompetitiveAtUniversity).toBe(false)
  })

  it('claims neither when a university has only one programme', () => {
    const solo: Catalogue = {
      ...catalogue,
      programmes: [programme('solo-one', 'Only', 12, 'knust')],
    }
    const only = computeStats(solo, solo.programmes[0]!)
    expect(only.isMostCompetitiveAtUniversity).toBe(false)
    expect(only.isMostAccessibleAtUniversity).toBe(false)
  })

  it('finds the same programme at other universities, cheapest entry first', () => {
    const nursing = computeStats(catalogue, catalogue.programmes[1]!)
    expect(nursing.alternatives.map((p) => p.id)).toEqual(['knust-nursing', 'ucc-nursing'])
  })

  it('never lists the programme itself as an alternative', () => {
    const nursing = computeStats(catalogue, catalogue.programmes[1]!)
    expect(nursing.alternatives.some((p) => p.id === 'ug-nursing')).toBe(false)
  })

  it('lists faculty peers at the same university', () => {
    expect(stats.peers.map((p) => p.id)).toContain('ug-nursing')
    // Different faculty, so not a peer.
    expect(stats.peers.map((p) => p.id)).not.toContain('ug-arts')
  })

  it('returns percentiles between 0 and 100', () => {
    for (const p of catalogue.programmes) {
      const s = computeStats(catalogue, p)
      expect(s.nationalPercentile).toBeGreaterThan(0)
      expect(s.nationalPercentile).toBeLessThanOrEqual(100)
      expect(s.universityPercentile).toBeGreaterThan(0)
      expect(s.universityPercentile).toBeLessThanOrEqual(100)
    }
  })
})

describe('describeCompetitiveness', () => {
  const at = (nationalPercentile: number): ProgrammeStats =>
    ({ nationalPercentile }) as ProgrammeStats

  it.each([
    [5, 'Among the most competitive entries in the country'],
    [10, 'Among the most competitive entries in the country'],
    [11, 'More competitive than most programmes'],
    [30, 'More competitive than most programmes'],
    [31, 'Mid-range competitiveness'],
    [60, 'Mid-range competitiveness'],
    [61, 'More accessible than most programmes'],
    [85, 'More accessible than most programmes'],
    [86, 'Among the most accessible entries in the country'],
    [100, 'Among the most accessible entries in the country'],
  ])('percentile %i reads as "%s"', (percentile, expected) => {
    expect(describeCompetitiveness(at(percentile))).toBe(expected)
  })
})
