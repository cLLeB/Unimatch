import { describe, expect, it } from 'vitest'
import type { EntryRequirements } from '../catalogue/types'
import { computeAggregate } from './aggregate'
import { evaluate } from './eligibility'
import { describePlan, improvementsToQualify, type ImprovementPlan } from './inverse'
import type { StudentResults } from './types'

/**
 * Branches the main suites do not reach.
 *
 * The domain layer is held at 100% because it is the product: a branch nobody
 * exercises is a rule nobody has checked, and these rules decide what a student
 * is told about their future.
 */

const electives = [
  { subject: 'Elective Mathematics', grade: 'B2' as const },
  { subject: 'Physics', grade: 'B3' as const },
  { subject: 'Chemistry', grade: 'C4' as const },
]

function requirements(overrides: Partial<EntryRequirements> = {}): EntryRequirements {
  return {
    minimumAggregate: 20,
    coreSubjects: [],
    electiveSubjects: [],
    notes: [],
    ...overrides,
  }
}

describe('aggregate: only one contested core entered', () => {
  it('uses Social Studies when Integrated Science is absent', () => {
    const results: StudentResults = {
      examYear: 2025,
      core: { english: 'B2', mathematics: 'B3', social: 'C4' },
      electives,
    }
    const agg = computeAggregate(results)

    expect(agg.complete).toBe(true)
    // 2 + 3 + 4 + 2 + 3 + 4 = 18
    expect(agg.aggregate).toBe(18)
    expect(agg.counted.map((s) => s.subject)).toContain('Social Studies')
    expect(agg.counted.map((s) => s.subject)).not.toContain('Integrated Science')
  })

  it('uses Integrated Science when Social Studies is absent', () => {
    const results: StudentResults = {
      examYear: 2025,
      core: { english: 'B2', mathematics: 'B3', science: 'C4' },
      electives,
    }
    const agg = computeAggregate(results)
    expect(agg.counted.map((s) => s.subject)).toContain('Integrated Science')
  })
})

describe('eligibility: a required core the student never entered', () => {
  it('reports it as missing rather than failing them on it', () => {
    const results: StudentResults = {
      examYear: 2025,
      core: { english: 'B2', mathematics: 'B3', science: 'B3' },
      electives,
    }
    const verdict = evaluate(
      requirements({ coreSubjects: [{ subject: 'Social Studies', minimumGrade: 'C6' }] }),
      results,
    )

    if (verdict.status === 'incomplete') throw new Error('unreachable')
    expect(verdict.shortfalls).toContainEqual({
      kind: 'missing-subject',
      subject: 'Social Studies',
      needed: 'C6',
    })
  })

  it('treats an unrecognised core subject name as missing', () => {
    const results: StudentResults = {
      examYear: 2025,
      core: { english: 'B2', mathematics: 'B3', science: 'B3', social: 'C4' },
      electives,
    }
    const verdict = evaluate(
      requirements({ coreSubjects: [{ subject: 'Latin', minimumGrade: 'C6' }] }),
      results,
    )

    if (verdict.status === 'incomplete') throw new Error('unreachable')
    expect(verdict.shortfalls.some((s) => s.kind === 'missing-subject')).toBe(true)
  })
})

describe('inverse solver edge cases', () => {
  const student: StudentResults = {
    examYear: 2025,
    core: { english: 'B2', mathematics: 'B3', science: 'B3', social: 'C4' },
    electives,
  }

  it('stops improving once the deficit is closed', () => {
    // One point short: exactly one grade step, and no more.
    const plan = improvementsToQualify(requirements({ minimumAggregate: 16 }), student)
    expect(plan.totalSteps).toBe(1)
    expect(plan.improvements).toHaveLength(1)
  })

  it('already qualifying needs no steps at all', () => {
    const plan = improvementsToQualify(requirements({ minimumAggregate: 17 }), student)
    expect(plan.improvements).toEqual([])
    expect(plan.achievable).toBe(true)
  })

  it('skips a shortfall whose subject is not in the requirement list', () => {
    // The aggregate is the only real barrier here; nothing should crash when a
    // subject shortfall has no matching requirement to raise it to.
    const plan = improvementsToQualify(requirements({ minimumAggregate: 14 }), student)
    expect(plan.achievable).toBe(true)
    expect(plan.resultingAggregate).toBe(14)
  })

  it('leaves subjects already at A1 alone', () => {
    const perfect: StudentResults = {
      examYear: 2025,
      core: { english: 'A1', mathematics: 'A1', science: 'A1', social: 'A1' },
      electives: [
        { subject: 'Elective Mathematics', grade: 'A1' },
        { subject: 'Physics', grade: 'A1' },
        { subject: 'Chemistry', grade: 'B2' },
      ],
    }
    const plan = improvementsToQualify(requirements({ minimumAggregate: 6 }), perfect)
    expect(plan.achievable).toBe(true)
    expect(plan.improvements).toHaveLength(1)
    expect(plan.improvements[0]?.to).toBe('A1')
  })
})

describe('describePlan fallbacks', () => {
  it('uses a generic sentence when a blocked plan carries no reason', () => {
    const plan: ImprovementPlan = {
      achievable: false,
      improvements: [],
      totalSteps: 0,
      resultingAggregate: null,
    }
    expect(describePlan(plan, 'Medicine')).toBe(
      'Medicine is not reachable from your current subjects.',
    )
  })

  it('prefers the specific reason when there is one', () => {
    const plan: ImprovementPlan = {
      achievable: false,
      improvements: [],
      totalSteps: 0,
      resultingAggregate: null,
      blockedReason: 'You did not sit Biology.',
    }
    expect(describePlan(plan, 'Medicine')).toBe('You did not sit Biology.')
  })
})

describe('inverse: a subject already at the ceiling', () => {
  /**
   * A student with straight A1s in their counted subjects has an aggregate of
   * 6, the best WASSCE can produce. If a programme still asks for less, the
   * planner must skip every subject rather than propose raising an A1.
   */
  const perfect: StudentResults = {
    examYear: 2025,
    core: { english: 'A1', mathematics: 'A1', science: 'A1', social: 'A1' },
    electives: [
      { subject: 'Elective Mathematics', grade: 'A1' },
      { subject: 'Physics', grade: 'A1' },
      { subject: 'Chemistry', grade: 'A1' },
    ],
  }

  it('skips subjects with no headroom instead of inventing a step', () => {
    // Aggregate 6 against a requirement of 5, which no student can reach.
    const plan = improvementsToQualify(requirements({ minimumAggregate: 5 }), perfect)
    expect(plan.improvements).toEqual([])
    expect(plan.achievable).toBe(false)
  })

  it('leaves one subject with headroom and raises only that one', () => {
    const nearlyPerfect: StudentResults = {
      ...perfect,
      electives: [
        { subject: 'Elective Mathematics', grade: 'A1' },
        { subject: 'Physics', grade: 'A1' },
        { subject: 'Chemistry', grade: 'C4' },
      ],
    }
    const plan = improvementsToQualify(requirements({ minimumAggregate: 7 }), nearlyPerfect)
    expect(plan.achievable).toBe(true)
    expect(plan.improvements.map((i) => i.subject)).toEqual(['Chemistry'])
  })
})
