import { describe, expect, it } from 'vitest'
import { computeAggregate, aggregateOf } from './aggregate'
import type { StudentResults } from './types'

function results(overrides: Partial<StudentResults> = {}): StudentResults {
  return {
    examYear: 2024,
    core: { english: 'B2', mathematics: 'B3', science: 'B3', social: 'C4' },
    electives: [
      { subject: 'Elective Mathematics', grade: 'B2' },
      { subject: 'Physics', grade: 'B3' },
      { subject: 'Chemistry', grade: 'C4' },
    ],
    ...overrides,
  }
}

describe('computeAggregate', () => {
  /**
   * The worked example from the spec (§7.1). The Figma prototype's simulator
   * reports 21 for these exact grades by summing all seven subjects. The
   * correct best-six aggregate is 17.
   *
   * This test is the guard against ever reintroducing that bug.
   */
  it('sums the best six, not every subject entered', () => {
    const r = results()
    // English 2 + Maths 3 + better(Science 3, Social 4) = 3  → cores 8
    // Best three electives: 2 + 3 + 4                        → electives 9
    expect(aggregateOf(r)).toBe(17)
    expect(aggregateOf(r)).not.toBe(21)
  })

  it('counts exactly six subjects', () => {
    expect(computeAggregate(results()).counted).toHaveLength(6)
  })

  it('drops the weaker of Integrated Science and Social Studies', () => {
    const { counted, excluded } = computeAggregate(results())
    expect(counted.map((s) => s.subject)).toContain('Integrated Science')
    expect(excluded).toContainEqual(
      expect.objectContaining({ subject: 'Social Studies', excludedReason: 'weaker-core' }),
    )
  })

  it('keeps Social Studies when it is the better of the two', () => {
    const r = results({ core: { english: 'B2', mathematics: 'B3', science: 'C6', social: 'A1' } })
    const { counted, excluded } = computeAggregate(r)
    expect(counted.map((s) => s.subject)).toContain('Social Studies')
    expect(excluded[0]?.subject).toBe('Integrated Science')
    // 2 + 3 + 1 + 2 + 3 + 4 = 15
    expect(aggregateOf(r)).toBe(15)
  })

  it('resolves a science/social tie deterministically to Integrated Science', () => {
    const r = results({ core: { english: 'B2', mathematics: 'B3', science: 'C4', social: 'C4' } })
    const { counted } = computeAggregate(r)
    expect(counted.map((s) => s.subject)).toContain('Integrated Science')
  })

  it('uses the best three of four electives', () => {
    const r = results({
      electives: [
        { subject: 'Elective Mathematics', grade: 'B2' },
        { subject: 'Physics', grade: 'B3' },
        { subject: 'Chemistry', grade: 'C4' },
        { subject: 'Biology', grade: 'F9' },
      ],
    })
    expect(aggregateOf(r)).toBe(17)
    expect(computeAggregate(r).excluded).toContainEqual(
      expect.objectContaining({ subject: 'Biology', excludedReason: 'surplus-elective' }),
    )
  })

  it('promotes a fourth elective when it beats one of the first three', () => {
    const r = results({
      electives: [
        { subject: 'Elective Mathematics', grade: 'C6' },
        { subject: 'Physics', grade: 'C6' },
        { subject: 'Chemistry', grade: 'C6' },
        { subject: 'Biology', grade: 'A1' },
      ],
    })
    // cores 8 + electives (1 + 6 + 6) = 21
    expect(aggregateOf(r)).toBe(21)
  })

  it('reaches the best possible aggregate of 6 with straight A1s', () => {
    const r = results({
      core: { english: 'A1', mathematics: 'A1', science: 'A1', social: 'A1' },
      electives: [
        { subject: 'Elective Mathematics', grade: 'A1' },
        { subject: 'Physics', grade: 'A1' },
        { subject: 'Chemistry', grade: 'A1' },
      ],
    })
    expect(aggregateOf(r)).toBe(6)
  })

  describe('incomplete results', () => {
    it('is incomplete when a core is missing', () => {
      const r = results({ core: { english: 'B2', science: 'B3', social: 'C4' } })
      const agg = computeAggregate(r)
      expect(agg.complete).toBe(false)
      expect(agg.aggregate).toBeNull()
      expect(agg.missing).toContain('Core Mathematics')
    })

    it('is incomplete when both science and social are missing', () => {
      const r = results({ core: { english: 'B2', mathematics: 'B3' } })
      expect(computeAggregate(r).missing).toContain('Integrated Science or Social Studies')
    })

    it('accepts only one of science or social', () => {
      const r = results({ core: { english: 'B2', mathematics: 'B3', science: 'B3' } })
      const agg = computeAggregate(r)
      expect(agg.complete).toBe(true)
      expect(agg.aggregate).toBe(17)
    })

    it('reports how many more electives are needed', () => {
      const r = results({ electives: [{ subject: 'Physics', grade: 'B3' }] })
      expect(computeAggregate(r).missing).toContain('2 more elective subjects')
    })

    it('uses the singular when exactly one elective is missing', () => {
      const r = results({
        electives: [
          { subject: 'Physics', grade: 'B3' },
          { subject: 'Chemistry', grade: 'C4' },
        ],
      })
      expect(computeAggregate(r).missing).toContain('1 more elective subject')
    })

    it('is incomplete with no data at all', () => {
      const agg = computeAggregate({ examYear: 2024, core: {}, electives: [] })
      expect(agg.complete).toBe(false)
      expect(agg.missing.length).toBeGreaterThan(0)
    })
  })
})
