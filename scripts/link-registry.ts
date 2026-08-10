/**
 * Every external destination the catalogue links to, one place.
 *
 * The prototype derived these by convention — `<domain>/admissions` for all
 * nineteen universities. Seventeen of those were dead: four domains had moved
 * or expired (Methodist to mug.edu.gh, All Nations to anu.edu.gh), nine
 * returned 404, and Academic City's redirected to a job advert for an
 * admissions officer. A student following "Apply Now" from a programme page
 * mostly reached nothing.
 *
 * So nothing here is inferred from a pattern. Each URL was read off the
 * university's own site and fetched to confirm it resolves; run
 * `npm run data:audit-links` to re-check them all.
 */

export interface UniversityLinks {
  /** Where an applicant applies: the portal, or the "how to apply" page. */
  admissionsUrl: string
  /** The university's own catalogue of undergraduate programmes. */
  programmesUrl: string
  /** Where cut-offs or minimum entry requirements are published. */
  cutoffUrl: string
  /**
   * Overrides for admission tracks a separate body runs. KNUST's distance
   * programmes belong to the Institute of Distance Learning, and applying on
   * the main portal instead is a wasted voucher.
   */
  tracks?: Partial<Record<string, string>>
}

export const UNIVERSITY_LINKS: Record<string, UniversityLinks> = {
  knust: {
    admissionsUrl: 'https://apps.knust.edu.gh/admissions',
    programmesUrl: 'https://www.knust.edu.gh/admissions/prospective/applying',
    cutoffUrl: 'https://webapps.knust.edu.gh/check/forms/Admission_Requirement.pdf',
    tracks: {
      distance: 'https://idl.knust.edu.gh/programmes',
      'fee-paying': 'https://www.knust.edu.gh/announcements/undergraduate-admissions',
    },
  },
  ug: {
    admissionsUrl: 'https://admissions.ug.edu.gh',
    programmesUrl: 'https://admissions.ug.edu.gh/undergraduate/overview',
    cutoffUrl: 'https://admissions.ug.edu.gh/undergraduate/cut-off',
    tracks: { 'fee-paying': 'https://admissions.ug.edu.gh/undergraduate/entry-requirements' },
  },
  ucc: {
    admissionsUrl: 'https://admissions.ucc.edu.gh/how-to-apply',
    programmesUrl: 'https://admissions.ucc.edu.gh/programmes/undergraduate',
    cutoffUrl: 'https://admissions.ucc.edu.gh/catalogue/programme/cut-off-points',
    tracks: { distance: 'https://code.ucc.edu.gh/' },
  },
  uds: {
    admissionsUrl: 'https://www.uds.edu.gh/admissions/application-procedure',
    programmesUrl: 'https://www.uds.edu.gh/academics/programmes',
    cutoffUrl: 'https://www.uds.edu.gh/admissions/entry-requirements',
  },
  uew: {
    admissionsUrl: 'https://www.uew.edu.gh/admissions',
    programmesUrl: 'https://www.uew.edu.gh/academics/programmes/regular-programmes',
    cutoffUrl: 'https://www.uew.edu.gh/admissions',
  },
  uhas: {
    admissionsUrl: 'https://uhas.edu.gh/uhas/index.php/admission/application-guidelines',
    programmesUrl: 'https://uhas.edu.gh/uhas/admission/programme/undergraduate',
    cutoffUrl: 'https://uhas.edu.gh/uhas/index.php/admission/cutoff-points',
  },
  upsa: {
    admissionsUrl: 'https://admissions.upsa.edu.gh/admissions/undergraduate/how-to-apply-undergrad/',
    programmesUrl:
      'https://admissions.upsa.edu.gh/admissions/undergraduate/undergraduate-programmes/',
    cutoffUrl:
      'https://admissions.upsa.edu.gh/admissions/undergraduate/undergrad-entry-requirements/',
    tracks: {
      distance: 'https://admissions.upsa.edu.gh/admissions/distance-learning-blended-online-learning/',
    },
  },
  atu: {
    admissionsUrl: 'https://icampus.atu.edu.gh/',
    programmesUrl: 'https://atu.edu.gh/available-programmes/',
    cutoffUrl: 'https://atu.edu.gh/available-programmes/',
  },
  ashesi: {
    admissionsUrl: 'https://admissions.ashesi.edu.gh/',
    programmesUrl: 'https://ashesi.edu.gh/academics-overview/',
    cutoffUrl: 'https://ashesi.edu.gh/admissions/',
  },
  central: {
    admissionsUrl: 'https://central.edu.gh/online',
    programmesUrl: 'https://central.edu.gh/admission',
    cutoffUrl: 'https://central.edu.gh/admission?section=entry-requirements',
  },
  'valley-view': {
    admissionsUrl: 'https://admissions.vvu.edu.gh/admissions/website',
    programmesUrl: 'https://admissions.vvu.edu.gh/admissions/website',
    cutoffUrl: 'https://admissions.vvu.edu.gh/admissions/website',
  },
  pentecost: {
    admissionsUrl: 'https://pentvars.edu.gh/admissions/',
    programmesUrl: 'https://pentvars.edu.gh/academics/programmes/?type=undergraduate',
    cutoffUrl: 'https://pentvars.edu.gh/admissions/',
  },
  gctu: {
    admissionsUrl: 'https://site.gctu.edu.gh/how-to-apply',
    programmesUrl: 'https://site.gctu.edu.gh/undergraduate-programmes',
    cutoffUrl: 'https://site.gctu.edu.gh/undergraduate-admission-requirement',
    tracks: { distance: 'https://icde.gctu.edu.gh/' },
  },
  'academic-city': {
    admissionsUrl: 'https://admissions.acity.edu.gh/undergraduate',
    programmesUrl: 'https://acity.edu.gh/undergraduate-programmes/',
    cutoffUrl: 'https://acity.edu.gh/undergraduate-programmes/',
  },
  // mucg.edu.gh no longer resolves; the university is on mug.edu.gh.
  methodist: {
    admissionsUrl: 'https://mug.edu.gh/how-to-apply-online/',
    programmesUrl: 'https://mug.edu.gh/undergraduate/',
    cutoffUrl: 'https://mug.edu.gh/undergraduate/',
  },
  regent: {
    admissionsUrl: 'https://regent.edu.gh/apply.php',
    programmesUrl: 'https://regent.edu.gh/programmes.php',
    cutoffUrl: 'https://regent.edu.gh/page.php?slug=admissions',
  },
  // allnationsuniversity.org returns a Cloudflare origin DNS error; the
  // university is on anu.edu.gh.
  'all-nations': {
    admissionsUrl: 'https://anu.edu.gh/apply-to-anu',
    programmesUrl: 'https://anu.edu.gh/schools/programs',
    cutoffUrl: 'https://anu.edu.gh/schools/programs',
  },
  catholic: {
    admissionsUrl: 'https://apply.cug.edu.gh/',
    // "udergraduate" is the university's own spelling of the path.
    programmesUrl: 'https://cug.edu.gh/admissions/udergraduate-programmes',
    cutoffUrl: 'https://cug.edu.gh/admissions/how-to-apply',
  },
  wisconsin: {
    admissionsUrl: 'https://wiucapps.wiuc-ghana.edu.gh/admissions',
    programmesUrl: 'https://wiuc-ghana.edu.gh/undergraduate/',
    cutoffUrl: 'https://wiuc-ghana.edu.gh/how-to-apply/',
  },
}

