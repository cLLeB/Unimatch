import masterJson from '../../data/authoritative/universities-master.json' with { type: 'json' }
import type { AdmissionTrack, Provenance } from '../../src/domain/catalogue/types'
import { knust } from './knust'
import { uhas, upsa } from './others'
import type { RawProgramme, SourceFile } from './types'
import { ucc } from './ucc'
import { ug } from './ug'

/**
 * Cut-off points supplied as confirmed data.
 *
 * These come from UNIVERSITIES_master.xlsx, transcribed into
 * data/authoritative/universities-master.json so every figure stays auditable
 * against the file it came from. They sit at the top of the provenance order:
 * where they cover a programme we already held on a secondary source, they
 * replace it and it becomes `authoritative`.
 *
 * Only cut-offs come from here. Fees, careers and overviews are untouched and
 * still derive from enrichment.ts, so nothing else in a record moves.
 *
 * The correction this brought is real. Our KNUST figures came from a secondary
 * listing and sat about five points above the university's own 2026/2027 list,
 * which would have told a student they had missed a programme they qualified
 * for. UG agrees on 41 of 42 shared programmes and Cape Coast on 63 of 72,
 * and that agreement is what makes the KNUST disagreement worth trusting.
 */

interface MasterRow {
  universityId: string
  name: string
  track: string
  aggregate: number | null
  rawCutoff: string | null
  label: string | null
  faculty: string | null
  degreeType: string | null
  requiredSubjects: string | null
  matchesId: string | null
  matchedBy: string | null
}

const { rows, years, sources, lastVerified } = masterJson as unknown as {
  rows: MasterRow[]
  years: Record<string, number>
  sources: Record<string, string>
  lastVerified: string
}

/** The national minimum for degree admission, for lists published without cut-offs. */
const DEGREE_MINIMUM = 24

function provenanceFor(universityId: string): Provenance {
  return {
    source: sources[universityId] ?? 'Supplied admissions data',
    year: years[universityId] ?? 2026,
    lastVerified,
    confidence: 'authoritative',
  }
}

/** Cut-offs that replace a figure we already hold, keyed by programme id. */
export const MASTER_OVERRIDES = new Map<string, { aggregate: number; provenance: Provenance }>()

for (const row of rows) {
  if (row.matchesId && row.aggregate !== null) {
    MASTER_OVERRIDES.set(row.matchesId, {
      aggregate: row.aggregate,
      provenance: provenanceFor(row.universityId),
    })
  }
}

/** Each university's own source file already establishes campus and region. */
const BASE: Record<string, SourceFile> = { ug, knust, ucc, uhas, upsa }

function toRow(row: MasterRow, aggregate: number): RawProgramme {
  return {
    n: row.name,
    c: aggregate,
    ...(row.faculty ? { f: row.faculty } : {}),
    ...(row.degreeType ? { d: row.degreeType } : {}),
    ...(row.track === 'regular' ? {} : { track: row.track as AdmissionTrack }),
    // "7(9)" and "16*/18*" carry a second figure the headline cannot hold.
    ...(row.rawCutoff && row.rawCutoff !== String(aggregate)
      ? { note: `Published as ${row.rawCutoff}${row.label ? ` (${row.label})` : ''}.` }
      : {}),
  }
}

/**
 * Programmes the supplied data covers that we did not hold at all.
 *
 * A university can contribute two files: one for programmes with a published
 * cut-off, and one for a list published without any. UPSA is the second case,
 * so its rows carry the national minimum and are marked `general-minimum`,
 * exactly like the other institutions that publish no per-programme list.
 */
export const MASTER_SOURCES: SourceFile[] = Object.entries(BASE).flatMap(
  ([universityId, base]) => {
    const owned = rows.filter((row) => row.matchesId === null && row.universityId === universityId)
    const withCutoff = owned.filter((row) => row.aggregate !== null)
    const general = owned.filter((row) => row.aggregate === null)

    const files: SourceFile[] = []

    if (withCutoff.length > 0) {
      files.push({
        ...base,
        aggregateBasis: 'published-cutoff',
        provenance: provenanceFor(universityId),
        rows: withCutoff.map((row) => toRow(row, row.aggregate!)),
      })
    }

    if (general.length > 0) {
      files.push({
        ...base,
        aggregateBasis: 'general-minimum',
        provenance: {
          source: `${sources[universityId]} No per-programme cut-off is published, so these show the minimum aggregate for degree admission.`,
          year: years[universityId] ?? 2026,
          lastVerified,
          confidence: 'authoritative',
        },
        rows: general.map((row) => toRow(row, DEGREE_MINIMUM)),
      })
    }

    return files
  },
)
