import { ADMISSION_TRACK_LABELS } from '../domain/catalogue/types'
import type {
  AdmissionDeadline,
  Provenance,
  Catalogue,
  Confidence,
  Programme,
  University,
} from '../domain/catalogue/types'
import { catalogue as generated } from './catalogue.generated'

export const catalogue: Catalogue = generated

export const universities: University[] = catalogue.universities
export const programmes: Programme[] = catalogue.programmes
export const deadlines: AdmissionDeadline[] = catalogue.deadlines

const universityById = new Map(universities.map((u) => [u.id, u]))
const programmeById = new Map(programmes.map((p) => [p.id, p]))

export function getUniversity(id: string): University | undefined {
  return universityById.get(id)
}

export function getProgramme(id: string): Programme | undefined {
  return programmeById.get(id)
}

/**
 * A programme's name with its admission track, wherever the track is not the
 * regular one.
 *
 * The same subject appears once per track at different cut-offs. Legon takes
 * Computer Science at 7 regular and 15 full-fee-paying, and without the track
 * on the label those are two identical rows disagreeing about the figure,
 * which reads as a duplicate rather than as the two routes it is.
 */
export function programmeLabel(programme: Programme): string {
  return programme.admissionTrack === 'regular'
    ? programme.name
    : `${programme.name} (${ADMISSION_TRACK_LABELS[programme.admissionTrack]})`
}

/** Display name for a programme's university, falling back to the raw id. */
export function universityNameOf(programme: Programme): string {
  return universityById.get(programme.universityId)?.shortName ?? programme.universityId
}

export const regions: string[] = [...new Set(programmes.map((p) => p.region))].sort()

export const degreeTypes: string[] = [...new Set(programmes.map((p) => p.degreeType))].sort()

/**
 * Real counts, computed from the data.
 *
 * The prototype hardcoded "78+ Programmes Listed", "10 Universities Covered",
 * "50,000+ Students Helped" and "99% Data Accuracy" on the landing page, none
 * of which were true. Counts are derived here so they cannot drift again, and
 * the unverifiable claims are simply gone, see docs/superpowers/specs §8.
 */
export const catalogueStats = {
  programmeCount: programmes.length,
  universityCount: universities.length,
  authoritativeCount: programmes.filter((p) => p.provenance.confidence === 'authoritative').length,
  latestCycleYear: Math.max(...programmes.map((p) => p.provenance.year)),
} as const

/** Share of programmes whose cut-off comes from an official university source. */
export const authoritativeSharePct = Math.round(
  (catalogueStats.authoritativeCount / catalogueStats.programmeCount) * 100,
)

export function isVerified(confidence: Confidence): boolean {
  return confidence === 'authoritative'
}

/** 2025 -> "2025/26". Ghanaian admissions are quoted by academic year. */
export function academicYear(startYear: number): string {
  return `${startYear}/${String((startYear + 1) % 100).padStart(2, '0')}`
}

/**
 * Labels state the most recent year a figure IS confirmed for, rather than
 * leading with what is missing. A cut-off confirmed for 2025/26 is useful
 * information; calling it "unconfirmed" because 2026/27 has not been published
 * yet tells a student nothing and reads as a fault in the data.
 *
 * There is no hedging vocabulary here on purpose. A figure is either confirmed
 * by the university or published by a source with a long track record, and
 * anything we cannot put in one of those two boxes is not shown at all.
 */
export function confidenceLabel(provenance: Provenance): string {
  const year = academicYear(provenance.year)
  switch (provenance.confidence) {
    case 'authoritative':
      return `Confirmed ${year}`
    case 'researched':
      return `Published ${year}`
  }
}

export function confidenceDetail(provenance: Provenance): string {
  const year = academicYear(provenance.year)
  switch (provenance.confidence) {
    case 'authoritative':
      return `Confirmed against the university's own published figures for ${year}.`
    case 'researched':
      return `Published for ${year} by an admissions source with a long track record. Confirm on the university portal before applying.`
  }
}

export const CONFIDENCE_SHORT: Record<Confidence, string> = {
  authoritative: 'Confirmed',
  researched: 'Published',
}

/** Format Ghana cedis without decimals, e.g. "GH₵ 4,200". */
export function formatCedis(amount: number): string {
  return `GH₵ ${amount.toLocaleString('en-GH')}`
}

/*
 * The formatters below return null where nothing is published, and every
 * caller omits the row or tile entirely when they do.
 *
 * They used to return the string "Not published". Captioning a gap does not
 * inform a student, it just spends a tile telling them the product failed to
 * find something. An absent stat is quieter and no less honest.
 */

/**
 * Fees as a band, which is how universities publish them, e.g.
 * "GH₵ 4,900 to 6,400/yr".
 */
export function formatFeesPerYear(programme: Programme): string | null {
  if (programme.fees) {
    const { minGhs, maxGhs } = programme.fees
    return minGhs === maxGhs
      ? `${formatCedis(minGhs)}/yr`
      : `${formatCedis(minGhs)} to ${maxGhs.toLocaleString('en-GH')}/yr`
  }
  return programme.annualFeesGhs === undefined
    ? null
    : `${formatCedis(programme.annualFeesGhs)}/yr`
}

/** Short form for dense rows, e.g. "GH₵ 4,900+". */
export function formatFeesCompact(programme: Programme): string | null {
  if (programme.fees) return `${formatCedis(programme.fees.minGhs)}+`
  return programme.annualFeesGhs === undefined
    ? null
    : `${formatCedis(programme.annualFeesGhs)}/yr`
}

export function formatSalaryRange(programme: Programme): string | null {
  if (!programme.salary) return null
  const { minMonthly, maxMonthly } = programme.salary
  return `${formatCedis(minMonthly)}, ${maxMonthly.toLocaleString('en-GH')}/mo`
}

export function formatEmploymentRate(programme: Programme): string | null {
  return programme.employmentRatePct === undefined ? null : `${programme.employmentRatePct}%`
}

/** True when the aggregate is a competitive cut-off rather than an entry floor. */
export function hasPublishedCutoff(programme: Programme): boolean {
  return programme.requirements.aggregateBasis !== 'general-minimum'
}

/**
 * What to call the aggregate on a card. A university that publishes no
 * per-programme list still publishes the aggregate you need to be eligible,
 * which is a real, confirmed figure, just a different one.
 */
export function aggregateLabel(programme: Programme): string {
  return hasPublishedCutoff(programme) ? 'Cut-off' : 'Entry requirement'
}

/**
 * Comparator that sorts by an optional numeric field, always pushing records
 * without a value to the end regardless of direction, a missing fee must
 * never look like the cheapest option.
 */
export function byOptional<T>(
  get: (item: T) => number | undefined,
  direction: 'asc' | 'desc' = 'asc',
): (a: T, b: T) => number {
  return (a, b) => {
    const left = get(a)
    const right = get(b)
    if (left === undefined && right === undefined) return 0
    if (left === undefined) return 1
    if (right === undefined) return -1
    return direction === 'asc' ? left - right : right - left
  }
}

/** Only the programmes that actually carry a value for `get`. */
export function withValue<T>(items: T[], get: (item: T) => number | undefined): T[] {
  return items.filter((item) => get(item) !== undefined)
}

/**
 * Whether any record carries these figures at all.
 *
 * Most Ghanaian universities publish neither fees nor salaries per programme,
 * so sorting or filtering by them would be a control that does nothing. The UI
 * hides those affordances rather than offering a dead one.
 */
export const hasAnyFees: boolean = programmes.some((p) => p.annualFeesGhs !== undefined)
export const hasAnySalary: boolean = programmes.some((p) => p.salary !== undefined)