/**
 * URLs the catalogue used to cite that no longer resolve.
 *
 * All of them are the same guess — `<domain>/admissions` — made once and
 * copied across every record of a university. They are listed rather than
 * pattern-matched so that a genuine `/admissions` page, like Pentecost's,
 * is not thrown away with them.
 *
 * A provenance citation pointing here is repointed at that university's
 * `cutoffUrl`, which is where it publishes the entry requirements the
 * citation describes.
 */
export const RETIRED_SOURCE_URLS = new Set([
  'https://allnationsuniversity.org/admissions',
  'https://atu.edu.gh/admissions',
  'https://central.edu.gh/admissions',
  'https://cug.edu.gh/admissions',
  'https://gctu.edu.gh/admissions',
  'https://mucg.edu.gh/admissions',
  'https://regent.edu.gh/admissions',
  'https://uds.edu.gh/admissions',
  'https://uew.edu.gh/admissions',
  'https://uhas.edu.gh/admissions',
  'https://upsa.edu.gh/admissions',
  'https://vvu.edu.gh/admissions',
  'https://wiuc-ghana.edu.gh/admissions',
  'https://www.ashesi.edu.gh/admissions',
  'https://www.uew.edu.gh/admissions/apply/entry-requirements',
  'https://acity.edu.gh/admissions',
  'https://admission.ucc.edu.gh',
  'https://admission.ug.edu.gh',
])

/** Where a programme on this track should send an applicant to apply. */
export function applyUrlFor(universityId: string, track: string): string | undefined {
  const links = UNIVERSITY_LINKS[universityId]
  if (!links) return undefined
  const override = links.tracks?.[track]
  return override && override !== links.admissionsUrl ? override : undefined
}
