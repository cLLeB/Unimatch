import type { EntryRequirements, SubjectRequirement } from '../catalogue/types'
import { computeAggregate } from './aggregate'
import { isCreditPass, meetsMinimum, toPoints } from './grade'
import {
  CORE_SUBJECT_LABELS,
  type AggregateResult,
  type CoreSubjectKey,
  type Grade,
  type StudentResults,
} from './types'

/**
 * How far above a cut-off still counts as a "close match".
 *
 * Taken from the Figma Make source:
 *   if (p.cutoff >= studentAggregate) return "qualified";
 *   if (p.cutoff >= studentAggregate - 3) return "close";
 * i.e. close ⟺ aggregate ≤ cutoff + 3.
 */
export const CLOSE_MATCH_MARGIN = 3

export type Shortfall =
  | { kind: 'aggregate'; needed: number; actual: number; shortBy: number }
  | { kind: 'subject'; subject: string; needed: Grade; actual: Grade }
  | { kind: 'missing-subject'; subject: string; needed: Grade }
  | { kind: 'no-credit-pass'; subject: string; actual: Grade }

export type Verdict =
  | { status: 'qualified'; aggregate: number; margin: number; shortfalls: [] }
  | { status: 'close-match'; aggregate: number; shortBy: number; shortfalls: Shortfall[] }
  | { status: 'not-eligible'; aggregate: number; shortfalls: Shortfall[] }
  | { status: 'incomplete'; missing: string[] }

export type VerdictStatus = Verdict['status']

/** Normalise a subject name for comparison: case- and whitespace-insensitive. */
function normalise(subject: string): string {
  return subject.trim().toLowerCase()
}

/** Every subject name that satisfies a requirement slot. */
function acceptableNames(requirement: SubjectRequirement): string[] {
  return [requirement.subject, ...(requirement.alternatives ?? [])].map(normalise)
}

/** Map a requirement's core subject name back to its key, if it is one. */
function coreKeyFor(subject: string): CoreSubjectKey | undefined {
  const target = normalise(subject)
  const entry = Object.entries(CORE_SUBJECT_LABELS).find(
    ([, label]) => normalise(label) === target,
  )
  return entry?.[0] as CoreSubjectKey | undefined
}

function checkSubject(
  requirement: SubjectRequirement,
  actual: Grade | undefined,
): Shortfall | null {
  if (!actual) {
    return { kind: 'missing-subject', subject: requirement.subject, needed: requirement.minimumGrade }
  }
  if (!isCreditPass(actual)) {
    return { kind: 'no-credit-pass', subject: requirement.subject, actual }
  }
  if (!meetsMinimum(actual, requirement.minimumGrade)) {
    return {
      kind: 'subject',
      subject: requirement.subject,
      needed: requirement.minimumGrade,
      actual,
    }
  }
  return null
}

/**
 * Evaluate a student's results against one programme's entry requirements.
 *
 * Returns reasons, not just a boolean, "you miss this by 2 points" and "needs
 * Elective Mathematics at B3, you have C4" are the whole value of the product.
 */
export function evaluate(
  requirements: EntryRequirements,
  results: StudentResults,
  precomputed?: AggregateResult,
): Verdict {
  const agg = precomputed ?? computeAggregate(results)

  if (!agg.complete || agg.aggregate === null) {
    return { status: 'incomplete', missing: agg.missing }
  }

  const shortfalls: Shortfall[] = []

  // --- Core subject requirements -----------------------------------------
  for (const requirement of requirements.coreSubjects) {
    const key = coreKeyFor(requirement.subject)
    const actual = key ? results.core[key] : undefined
    const shortfall = checkSubject(requirement, actual)
    if (shortfall) shortfalls.push(shortfall)
  }

  // --- Elective requirements ---------------------------------------------
  // Each requirement consumes at most one of the student's electives, so a
  // single strong elective cannot satisfy two different slots.
  const availableElectives = [...results.electives]

  for (const requirement of requirements.electiveSubjects) {
    const names = acceptableNames(requirement)
    const matchIndex = availableElectives.findIndex((e) => names.includes(normalise(e.subject)))

    if (matchIndex === -1) {
      shortfalls.push({
        kind: 'missing-subject',
        subject: requirement.subject,
        needed: requirement.minimumGrade,
      })
      continue
    }

    const [match] = availableElectives.splice(matchIndex, 1)
    const shortfall = checkSubject(requirement, match!.grade)
    if (shortfall) shortfalls.push(shortfall)
  }

  // --- Aggregate ----------------------------------------------------------
  const overBy = agg.aggregate - requirements.minimumAggregate
  if (overBy > 0) {
    shortfalls.push({
      kind: 'aggregate',
      needed: requirements.minimumAggregate,
      actual: agg.aggregate,
      shortBy: overBy,
    })
  }

  if (shortfalls.length === 0) {
    return {
      status: 'qualified',
      aggregate: agg.aggregate,
      margin: requirements.minimumAggregate - agg.aggregate,
      shortfalls: [],
    }
  }

  if (overBy <= CLOSE_MATCH_MARGIN) {
    return {
      status: 'close-match',
      aggregate: agg.aggregate,
      shortBy: Math.max(overBy, 0),
      shortfalls,
    }
  }

  return { status: 'not-eligible', aggregate: agg.aggregate, shortfalls }
}

/** Plain-English rendering of a shortfall, for UI and the advisor. */
export function describeShortfall(shortfall: Shortfall): string {
  switch (shortfall.kind) {
    case 'aggregate':
      return `Your aggregate is ${shortfall.actual}; this programme needs ${shortfall.needed}, you miss it by ${shortfall.shortBy} point${shortfall.shortBy === 1 ? '' : 's'}.`
    case 'subject':
      return `${shortfall.subject} needs at least ${shortfall.needed}; you have ${shortfall.actual}.`
    case 'missing-subject':
      return `You have not entered ${shortfall.subject}, which this programme requires at ${shortfall.needed}.`
    case 'no-credit-pass':
      return `${shortfall.subject} needs a credit pass (A1 to C6); you have ${shortfall.actual}.`
  }
}

/** Ordering for lists: qualified first, then close matches, then the rest. */
export const VERDICT_RANK: Record<VerdictStatus, number> = {
  qualified: 0,
  'close-match': 1,
  'not-eligible': 2,
  incomplete: 3,
}

export function compareVerdicts(a: Verdict, b: Verdict): number {
  const rank = VERDICT_RANK[a.status] - VERDICT_RANK[b.status]
  if (rank !== 0) return rank
  const aggA = a.status === 'incomplete' ? Infinity : a.aggregate
  const aggB = b.status === 'incomplete' ? Infinity : b.aggregate
  return aggA - aggB
}

/** True when every counted subject is a credit pass. */
export function hasAllCreditPasses(results: StudentResults): boolean {
  const agg = computeAggregate(results)
  return agg.counted.every((s) => toPoints(s.grade) <= 6)
}
