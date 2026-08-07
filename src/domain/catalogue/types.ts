import type { Grade } from '../wassce/types'

/**
 * How much we trust a record. Higher confidence supersedes lower when the
 * seed data and an authoritative import disagree about the same
 * (programmeId, year), see scripts/data-pipeline.ts.
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

/**
 * How a student is admitted. Ghanaian universities publish different cut-offs
 * for the same programme depending on the track, and a regular-track figure is
 * misleading if the student is applying fee-paying or by distance.
 */
export const ADMISSION_TRACKS = [
  'regular',
  'fee-paying',
  'distance',
  'city-campus',
] as const
export type AdmissionTrack = (typeof ADMISSION_TRACKS)[number]

export const ADMISSION_TRACK_LABELS: Record<AdmissionTrack, string> = {
  regular: 'Regular',
  'fee-paying': 'Fee-paying',
  distance: 'Distance',
  'city-campus': 'City campus',
}

export const QUALIFICATION_LEVELS = ['degree', 'diploma', 'certificate'] as const
export type QualificationLevel = (typeof QUALIFICATION_LEVELS)[number]

export interface Programme {
  id: string
  name: string
  universityId: string
  faculty: string
  degreeType: string
  durationYears: number
  campus: string
  region: string
  admissionTrack: AdmissionTrack
  qualificationLevel: QualificationLevel
  requirements: EntryRequirements
  provenance: Provenance

  /**
   * Everything below is optional and omitted when we do not have a sourced
   * figure.
   *
   * Fees, salaries and employment rates are not published per programme by
   * most Ghanaian universities. Inventing them to fill a card would be exactly
   * the fabrication this project set out to remove, so the UI renders
   * "Not published" instead. See docs/superpowers/specs §8.
   */
  overview?: string
  pros?: string[]
  cons?: string[]
  careers?: string[]
  annualFeesGhs?: number
  employmentRatePct?: number
  salary?: SalaryRange
  cutoffTrend?: CutoffPoint[]
  /** UEW and some others publish separate male/female cut-offs. */
  cutoffByGender?: { male: number; female: number }
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
