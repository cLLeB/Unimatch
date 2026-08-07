import type { Grade } from '../wassce/types'

/**
 * How much we trust a record. Higher confidence supersedes lower when the
 * seed data and an authoritative import disagree about the same
 * (programmeId, year) — see scripts/data-pipeline.ts.
 */
export const CONFIDENCE_ORDER = ['estimated', 'researched', 'authoritative'] as const
export type Confidence = (typeof CONFIDENCE_ORDER)[number]

/**
 * Where a figure came from. Every cut-off, fee and deadline carries this,
 * because students make university application decisions on these numbers and
 * an unsourced figure must never be presented as fact.
 */
export interface Provenance {
  /** Human-readable citation, e.g. "KNUST 2024/25 Admissions Brochure, p.12". */
  source: string
  sourceUrl?: string
  /** Admissions cycle the figure describes. */
  year: number
  /** ISO date the figure was last checked against its source. */
  lastVerified: string
  confidence: Confidence
}

/**
 * A subject requirement. `alternatives` lets a programme accept any of several
 * subjects for one slot, e.g. "Physics or Elective Mathematics".
 */
export interface SubjectRequirement {
  /** Display name, e.g. "Elective Mathematics". */
  subject: string
  /** Other subject names that satisfy this same slot. */
  alternatives?: string[]
  minimumGrade: Grade
}

export interface EntryRequirements {
  minimumAggregate: number
  coreSubjects: SubjectRequirement[]
  electiveSubjects: SubjectRequirement[]
  notes: string[]
}

export interface SalaryRange {
  minMonthly: number
  maxMonthly: number
}

export interface CutoffPoint {
  year: number
  aggregate: number
}

export interface University {
  id: string
  /** Full name, e.g. "Kwame Nkrumah University of Science and Technology". */
  name: string
  /** What the UI shows, e.g. "KNUST". */
  shortName: string
  city: string
  region: string
  admissionsUrl?: string
}

export interface Programme {
  id: string
  name: string
  universityId: string
  faculty: string
  degreeType: string
  durationYears: number
  campus: string
  region: string
  overview: string
  pros: string[]
  cons: string[]
  careers: string[]
  /** Stored as a number so sorting and comparison are correct. */
  annualFeesGhs: number
  employmentRatePct: number
  salary: SalaryRange
  cutoffTrend: CutoffPoint[]
  requirements: EntryRequirements
  provenance: Provenance
}

export type DeadlineStatus = 'open' | 'closing-soon' | 'closed'

export interface AdmissionDeadline {
  id: string
  universityId: string
  /** e.g. "All Programmes" or "Medicine & Law". */
  scope: string
  /** ISO date. Status and days-remaining are derived from this, never stored. */
  closesOn: string
  provenance: Provenance
}

/** The whole catalogue, as loaded by the app. */
export interface Catalogue {
  universities: University[]
  programmes: Programme[]
  deadlines: AdmissionDeadline[]
}
