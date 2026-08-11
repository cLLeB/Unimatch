import type { Grade } from '../wassce/types'

/**
 * How much we trust a record. Higher confidence supersedes lower when the
 * seed data and an authoritative import disagree about the same
 * (programmeId, year), see scripts/data-pipeline.ts.
 *
 * There are deliberately only two levels. A figure either comes from the
 * institution itself, or from a listing that has published Ghanaian admissions
 * data reliably for years. Anything weaker than that is not shown at all, so
 * there is no third level to name.
 */
export const CONFIDENCE_ORDER = ['researched', 'authoritative'] as const
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

/**
 * What the aggregate figure actually is.
 *
 * Most Ghanaian universities publish a competitive cut-off per programme: the
 * aggregate of the last student admitted last cycle. Many private and newer
 * institutions publish no such list, only the minimum aggregate that makes an
 * applicant eligible at all. Those are different numbers answering different
 * questions, and showing the second as though it were the first would tell a
 * student a programme is easier to enter than it is.
 */
export const AGGREGATE_BASES = ['published-cutoff', 'general-minimum'] as const
export type AggregateBasis = (typeof AGGREGATE_BASES)[number]

export interface EntryRequirements {
  minimumAggregate: number
  /** Defaults to a published cut-off when absent, for older seed records. */
  aggregateBasis?: AggregateBasis
  coreSubjects: SubjectRequirement[]
  electiveSubjects: SubjectRequirement[]
  notes: string[]
}

export interface SalaryRange {
  minMonthly: number
  maxMonthly: number
}

/**
 * Fees as universities actually publish them: a band for a college or
 * category, for a stated academic year. A single precise figure per programme
 * would be a fiction, so the band and its year are carried instead.
 */
export interface FeeBand {
  minGhs: number
  maxGhs: number
  /** Academic year the band was published for, e.g. "2025/26". */
  year: string
  source: string
  sourceUrl?: string
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
  /**
   * Where an applicant actually applies: the online portal where one exists,
   * otherwise the university's own "how to apply" page.
   *
   * These are three distinct destinations and conflating them is how the
   * catalogue ended up sending students to a 404. Every university here was
   * assumed to serve `<domain>/admissions`; seventeen of the nineteen did not,
   * and one of those redirected to a job advert for an admissions officer.
   * Each URL is now checked against the live site by scripts/audit-links.ts.
   */
  admissionsUrl?: string
  /** The university's own catalogue of undergraduate programmes. */
  programmesUrl?: string
  /** Where the university publishes cut-offs or minimum entry requirements. */
  cutoffUrl?: string
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
   * This exact programme's page on the university's own site, where the
   * university publishes one.
   *
   * Present for 198 of the 546 records. The rest fall back to their
   * university's programme catalogue rather than guess at a URL: a link that
   * lands on the wrong programme is worse than one that lands on the list the
   * student can search.
   */
  officialUrl?: string

  /**
   * Track-specific entry point, where a university runs its distance or
   * fee-paying admissions through a separate body. KNUST's distance
   * programmes are the Institute of Distance Learning's, not the main
   * portal's, and applying at the wrong one wastes the voucher.
   */
  applyUrl?: string

  /**
   * Everything below is optional and omitted when we do not have a sourced
   * figure.
   *
   * Fees, salaries and employment rates are not published per programme by
   * most Ghanaian universities. Inventing them to fill a card would be exactly
   * the fabrication this project set out to remove, and captioning the gap
   * ("Not published", "Indicative") only makes a student read a fault in the
   * data. So the UI omits the whole tile. See docs/superpowers/specs §8.
   */
  overview?: string
  pros?: string[]
  cons?: string[]
  careers?: string[]
  annualFeesGhs?: number
  fees?: FeeBand
  employmentRatePct?: number
  salary?: SalaryRange
  cutoffTrend?: CutoffPoint[]
  /** UEW and some others publish separate male/female cut-offs. */
  cutoffByGender?: { male: number; female: number }
}

export type DeadlineStatus = 'open' | 'closing-soon' | 'closed' | 'open-ended'

export interface AdmissionDeadline {
  id: string
  universityId: string
  /** e.g. "All Programmes" or "Medicine & Law". */
  scope: string
  /**
   * ISO date. Status and days-remaining are derived from this, never stored.
   *
   * Absent where the university publishes a condition instead of a date, which
   * UG does for general undergraduate entry. Inventing a date to fill the gap
   * would put a countdown on the screen that no source supports.
   */
  closesOn?: string
  /** The published condition, e.g. "Open until WASSCE results are released". */
  closesWhen?: string
  /**
   * Admission tracks this date governs, where a university publishes several.
   *
   * KNUST closes on 31 August for mature, top-up and international applicants
   * but stays open until WASSCE results are released for Ghanaian WASSCE
   * applicants, who are almost everyone here. Showing the soonest date to all
   * of them would put a false countdown on the regular track.
   *
   * `'other'` names an audience outside the tracks we model: mature entry,
   * top-up, international. Such a deadline is listed on the deadlines page,
   * where its scope explains who it is for, and never attached to a
   * programme. Omitting `tracks` means it governs every track.
   */
  tracks?: (AdmissionTrack | 'other')[]
  provenance: Provenance
}

/** The whole catalogue, as loaded by the app. */
export interface Catalogue {
  universities: University[]
  programmes: Programme[]
  deadlines: AdmissionDeadline[]
}
