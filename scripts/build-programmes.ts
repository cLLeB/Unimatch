/**
 * Expand the compact cut-off tables in scripts/sources/ into
 * data/seed/programmes.json.
 *
 * Keeping transcription (sources/) separate from derivation (here) means every
 * record is produced by one code path, and a figure can be checked against its
 * published table without reading through generated JSON.
 *
 *   npm run data:programmes
 */
import { writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type {
  AdmissionTrack,
  Programme,
  QualificationLevel,
  SubjectRequirement,
} from '../src/domain/catalogue/types'
import type { Grade } from '../src/domain/wassce/types'
import universitiesJson from '../data/seed/universities.json' with { type: 'json' }
import { knust } from './sources/knust'
import { atu, uds, uew, uhas, upsa } from './sources/others'
import { PRIVATE_SOURCES } from './sources/private'
import { ucc } from './sources/ucc'
import { ug } from './sources/ug'
import { careersFor, feeBandFor, overviewFor } from './sources/enrichment'
import type { RawProgramme, SourceFile } from './sources/types'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const OUT = join(ROOT, 'data', 'seed', 'programmes.json')

const SOURCES: SourceFile[] = [ug, knust, ucc, uew, uds, uhas, upsa, atu, ...PRIVATE_SOURCES]

/** Degree prefixes we can recognise from a name or an explicit `d`. */
const DEGREE_DURATION: Record<string, number> = {
  MBChB: 6,
  BDS: 6,
  PharmD: 6,
  DVM: 6,
  OD: 6,
  Diploma: 2,
  Certificate: 1,
}

const DEGREE_LEVEL: Record<string, QualificationLevel> = {
  Diploma: 'diploma',
  Certificate: 'certificate',
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function degreeOf(row: RawProgramme): string {
  if (row.d) return row.d
  // Default for an unprefixed Ghanaian undergraduate programme.
  return 'BSc'
}

function durationOf(row: RawProgramme, degree: string): number {
  if (row.y) return row.y
  return DEGREE_DURATION[degree] ?? 4
}

function levelOf(degree: string): QualificationLevel {
  return DEGREE_LEVEL[degree] ?? 'degree'
}

/** Parse "Subject:Grade" into a requirement. */
function parseRequirement(entry: string): SubjectRequirement {
  const [subject, grade] = entry.split(':')
  if (!subject || !grade) {
    throw new Error(`Malformed requirement "${entry}" (expected "Subject:Grade")`)
  }
  return { subject: subject.trim(), minimumGrade: grade.trim() as Grade }
}

function coreRequirements(source: SourceFile, row: RawProgramme): SubjectRequirement[] {
  const overrides = new Map(
    (row.core ?? []).map((entry) => {
      const requirement = parseRequirement(entry)
      return [requirement.subject, requirement]
    }),
  )

  const thirdCore = source.scienceCore ? 'Integrated Science' : 'Social Studies'
  const base: SubjectRequirement[] = [
    { subject: 'English Language', minimumGrade: 'C6' },
    { subject: 'Core Mathematics', minimumGrade: 'C6' },
    { subject: thirdCore, minimumGrade: 'C6' },
  ]

  return base.map((requirement) => overrides.get(requirement.subject) ?? requirement)
}

const TRACK_SUFFIX: Record<AdmissionTrack, string> = {
  regular: '',
  'fee-paying': '-fee-paying',
  distance: '-distance',
  'city-campus': '-city',
}

const usedIds = new Set<string>()

function uniqueId(base: string): string {
  if (!usedIds.has(base)) {
    usedIds.add(base)
    return base
  }
  let n = 2
  while (usedIds.has(`${base}-${n}`)) n += 1
  const id = `${base}-${n}`
  usedIds.add(id)
  return id
}

function buildRecord(
  source: SourceFile,
  row: RawProgramme,
  track: AdmissionTrack,
  cutoff: number,
): Programme {
  const degree = degreeOf(row)
  const duration = durationOf(row, degree)
  const level = levelOf(degree)

  const notes: string[] = []
  if (row.note) notes.push(row.note)

  if (track === 'fee-paying') {
    notes.push('Full-fee-paying admission. The regular-track cut-off is lower.')
  }
  if (track === 'distance') {
    notes.push('Distance-learning intake, which has its own cut-off.')
  }
  if (row.male !== undefined && row.female !== undefined && row.male !== row.female) {
    notes.push(
      `Published separately by gender: ${row.male} for male applicants, ${row.female} for female applicants. The stricter figure is shown.`,
    )
  }
  if (source.provenance.confidence === 'estimated') {
    notes.push(
      'No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off.',
    )
  } else if (source.provenance.confidence === 'researched') {
    notes.push('Reported by a secondary source. Confirm on the university portal before applying.')
  }

  const id = uniqueId(`${source.universityId}-${slug(row.n)}${TRACK_SUFFIX[track]}`)

  const universityName =
    (universitiesJson as { id: string; name: string }[]).find((u) => u.id === source.universityId)
      ?.name ?? source.universityId
  const fees = feeBandFor(source, row)

  return {
    id,
    name: row.n,
    universityId: source.universityId,
    faculty: row.f ?? 'Undergraduate Studies',
    degreeType: degree,
    durationYears: duration,
    campus: row.campus ?? source.defaultCampus,
    region: source.region,
    admissionTrack: track,
    qualificationLevel: level,
    requirements: {
      minimumAggregate: cutoff,
      coreSubjects: coreRequirements(source, row),
      electiveSubjects: (row.req ?? []).map(parseRequirement),
      notes,
    },
    provenance: { ...source.provenance },
    overview: overviewFor(row, universityName, degree, duration, cutoff, track),
    careers: careersFor(row),
    ...(fees ? { fees, annualFeesGhs: Math.round((fees.minGhs + fees.maxGhs) / 2) } : {}),
    ...(row.male !== undefined && row.female !== undefined
      ? { cutoffByGender: { male: row.male, female: row.female } }
      : {}),
  }
}

const programmes: Programme[] = []

for (const source of SOURCES) {
  for (const row of source.rows) {
    const track: AdmissionTrack = row.track ?? 'regular'

    // UEW-style gendered cut-offs: use the stricter of the two so the app never
    // over-promises to the applicant facing the tighter figure.
    const headline =
      row.male !== undefined && row.female !== undefined
        ? Math.min(row.male, row.female)
        : row.c

    programmes.push(buildRecord(source, row, track, headline))

    if (row.ff !== undefined) {
      programmes.push(buildRecord(source, row, 'fee-paying', row.ff))
    }
  }
}

programmes.sort((a, b) => a.id.localeCompare(b.id))

writeFileSync(OUT, `${JSON.stringify(programmes, null, 2)}\n`, 'utf8')

const byUniversity = programmes.reduce<Record<string, number>>((acc, programme) => {
  acc[programme.universityId] = (acc[programme.universityId] ?? 0) + 1
  return acc
}, {})

const byTrack = programmes.reduce<Record<string, number>>((acc, programme) => {
  acc[programme.admissionTrack] = (acc[programme.admissionTrack] ?? 0) + 1
  return acc
}, {})

console.log(`✓ ${programmes.length} programmes written to data/seed/programmes.json`)
console.log('  by university:', byUniversity)
console.log('  by track:', byTrack)
