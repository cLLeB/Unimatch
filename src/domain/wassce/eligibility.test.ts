import { describe, expect, it } from 'vitest'
import type { EntryRequirements } from '../catalogue/types'
import {
  CLOSE_MATCH_MARGIN,
  compareVerdicts,
  describeShortfall,
  evaluate,
  hasAllCreditPasses,
} from './eligibility'
import type { StudentResults } from './types'

/** Aggregate 17 (see aggregate.test.ts). */
const student: StudentResults = {
  examYear: 2024,
  core: { english: 'B2', mathematics: 'B3', science: 'B3', social: 'C4' },
  electives: [
    { subject: 'Elective Mathematics', grade: 'B2' },
    { subject: 'Physics', grade: 'B3' },
    { subject: 'Chemistry', grade: 'C4' },
  ],
}

function requirements(overrides: Partial<EntryRequirements> = {}): EntryRequirements {
  return {
    minimumAggregate: 20,
    coreSubjects: [
      { subject: 'English Language', minimumGrade: 'C6' },
      { subject: 'Core Mathematics', minimumGrade: 'C6' },
    ],
    electiveSubjects: [],
    notes: [],
    ...overrides,
  }
}

describe('evaluate', () => {
  it('qualifies when the aggregate is under the cut-off and subjects are met', () => {
    const verdict = evaluate(requirements(), student)
    expect(verdict.status).toBe('qualified')
    if (verdict.status !== 'qualified') throw new Error('unreachable')
    expect(verdict.aggregate).toBe(17)
    expect(verdict.margin).toBe(3)
  })

  it('qualifies when the aggregate exactly equals the cut-off', () => {
    const verdict = evaluate(requirements({ minimumAggregate: 17 }), student)
    expect(verdict.status).toBe('qualified')
  })

  it('is a close match when just over the cut-off', () => {
    const verdict = evaluate(requirements({ minimumAggregate: 15 }), student)
    expect(verdict.status).toBe('close-match')
    if (verdict.status !== 'close-match') throw new Error('unreachable')
    expect(verdict.shortBy).toBe(2)
  })

  it(`is a close match at exactly the ${CLOSE_MATCH_MARGIN}-point margin`, () => {
    const verdict = evaluate(requirements({ minimumAggregate: 17 - CLOSE_MATCH_MARGIN }), student)
    expect(verdict.status).toBe('close-match')
  })

  it('is not eligible one point beyond the margin', () => {
    const verdict = evaluate(
      requirements({ minimumAggregate: 17 - CLOSE_MATCH_MARGIN - 1 }),
      student,
    )
    expect(verdict.status).toBe('not-eligible')
  })

  /**
   * Reproduces the prototype's dashboard rows at aggregate 14, which is the
   * behaviour the design specifies:
   *   Electrical (14) qualified · CS (12) close · Law (10) and Medicine (8) not eligible
   */
  describe('matches the prototype tiers at aggregate 14', () => {
    const agg14: StudentResults = {
      examYear: 2024,
      core: { english: 'B2', mathematics: 'B3', science: 'B3', social: 'C6' },
      electives: [
        { subject: 'Elective Mathematics', grade: 'B2' },
        { subject: 'Physics', grade: 'B2' },
        { subject: 'Chemistry', grade: 'B2' },
      ],
    }

    it.each([
      [14, 'qualified'],
      [12, 'close-match'],
      [11, 'close-match'],
      [10, 'not-eligible'],
      [8, 'not-eligible'],
    ])('cut-off %i → %s', (cutoff, expected) => {
      expect(evaluate(requirements({ minimumAggregate: cutoff }), agg14).status).toBe(expected)
    })
  })

  describe('subject requirements', () => {
    it('flags a subject below its minimum grade', () => {
      const verdict = evaluate(
        requirements({
          electiveSubjects: [{ subject: 'Chemistry', minimumGrade: 'B2' }],
        }),
        student,
      )
      expect(verdict.status).not.toBe('qualified')
      if (verdict.status === 'incomplete') throw new Error('unreachable')
      expect(verdict.shortfalls).toContainEqual({
        kind: 'subject',
        subject: 'Chemistry',
        needed: 'B2',
        actual: 'C4',
      })
    })

    it('flags a required subject the student did not sit', () => {
      const verdict = evaluate(
        requirements({ electiveSubjects: [{ subject: 'Biology', minimumGrade: 'C6' }] }),
        student,
      )
      if (verdict.status === 'incomplete') throw new Error('unreachable')
      expect(verdict.shortfalls).toContainEqual({
        kind: 'missing-subject',
        subject: 'Biology',
        needed: 'C6',
      })
    })

    it('accepts an alternative subject', () => {
      const verdict = evaluate(
        requirements({
          electiveSubjects: [
            { subject: 'Biology', alternatives: ['Physics'], minimumGrade: 'C6' },
          ],
        }),
        student,
      )
      expect(verdict.status).toBe('qualified')
    })

    it('matches subject names case- and whitespace-insensitively', () => {
      const verdict = evaluate(
        requirements({ electiveSubjects: [{ subject: '  pHYSICS ', minimumGrade: 'C6' }] }),
        student,
      )
      expect(verdict.status).toBe('qualified')
    })

    it('does not let one elective satisfy two requirements', () => {
      const verdict = evaluate(
        requirements({
          electiveSubjects: [
            { subject: 'Physics', minimumGrade: 'C6' },
            { subject: 'Physics', minimumGrade: 'C6' },
          ],
        }),
        student,
      )
      if (verdict.status === 'incomplete') throw new Error('unreachable')
      expect(verdict.shortfalls).toContainEqual({
        kind: 'missing-subject',
        subject: 'Physics',
        needed: 'C6',
      })
    })

    it('rejects a non-credit pass even when the grade check would pass', () => {
      const withFail: StudentResults = {
        ...student,
        core: { ...student.core, mathematics: 'D7' },
      }
      const verdict = evaluate(requirements({ minimumAggregate: 30 }), withFail)
      if (verdict.status === 'incomplete') throw new Error('unreachable')
      expect(verdict.shortfalls).toContainEqual({
        kind: 'no-credit-pass',
        subject: 'Core Mathematics',
        actual: 'D7',
      })
    })
  })

  describe('incomplete', () => {
    it('never says "not eligible" when data is missing', () => {
      const partial: StudentResults = { examYear: 2024, core: { english: 'B2' }, electives: [] }
      const verdict = evaluate(requirements(), partial)
      expect(verdict.status).toBe('incomplete')
      if (verdict.status !== 'incomplete') throw new Error('unreachable')
      expect(verdict.missing.length).toBeGreaterThan(0)
    })
  })
})

