import knustJson from '../../data/authoritative/knust-official.json' with { type: 'json' }
import type { Provenance } from '../../src/domain/catalogue/types'

/**
 * KNUST's own published cut-off aggregates.
 *
 * Source: "Entry Requirements and Guidelines for Selecting an Undergraduate
 * Programme", Academic Affairs Division, Registrar's Office, April 2026.
 *
 * The supplied spreadsheet was transcribed from images of this same table and
 * agrees with it on 45 of the 47 programmes they share, so this is the same
 * authority rather than a second opinion. What it adds is the programmes the
 * transcription missed, including the College of Engineering rows the
 * spreadsheet's own note records as cropped off the top of the source image.
 *
 * It matters because our figures for these came from an admissions listing
 * that runs about two points loose on average and up to ten points loose on
 * individual programmes. Loose is the dangerous direction: Agricultural
 * Engineering was showing 23 where the university admits at 13, which tells a
 * student to give up on a place they would have got.
 */

const { rows, year, source, sourceUrl, lastVerified } = knustJson as unknown as {
  rows: { id: string; name: string; was: number; cutoff: number }[]
  year: number
  source: string
  sourceUrl: string
  lastVerified: string
}

export const KNUST_OFFICIAL_PROVENANCE: Provenance = {
  source,
  sourceUrl,
  year,
  lastVerified,
  confidence: 'authoritative',
}

/** Programme id to the aggregate the university itself publishes. */
export const KNUST_OFFICIAL = new Map<string, number>(rows.map((row) => [row.id, row.cutoff]))
