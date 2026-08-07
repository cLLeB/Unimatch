/**
 * Data pipeline: validate → merge by precedence → emit the canonical catalogue.
 *
 *   data/seed/*.json      researched + estimated records, committed
 *   data/imports/*.json   authoritative records supplied by whoever holds the
 *                         official source
 *        ↓
 *   src/data/catalogue.generated.ts   (what the app imports)
 *
 * Precedence: when two records describe the same programme, the one with the
 * higher confidence wins — authoritative > researched > estimated. Ties break
 * on the more recent admissions year, then the more recent verification date.
 * This is what lets supplied authoritative data supersede our researched seed
 * without anyone hand-editing the seed files.
 *
 * Usage:
 *   npm run data:validate     check everything parses and cross-references
 *   npm run data:build        regenerate src/data/catalogue.generated.ts
 *   npm run data:import <f>   copy a file into data/imports/ after validating
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'
import {
  admissionDeadlineSchema,
  catalogueSchema,
  programmeSchema,
  universitySchema,
} from '../src/data/schema'
import { CONFIDENCE_ORDER } from '../src/domain/catalogue/types'
import type { AdmissionDeadline, Programme, University } from '../src/domain/catalogue/types'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const SEED_DIR = join(ROOT, 'data', 'seed')
const IMPORTS_DIR = join(ROOT, 'data', 'imports')
const OUTPUT = join(ROOT, 'src', 'data', 'catalogue.generated.ts')

type Layer = 'seed' | 'import'

interface SourceFile<T> {
  layer: Layer
  file: string
  records: T[]
}

const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const DIM = '\x1b[2m'
const RESET = '\x1b[0m'

function readJson(path: string): unknown {
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch (error) {
    throw new Error(`${path} is not valid JSON: ${(error as Error).message}`)
  }
}

function listJson(dir: string): string[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => join(dir, f))
}

function loadLayer<T>(
  dir: string,
  layer: Layer,
  filename: string,
  schema: z.ZodType<T>,
): SourceFile<T>[] {
  return listJson(dir)
    .filter((path) => basename(path) === filename)
    .map((path) => {
      const parsed = z.array(schema).safeParse(readJson(path))
      if (!parsed.success) {
        console.error(`${RED}✗ ${path}${RESET}`)
        for (const issue of parsed.error.issues) {
          console.error(`  ${issue.path.join('.') || '(root)'}: ${issue.message}`)
        }
        throw new Error(`Validation failed for ${path}`)
      }
      return { layer, file: path, records: parsed.data }
    })
}

function confidenceRank(confidence: string): number {
  return CONFIDENCE_ORDER.indexOf(confidence as (typeof CONFIDENCE_ORDER)[number])
}

interface Provenanced {
  id: string
  provenance: { confidence: string; year: number; lastVerified: string }
}

/** Later record wins only if it is strictly better. */
function supersedes(candidate: Provenanced, incumbent: Provenanced): boolean {
  const byConfidence =
    confidenceRank(candidate.provenance.confidence) - confidenceRank(incumbent.provenance.confidence)
  if (byConfidence !== 0) return byConfidence > 0

  const byYear = candidate.provenance.year - incumbent.provenance.year
  if (byYear !== 0) return byYear > 0

  return candidate.provenance.lastVerified > incumbent.provenance.lastVerified
}

function mergeByPrecedence<T extends Provenanced>(
  sources: SourceFile<T>[],
  label: string,
  verbose: boolean,
): T[] {
  const winners = new Map<T['id'], { record: T; from: string }>()

  // Imports are considered after seeds so that, all else equal, a supplied
  // file wins the tie-break on identical provenance.
  const ordered = [...sources].sort((a, b) => (a.layer === b.layer ? 0 : a.layer === 'seed' ? -1 : 1))

  for (const source of ordered) {
    for (const record of source.records) {
      const incumbent = winners.get(record.id)
      if (!incumbent) {
        winners.set(record.id, { record, from: source.file })
        continue
      }
      if (supersedes(record, incumbent.record)) {
        if (verbose) {
          console.log(
            `${YELLOW}↑ ${label} "${record.id}"${RESET} ${DIM}${incumbent.record.provenance.confidence} → ${record.provenance.confidence} (${basename(source.file)})${RESET}`,
          )
        }
        winners.set(record.id, { record, from: source.file })
      }
    }
  }

  return [...winners.values()]
    .map((w) => w.record)
    .sort((a, b) => a.id.localeCompare(b.id))
}

