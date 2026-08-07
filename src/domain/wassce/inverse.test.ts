import { describe, expect, it } from 'vitest'
import type { EntryRequirements } from '../catalogue/types'
import { evaluate } from './eligibility'
import { describePlan, improvementsToQualify } from './inverse'
import type { StudentResults } from './types'

/** Aggregate 17. */
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
    minimumAggregate: 12,
    coreSubjects: [],
    electiveSubjects: [],
    notes: [],
    ...overrides,
  }
}

/** Apply a plan's improvements to a student, so we can verify it actually works. */
function apply(results: StudentResults, plan: ReturnType<typeof improvementsToQualify>) {
  let next = results
  for (const improvement of plan.improvements) {
    const isCore = ['English Language', 'Core Mathematics', 'Integrated Science', 'Social Studies']
      .includes(improvement.subject)
    if (isCore) {
      const key = {
        'English Language': 'english',
        'Core Mathematics': 'mathematics',
        'Integrated Science': 'science',
        'Social Studies': 'social',
      }[improvement.subject] as keyof StudentResults['core']
      next = { ...next, core: { ...next.core, [key]: improvement.to } }
    } else {
      next = {
        ...next,
        electives: next.electives.map((e) =>
          e.subject === improvement.subject ? { ...e, grade: improvement.to } : e,
        ),
      }
    }
  }
  return next
}

describe('improvementsToQualify', () => {
  it('returns an empty plan when the student already qualifies', () => {
    const plan = improvementsToQualify(requirements({ minimumAggregate: 20 }), student)
    expect(plan.achievable).toBe(true)
    expect(plan.improvements).toEqual([])
    expect(plan.totalSteps).toBe(0)
  })

  it('closes a pure aggregate gap and the plan actually works', () => {
    const reqs = requirements({ minimumAggregate: 12 })
    const plan = improvementsToQualify(reqs, student)

    expect(plan.achievable).toBe(true)
    expect(plan.totalSteps).toBe(5) // 17 → 12
    expect(plan.resultingAggregate).toBe(12)
    expect(evaluate(reqs, apply(student, plan)).status).toBe('qualified')
  })

  it('improves the subjects with the most headroom first, touching fewest subjects', () => {
    const plan = improvementsToQualify(requirements({ minimumAggregate: 14 }), student)
    // Needs 3 points. Weakest counted subjects are C4s (3 points of headroom each).
    expect(plan.improvements).toHaveLength(1)
    expect(plan.improvements[0]?.steps).toBe(3)
    expect(plan.improvements[0]?.to).toBe('A1')
  })

  it('raises a subject to its required minimum, not beyond', () => {
    const reqs = requirements({
      minimumAggregate: 30,
      electiveSubjects: [{ subject: 'Chemistry', minimumGrade: 'B2' }],
    })
    const plan = improvementsToQualify(reqs, student)
    expect(plan.improvements).toEqual([
      { subject: 'Chemistry', from: 'C4', to: 'B2', steps: 2 },
    ])
    expect(evaluate(reqs, apply(student, plan)).status).toBe('qualified')
  })

  it('combines a subject fix with an aggregate fix', () => {
    const reqs = requirements({
      minimumAggregate: 13,
      electiveSubjects: [{ subject: 'Chemistry', minimumGrade: 'B2' }],
    })
    const plan = improvementsToQualify(reqs, student)

    // Chemistry C4 → B2 already takes the aggregate 17 → 15; 2 more points needed.
    expect(plan.resultingAggregate).toBe(13)
    expect(plan.totalSteps).toBe(4)
    expect(evaluate(reqs, apply(student, plan)).status).toBe('qualified')
  })

  it('reports a single origin grade when a subject is improved twice', () => {
    const reqs = requirements({
      minimumAggregate: 12,
      electiveSubjects: [{ subject: 'Chemistry', minimumGrade: 'C5' }],
    })
    const plan = improvementsToQualify(reqs, student)
    const chemistry = plan.improvements.filter((i) => i.subject === 'Chemistry')
    expect(chemistry).toHaveLength(1)
    expect(chemistry[0]?.from).toBe('C4')
  })

  it('is unachievable when the cut-off is below the best possible aggregate', () => {
    const plan = improvementsToQualify(requirements({ minimumAggregate: 5 }), student)
    expect(plan.achievable).toBe(false)
    expect(plan.blockedReason).toContain('straight A1s')
  })

  it('is unachievable when a required subject was never sat', () => {
    const plan = improvementsToQualify(
      requirements({ electiveSubjects: [{ subject: 'Biology', minimumGrade: 'C6' }] }),
      student,
    )
    expect(plan.achievable).toBe(false)
    expect(plan.blockedReason).toContain('Biology')
  })

  it('asks for missing grades before planning', () => {
    const plan = improvementsToQualify(requirements(), {
      examYear: 2024,
      core: { english: 'B2' },
      electives: [],
    })
    expect(plan.achievable).toBe(false)
    expect(plan.blockedReason).toContain('Enter')
  })

  it('lifts a non-credit pass up to the required grade', () => {
    const failing: StudentResults = {
      ...student,
      core: { ...student.core, english: 'E8' },
    }
    const reqs = requirements({
      minimumAggregate: 30,
      coreSubjects: [{ subject: 'English Language', minimumGrade: 'C6' }],
    })
    const plan = improvementsToQualify(reqs, failing)
    expect(plan.improvements).toContainEqual({
      subject: 'English Language',
      from: 'E8',
      to: 'C6',
      steps: 2,
    })
    expect(evaluate(reqs, apply(failing, plan)).status).toBe('qualified')
  })
})

describe('describePlan', () => {
  it('confirms when no change is needed', () => {
    const plan = improvementsToQualify(requirements({ minimumAggregate: 20 }), student)
    expect(describePlan(plan, 'Nursing')).toBe('You already qualify for Nursing.')
  })

  it('reads as an actionable sentence for one change', () => {
    const plan = improvementsToQualify(requirements({ minimumAggregate: 14 }), student)
    expect(describePlan(plan, 'Computer Science')).toMatch(
      /^Raise .+ from C4 to A1 and you unlock Computer Science \(aggregate 14\)\.$/,
    )
  })

  it('joins multiple changes with "and"', () => {
    const plan = improvementsToQualify(requirements({ minimumAggregate: 10 }), student)
    expect(plan.improvements.length).toBeGreaterThan(1)
    expect(describePlan(plan, 'Law')).toContain(' and ')
  })

  it('explains why an impossible target is impossible', () => {
    const plan = improvementsToQualify(requirements({ minimumAggregate: 5 }), student)
    expect(describePlan(plan, 'Medicine')).toContain('straight A1s')
  })
})
