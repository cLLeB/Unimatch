/**
 * Writes the verified external destinations into the seed data.
 *
 * Reads scripts/link-registry.ts (university-level, hand-verified) and
 * data/authoritative/programme-urls.json (per-programme, harvested from each
 * university's own catalogue), and stamps them onto the seed files. Idempotent:
 * running it twice produces the same output.
 *
 *   npx tsx scripts/apply-links.ts
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { RETIRED_SOURCE_URLS, UNIVERSITY_LINKS, applyUrlFor } from './link-registry'

const ROOT = resolve(import.meta.dirname, '..')
const read = (p: string) => JSON.parse(readFileSync(resolve(ROOT, p), 'utf8'))
const write = (p: string, v: unknown) =>
  writeFileSync(resolve(ROOT, p), `${JSON.stringify(v, null, 2)}\n`)

interface ProgrammeUrl {
  url: string
  officialName: string
}

const programmeUrls: Record<string, ProgrammeUrl> = read('data/authoritative/programme-urls.json')

/*
 * A cut-off figure has to cite where the university published it. 259 records
 * carried an `authoritative` confidence with no URL at all, which asks a
 * student to take the number on trust; each now points at the page or document
 * its university publishes the figures in.
 *
 * The eight KNUST records sourced to O3Schools keep that citation. Their
 * `source` text names O3Schools as a secondary source, so repointing the link
 * at KNUST would make the citation claim something it has not earned. They are
 * reachable, correctly labelled, and the student-facing links on those pages
 * now go to KNUST regardless.
 */
const THIRD_PARTY_TO_REPLACE = /ghanaunichecker\.com/

const universities = read('data/seed/universities.json') as Record<string, unknown>[]
const updatedUniversities = universities.map((u) => {
  const links = UNIVERSITY_LINKS[u.id as string]
  if (!links) throw new Error(`No verified links for university "${u.id as string}"`)
  return {
    ...u,
    admissionsUrl: links.admissionsUrl,
    programmesUrl: links.programmesUrl,
    cutoffUrl: links.cutoffUrl,
  }
})

interface SeedProgramme {
  id: string
  universityId: string
  admissionTrack: string
  provenance: { sourceUrl?: string; source: string }
  [key: string]: unknown
}

const programmes = read('data/seed/programmes.json') as SeedProgramme[]
const counts = { official: 0, applyOverride: 0, sourceFilled: 0, sourceReplaced: 0 }

const updatedProgrammes = programmes.map((p) => {
  const links = UNIVERSITY_LINKS[p.universityId]
  if (!links) throw new Error(`No verified links for university "${p.universityId}"`)

  const next: SeedProgramme = { ...p }

  const official = programmeUrls[p.id]
  if (official) {
    next.officialUrl = official.url
    counts.official++
  } else {
    delete next.officialUrl
  }

  const applyUrl = applyUrlFor(p.universityId, p.admissionTrack)
  if (applyUrl) {
    next.applyUrl = applyUrl
    counts.applyOverride++
  } else {
    delete next.applyUrl
  }

  const current = p.provenance.sourceUrl
  if (!current) {
    next.provenance = { ...p.provenance, sourceUrl: links.cutoffUrl }
    counts.sourceFilled++
  } else if (THIRD_PARTY_TO_REPLACE.test(current) || RETIRED_SOURCE_URLS.has(current)) {
    next.provenance = { ...p.provenance, sourceUrl: links.cutoffUrl }
    counts.sourceReplaced++
  }

  return next
})

write('data/seed/universities.json', updatedUniversities)
write('data/seed/programmes.json', updatedProgrammes)

console.log(`universities:     ${updatedUniversities.length} rewritten`)
console.log(`officialUrl:      ${counts.official} programmes`)
console.log(`applyUrl:         ${counts.applyOverride} track overrides`)
console.log(`provenance filled:   ${counts.sourceFilled}`)
console.log(`provenance replaced: ${counts.sourceReplaced}`)
