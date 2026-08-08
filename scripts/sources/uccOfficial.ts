import uccJson from '../../data/authoritative/ucc-official.json' with { type: 'json' }
import type { Provenance } from '../../src/domain/catalogue/types'

/**
 * Cape Coast's own published cut-off points.
 *
 * Source: https://admissions.ucc.edu.gh/catalogue/programme/cut-off-points
 *
 * The table gives two figures per programme, one for applicants who apply
 * before their results and one for those applying with results in hand. The
 * post-WASSCE figure is taken where it exists, being the later cycle and the
 * one that applies to somebody using this app, and each row carries the year of
 * the figure actually used rather than a single year for the whole file.
 *
 * Distance and diploma intakes are not filled from here. Cape Coast publishes
 * those through its College of Distance Education at different aggregates, and
 * applying a regular-track figure to them would understate what they ask for.
 */

const { rows, source, sourceUrl, lastVerified } = uccJson as unknown as {
  rows: { id: string; name: string; was: number; cutoff: number; year: number }[]
  source: string
  sourceUrl: string
  lastVerified: string
}

export const UCC_OFFICIAL = new Map<string, { aggregate: number; provenance: Provenance }>(
  rows.map((row) => [
    row.id,
    {
      aggregate: row.cutoff,
      provenance: { source, sourceUrl, year: row.year, lastVerified, confidence: 'authoritative' },
    },
  ]),
)
