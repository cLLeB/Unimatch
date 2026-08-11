import { describe, expect, it } from 'vitest'
import { RETIRED_SOURCE_URLS } from '../../scripts/link-registry'
import { deadlines, programmes, universities } from './catalogue'

/**
 * The external links are structurally sound, checked without touching the
 * network so it runs on every commit.
 *
 * `npm run data:audit-links` is what proves the pages are actually there; this
 * catches the cheaper failure that produced the original mess. Every one of
 * the nineteen "official admissions page" links had been derived from the same
 * guess, `<domain>/admissions`, and seventeen led nowhere: four to domains
 * the university had left, one to a job advert for an admissions officer.
 * Nothing in the build objected, because a plausible URL and a real one are
 * the same string to a type checker.
 */

const allUrls = [
  ...universities.flatMap((u) => [u.admissionsUrl, u.programmesUrl, u.cutoffUrl]),
  ...programmes.flatMap((p) => [p.officialUrl, p.applyUrl, p.provenance.sourceUrl, p.fees?.sourceUrl]),
  ...deadlines.map((d) => d.provenance.sourceUrl),
].filter((url): url is string => url !== undefined)

describe('external links', () => {
  it('gives every university all three destinations', () => {
    const incomplete = universities
      .filter((u) => !u.admissionsUrl || !u.programmesUrl || !u.cutoffUrl)
      .map((u) => u.id)

    expect(incomplete).toEqual([])
  })

  it('never reuses a URL already found dead', () => {
    const revived = allUrls.filter((url) => RETIRED_SOURCE_URLS.has(url))

    expect([...new Set(revived)]).toEqual([])
  })

  it('links only over https, since these open outside the app', () => {
    expect(allUrls.filter((url) => !url.startsWith('https://'))).toEqual([])
  })

  it('cites a source for every cut-off, so no figure asks to be taken on trust', () => {
    expect(programmes.filter((p) => !p.provenance.sourceUrl).map((p) => p.id)).toEqual([])
  })

  /**
   * A deadline is cited to the university that set it.
   *
   * The KNUST deadline was sourced to a YEN news article, which the card then
   * offered under the words "Check the university portal". It also disagreed
   * with KNUST: the article gave one date for everyone, where KNUST publishes
   * 31 August for mature, top-up and international applicants and "until
   * WASSCE results are released" for Ghanaian WASSCE applicants, that is,
   * for almost everyone using this app.
   */
  it('cites every deadline to the university that set it', () => {
    const registrableDomain = (url: string) => new URL(url).hostname.split('.').slice(-3).join('.')

    const offsite = deadlines
      .map((d) => ({ d, university: universities.find((u) => u.id === d.universityId) }))
      .filter(
        ({ d, university }) =>
          !d.provenance.sourceUrl ||
          !university?.admissionsUrl ||
          registrableDomain(d.provenance.sourceUrl) !== registrableDomain(university.admissionsUrl),
      )
      .map(({ d }) => `${d.id} -> ${d.provenance.sourceUrl ?? '(none)'}`)

    expect(offsite).toEqual([])
  })

  /**
   * An exact programme link has to be that university's own page. Matching
   * programme names across nineteen catalogues is fuzzy work, and the failure
   * that matters is a UCC record quietly pointing at a UDS page.
   */
  it('keeps every exact programme link on its own university’s site', () => {
    const registrableDomain = (url: string) => new URL(url).hostname.split('.').slice(-3).join('.')

    const strays = programmes
      .filter((p) => p.officialUrl)
      .map((p) => ({ p, university: universities.find((u) => u.id === p.universityId) }))
      .filter(
        ({ p, university }) =>
          !university?.programmesUrl ||
          registrableDomain(p.officialUrl!) !== registrableDomain(university.programmesUrl),
      )
      .map(({ p }) => `${p.id} -> ${p.officialUrl!}`)

    expect(strays).toEqual([])
  })
})
