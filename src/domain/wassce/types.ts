/**
 * WASSCE domain types.
 *
 * This module (and everything under `src/domain`) is pure TypeScript with no
 * React, no DOM, and no imports from the UI. It is the product; the rest of the
 * app is delivery.
 */

/** WASSCE grades, best to worst. */
export const GRADES = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9'] as const

export type Grade = (typeof GRADES)[number]

/**
 * The four WASSCE core subjects. Every candidate sits all four.
 *
 * Only three count toward the aggregate: English, Core Mathematics, and the
 * better of Integrated Science / Social Studies.
 */
export const CORE_SUBJECTS = ['english', 'mathematics', 'science', 'social'] as const

export type CoreSubjectKey = (typeof CORE_SUBJECTS)[number]

export const CORE_SUBJECT_LABELS: Record<CoreSubjectKey, string> = {
  english: 'English Language',
  mathematics: 'Core Mathematics',
  science: 'Integrated Science',
  social: 'Social Studies',
}

/**
 * The two core subjects that always count. The third slot is contested between
 * `science` and `social`, whichever grade is better is used.
 */
export const ALWAYS_COUNTED_CORES = ['english', 'mathematics'] as const
export const CONTESTED_CORES = ['science', 'social'] as const

/** A named elective and the grade obtained in it. */
export interface ElectiveResult {
  /** Free-form subject name, e.g. "Elective Mathematics", "Biology". */
  subject: string
  grade: Grade
}

/** Everything a student tells us about their results. */
export interface StudentResults {
  examYear: number
  /** Partial: a student mid-entry may not have filled every core yet. */
  core: Partial<Record<CoreSubjectKey, Grade>>
  /** Up to four; the best three count. */
  electives: ElectiveResult[]
}

/** One subject that contributed to (or was excluded from) the aggregate. */
export interface CountedSubject {
  subject: string
  grade: Grade
  points: number
  /** Why this subject was left out, when it was. */
  excludedReason?: 'weaker-core' | 'surplus-elective'
}

export interface AggregateResult {
  /** Sum of the best six. `null` when there isn't enough data yet. */
  aggregate: number | null
  counted: CountedSubject[]
  excluded: CountedSubject[]
  /** True when all three counted cores and at least three electives exist. */
  complete: boolean
  /** Human-readable list of what still needs entering. */
  missing: string[]
}

/** The best (lowest) and worst (highest) achievable aggregates. */
export const BEST_POSSIBLE_AGGREGATE = 6
export const WORST_POSSIBLE_AGGREGATE = 54

/** Number of subjects that make up the aggregate: 3 core + 3 elective. */
export const AGGREGATE_SUBJECT_COUNT = 6
export const REQUIRED_ELECTIVE_COUNT = 3
export const MAX_ELECTIVE_COUNT = 4

/**
 * A pass at credit level. Ghanaian universities require credit passes (A1 to C6)
 * in the subjects used for admission; D7 and below do not count.
 */
export const LOWEST_CREDIT_PASS: Grade = 'C6'
