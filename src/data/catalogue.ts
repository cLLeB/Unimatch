import type {
  AdmissionDeadline,
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

export const CONFIDENCE_LABELS: Record<Confidence, string> = {
  authoritative: 'Official university source',
  researched: 'Researched, not yet confirmed with the university',
  estimated: 'Estimate, not an official figure',
}

export const CONFIDENCE_SHORT: Record<Confidence, string> = {
  authoritative: 'Official',
  researched: 'Unconfirmed',
  estimated: 'Estimate',
}

/** Format Ghana cedis without decimals, e.g. "GH₵ 4,200". */
export function formatCedis(amount: number): string {
  return `GH₵ ${amount.toLocaleString('en-GH')}`
}

/**
 * What the UI shows where a university publishes no figure.
 *
 * Most Ghanaian universities do not publish per-programme fees, salaries or
 * employment rates. Filling those gaps with plausible numbers is precisely the
 * fabrication this project removed, so the absence is stated instead.
 */
export const NOT_PUBLISHED = 'Not published'

export function formatFeesPerYear(programme: Programme): string {
  return programme.annualFeesGhs === undefined
    ? NOT_PUBLISHED
    : `${formatCedis(programme.annualFeesGhs)}/yr`
}

export function formatSalaryRange(programme: Programme): string {
  if (!programme.salary) return NOT_PUBLISHED
  const { minMonthly, maxMonthly } = programme.salary
  return `${formatCedis(minMonthly)}, ${maxMonthly.toLocaleString('en-GH')}/mo`
}

export function formatEmploymentRate(programme: Programme): string {
  return programme.employmentRatePct === undefined
    ? NOT_PUBLISHED
    : `${programme.employmentRatePct}%`
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
