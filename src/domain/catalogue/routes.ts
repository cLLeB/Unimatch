import type { AdmissionTrack, Catalogue, Programme } from './types'

/**
 * The other ways into the same programme.
 *
 * Ghanaian universities publish a different aggregate for the same subject
 * depending on how you are admitted: regular, full-fee-paying, distance, or a
 * city campus. Each is a separate record, so a student reading the regular
 * page had no way to learn that the distance route at the same university
 * takes an aggregate nine points looser, which may be the one they qualify for.
 *
 * The published figure is the first-choice one. A university admits against a
 * ranked list of choices, and does not publish a per-programme figure for
 * anything below first, so this is the whole of what can honestly be shown.
 */
export interface AdmissionRoute {
  programme: Programme
  track: AdmissionTrack
  aggregate: number
  /** Points looser than the programme being viewed; negative is tighter. */
  difference: number
}

/** Fold "BSc Agriculture" and "Agriculture (BSc)" onto the same subject. */
function subjectKey(programme: Programme): string {
  return programme.name
    .toLowerCase()
    .replace(/\((?:bsc|ba|b\.?ed|bcom|llb|btech|diploma|certificate)\)/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

/**
 * Every other record for the same subject at the same university, loosest
 * first, so the route a struggling student is most likely to reach comes top.
 */
export function otherRoutesFor(catalogue: Catalogue, programme: Programme): AdmissionRoute[] {
  const key = subjectKey(programme)
  const here = programme.requirements.minimumAggregate

  return catalogue.programmes
    .filter(
      (candidate) =>
        candidate.id !== programme.id &&
        candidate.universityId === programme.universityId &&
        subjectKey(candidate) === key,
    )
    .map((candidate) => ({
      programme: candidate,
      track: candidate.admissionTrack,
      aggregate: candidate.requirements.minimumAggregate,
      difference: candidate.requirements.minimumAggregate - here,
    }))
    .sort((a, b) => b.aggregate - a.aggregate)
}

/**
 * The loosest route a given aggregate reaches, when the one being viewed is
 * out of reach.
 *
 * Loosest rather than nearest on purpose: a cut-off is last year's figure and
 * moves between cycles, so the route with the most margin is the one worth
 * naming. Undefined when none helps, and the UI then stays quiet.
 */
export function easierRouteFor(
  catalogue: Catalogue,
  programme: Programme,
  aggregate: number,
): AdmissionRoute | undefined {
  if (aggregate <= programme.requirements.minimumAggregate) return undefined
  return otherRoutesFor(catalogue, programme).find((route) => aggregate <= route.aggregate)
}