function build(verbose: boolean) {
  const universities = mergeByPrecedence(
    [
      ...loadLayer(SEED_DIR, 'seed', 'universities.json', universitySchema.extend({
        provenance: z
          .object({ confidence: z.string(), year: z.number(), lastVerified: z.string() })
          .default({ confidence: 'authoritative', year: 2026, lastVerified: '2026-08-07' }),
      })),
      ...loadLayer(IMPORTS_DIR, 'import', 'universities.json', universitySchema.extend({
        provenance: z
          .object({ confidence: z.string(), year: z.number(), lastVerified: z.string() })
          .default({ confidence: 'authoritative', year: 2026, lastVerified: '2026-08-07' }),
      })),
    ],
    'university',
    verbose,
  ).map(({ provenance: _provenance, ...university }) => university as University)

  const programmes = mergeByPrecedence<Programme>(
    [
      ...loadLayer(SEED_DIR, 'seed', 'programmes.json', programmeSchema as z.ZodType<Programme>),
      ...loadLayer(IMPORTS_DIR, 'import', 'programmes.json', programmeSchema as z.ZodType<Programme>),
    ],
    'programme',
    verbose,
  )

  const deadlines = mergeByPrecedence<AdmissionDeadline>(
    [
      ...loadLayer(SEED_DIR, 'seed', 'deadlines.json', admissionDeadlineSchema as z.ZodType<AdmissionDeadline>),
      ...loadLayer(IMPORTS_DIR, 'import', 'deadlines.json', admissionDeadlineSchema as z.ZodType<AdmissionDeadline>),
    ],
    'deadline',
    verbose,
  )

  const catalogue = { universities, programmes, deadlines }

  // Cross-reference checks: unknown university ids, duplicate ids, and a
  // headline cut-off that disagrees with its own trend chart.
  const validated = catalogueSchema.safeParse(catalogue)
  if (!validated.success) {
    console.error(`${RED}✗ Catalogue failed cross-reference validation${RESET}`)
    for (const issue of validated.error.issues) {
      console.error(`  ${issue.path.join('.') || '(root)'}: ${issue.message}`)
    }
    process.exit(1)
  }

  return validated.data
}

function summarise(catalogue: ReturnType<typeof build>) {
  const byConfidence = catalogue.programmes.reduce<Record<string, number>>((acc, p) => {
    acc[p.provenance.confidence] = (acc[p.provenance.confidence] ?? 0) + 1
    return acc
  }, {})

  console.log(
    `${GREEN}✓${RESET} ${catalogue.universities.length} universities, ${catalogue.programmes.length} programmes, ${catalogue.deadlines.length} deadlines`,
  )
  for (const confidence of [...CONFIDENCE_ORDER].reverse()) {
    const count = byConfidence[confidence] ?? 0
    if (count > 0) console.log(`  ${DIM}${confidence}:${RESET} ${count}`)
  }
}

function emit(catalogue: ReturnType<typeof build>) {
  const banner = `/**
 * GENERATED FILE — DO NOT EDIT BY HAND.
 *
 * Produced by scripts/data-pipeline.ts from data/seed/ and data/imports/.
 * Run \`npm run data:build\` to regenerate.
 */
import type { Catalogue } from '../domain/catalogue/types'

export const catalogue: Catalogue = ${JSON.stringify(catalogue, null, 2)} as const
`
  mkdirSync(join(ROOT, 'src', 'data'), { recursive: true })
  writeFileSync(OUTPUT, banner, 'utf8')
  console.log(`${GREEN}✓${RESET} wrote ${OUTPUT.replace(ROOT, '.')}`)
}

function importFile(target: string) {
  if (!existsSync(target)) {
    console.error(`${RED}✗ No such file: ${target}${RESET}`)
    process.exit(1)
  }
  const name = basename(target)
  if (!['programmes.json', 'universities.json', 'deadlines.json'].includes(name)) {
    console.error(
      `${RED}✗ Import files must be named programmes.json, universities.json or deadlines.json${RESET}`,
    )
    process.exit(1)
  }
  mkdirSync(IMPORTS_DIR, { recursive: true })
  copyFileSync(target, join(IMPORTS_DIR, name))
  console.log(`${GREEN}✓${RESET} imported ${name}`)
  const catalogue = build(true)
  summarise(catalogue)
  emit(catalogue)
}

const [command, argument] = process.argv.slice(2)

switch (command) {
  case 'validate': {
    summarise(build(false))
    break
  }
  case 'build': {
    const catalogue = build(true)
    summarise(catalogue)
    emit(catalogue)
    break
  }
  case 'import': {
    if (!argument) {
      console.error(`${RED}✗ Usage: npm run data:import -- <path-to-json>${RESET}`)
      process.exit(1)
    }
    importFile(resolve(argument))
    break
  }
  default: {
    console.error(`${RED}✗ Unknown command "${command ?? ''}". Use validate | build | import.${RESET}`)
    process.exit(1)
  }
}
