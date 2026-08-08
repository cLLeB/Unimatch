import type { EntryRequirements } from '../catalogue/types'
import { computeAggregate } from './aggregate'
import { fromPoints, toPoints } from './grade'
import { evaluate, type Verdict } from './eligibility'
import { CORE_SUBJECT_LABELS, type CoreSubjectKey, type Grade, type StudentResults } from './types'

/** One grade change the student would need to make. */
export interface Improvement {
  subject: string
  from: Grade
  to: Grade
  /** Grade steps, e.g. C4 → B2 is 2. */
  steps: number
}

export interface ImprovementPlan {
  /** False when even straight A1s would not meet the requirements. */
  achievable: boolean
  /** Empty when the student already qualifies. */
  improvements: Improvement[]
  totalSteps: number
  /** Aggregate the student would have after making these improvements. */
  resultingAggregate: number | null
  /** Set when the plan cannot work, explaining why. */
  blockedReason?: string
}

const BEST_GRADE: Grade = 'A1'

/** Return a copy of `results` with one subject's grade replaced. */
function withGrade(results: StudentResults, subject: string, grade: Grade): StudentResults {
  const coreEntry = Object.entries(CORE_SUBJECT_LABELS).find(
    ([, label]) => label.toLowerCase() === subject.trim().toLowerCase(),
  )

  if (coreEntry) {
    const key = coreEntry[0] as CoreSubjectKey
    return { ...results, core: { ...results.core, [key]: grade } }
  }

  return {
    ...results,
    electives: results.electives.map((e) =>
      e.subject.trim().toLowerCase() === subject.trim().toLowerCase() ? { ...e, grade } : e,
    ),
  }
}

function record(map: Map<string, Improvement>, subject: string, from: Grade, to: Grade): void {
  const existing = map.get(subject)
  // Keep the original `from` if we improve the same subject twice.
  const origin = existing?.from ?? from
  map.set(subject, { subject, from: origin, to, steps: toPoints(origin) - toPoints(to) })
}

/**
 * Work out the smallest set of grade improvements that would turn a
 * non-qualifying verdict into a qualifying one.
 *
 * This powers both the What-if Simulator and the advisor's "what grades do I
 * need for X?" answer, the difference between telling a student "no" and
 * telling them "raise Elective 2 from C4 to B3 and you're in".
 *
 * Strategy:
 *  1. Satisfy every subject-specific requirement first, these are mandatory
 *     and no amount of aggregate improvement substitutes for them.
 *  2. Recompute; subject fixes often move the aggregate on their own.
 *  3. Close any remaining aggregate gap by improving counted subjects, taking
 *     those with the most headroom first so the fewest subjects are touched.
 *
 * Improving a subject that is *excluded* from the best six is never optimal:
 * it costs at least as many steps for at most the same gain, so only counted
 * subjects are considered in step 3.
 */
export function improvementsToQualify(
  requirements: EntryRequirements,
  results: StudentResults,
): ImprovementPlan {
  const initial = computeAggregate(results)

  if (!initial.complete) {
    return {
      achievable: false,
      improvements: [],
      totalSteps: 0,
      resultingAggregate: null,
      blockedReason: `Enter ${initial.missing.join(', ')} first.`,
    }
  }

  const verdict = evaluate(requirements, results, initial)
  if (verdict.status === 'qualified') {
    return {
      achievable: true,
      improvements: [],
      totalSteps: 0,
      resultingAggregate: initial.aggregate,
    }
  }

  const improvements = new Map<string, Improvement>()
  let working = results

  // --- 1. Mandatory subject fixes ----------------------------------------
  const allRequirements = [...requirements.coreSubjects, ...requirements.electiveSubjects]

  /* v8 ignore next 2 -- the incomplete arm is unreachable: line 81 already
     returned for incomplete results. It exists so TypeScript can narrow. */
  for (const shortfall of verdict.status === 'incomplete' ? [] : verdict.shortfalls) {
    if (shortfall.kind === 'missing-subject') {
      return {
        achievable: false,
        improvements: [],
        totalSteps: 0,
        resultingAggregate: initial.aggregate,
        blockedReason: `This programme requires ${shortfall.subject}, which you did not sit.`,
      }
    }

    if (shortfall.kind === 'subject' || shortfall.kind === 'no-credit-pass') {
      const requirement = allRequirements.find((r) => r.subject === shortfall.subject)
      /* v8 ignore next -- unreachable: every shortfall is raised from one of
         these same requirements, under that requirement's own subject name. */
      if (!requirement) continue
      const target = requirement.minimumGrade
      record(improvements, shortfall.subject, shortfall.actual, target)
      working = withGrade(working, shortfall.subject, target)
    }
  }

  // --- 2. Recompute after mandatory fixes --------------------------------
  let current = computeAggregate(working)
  /* v8 ignore next -- the ?? 0 arm is unreachable: `working` only ever has
     grades raised, so an aggregate that computed once still computes. */
  let deficit = (current.aggregate ?? 0) - requirements.minimumAggregate

  // --- 3. Close the remaining aggregate gap ------------------------------
  if (deficit > 0) {
    // Most headroom first, so we touch as few subjects as possible.
    const candidates = [...current.counted].sort((a, b) => b.points - a.points)

    for (const subject of candidates) {
      if (deficit <= 0) break
      const headroom = subject.points - toPoints(BEST_GRADE)
      if (headroom <= 0) continue

      const steps = Math.min(headroom, deficit)
      const target = fromPoints(subject.points - steps)
      record(improvements, subject.subject, subject.grade, target)
      working = withGrade(working, subject.subject, target)
      deficit -= steps
    }

    current = computeAggregate(working)
  }

  const finalVerdict: Verdict = evaluate(requirements, working, current)

  if (finalVerdict.status !== 'qualified') {
    return {
      achievable: false,
      improvements: [...improvements.values()],
      totalSteps: [...improvements.values()].reduce((n, i) => n + i.steps, 0),
      resultingAggregate: current.aggregate,
      blockedReason:
        'Even with straight A1s in your current subjects, this programme is out of reach.',
    }
  }

  const list = [...improvements.values()].filter((i) => i.steps > 0)

  return {
    achievable: true,
    improvements: list,
    totalSteps: list.reduce((n, i) => n + i.steps, 0),
    resultingAggregate: current.aggregate,
  }
}

/** One-line summary of a plan, used by the advisor and the simulator. */
export function describePlan(plan: ImprovementPlan, programmeName: string): string {
  if (!plan.achievable) {
    return plan.blockedReason ?? `${programmeName} is not reachable from your current subjects.`
  }
  if (plan.improvements.length === 0) {
    return `You already qualify for ${programmeName}.`
  }
  const parts = plan.improvements.map((i) => `${i.subject} from ${i.from} to ${i.to}`)
  const joined =
    parts.length === 1
      ? parts[0]
      : `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`
  return `Raise ${joined} and you unlock ${programmeName} (aggregate ${plan.resultingAggregate}).`
}