describe('describeShortfall', () => {
  it('explains an aggregate gap in points', () => {
    expect(
      describeShortfall({ kind: 'aggregate', needed: 12, actual: 14, shortBy: 2 }),
    ).toContain('miss it by 2 points')
  })

  it('uses the singular for a one-point gap', () => {
    expect(
      describeShortfall({ kind: 'aggregate', needed: 13, actual: 14, shortBy: 1 }),
    ).toContain('by 1 point.')
  })

  it('names the subject and both grades', () => {
    expect(
      describeShortfall({ kind: 'subject', subject: 'Physics', needed: 'B3', actual: 'C4' }),
    ).toBe('Physics needs at least B3; you have C4.')
  })

  it('explains a missing subject', () => {
    expect(
      describeShortfall({ kind: 'missing-subject', subject: 'Biology', needed: 'C6' }),
    ).toContain('have not entered Biology')
  })

  it('explains a failed credit pass', () => {
    expect(
      describeShortfall({ kind: 'no-credit-pass', subject: 'Core Mathematics', actual: 'E8' }),
    ).toContain('credit pass (A1 to C6)')
  })
})

describe('compareVerdicts', () => {
  it('ranks qualified above close-match above not-eligible', () => {
    const order = [
      evaluate(requirements({ minimumAggregate: 5 }), student), // not-eligible
      evaluate(requirements({ minimumAggregate: 20 }), student), // qualified
      evaluate(requirements({ minimumAggregate: 15 }), student), // close-match
    ].sort(compareVerdicts)
    expect(order.map((v) => v.status)).toEqual(['qualified', 'close-match', 'not-eligible'])
  })
})

describe('hasAllCreditPasses', () => {
  it('is true when every counted subject is A1–C6', () => {
    expect(hasAllCreditPasses(student)).toBe(true)
  })

  it('is false when a counted subject is below C6', () => {
    expect(
      hasAllCreditPasses({ ...student, core: { ...student.core, english: 'F9' } }),
    ).toBe(false)
  })
})
