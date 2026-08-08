/**
 * Collapse the seed catalogue into the small lookup the reminder Edge Function
 * needs, at supabase/functions/_shared/reminder-data.json.
 *
 * The function runs on Deno inside Supabase, not in this bundle, and the CLI
 * only reliably ships files that live under supabase/functions/. So rather than
 * have the function reach across the repo into data/seed/ — an import that may
 * or may not survive bundling — the few fields it actually reads are generated
 * into its own directory, and reminder-data.test.ts fails if that copy drifts
 * from the seed.
 *
 * programmes.json is a megabyte and the function needs two fields of it: which
 * university a saved programme belongs to, so a student is only reminded about
 * deadlines that can affect them.
 *
 *   npm run data:functions
 */
import { writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import deadlinesJson from '../data/seed/deadlines.json' with { type: 'json' }
import programmesJson from '../data/seed/programmes.json' with { type: 'json' }
import universitiesJson from '../data/seed/universities.json' with { type: 'json' }

export interface ReminderDeadline {
  id: string
  universityId: string
  scope: string
  /** Absent for open-ended intakes, which are never counted down. */
  closesOn?: string
  sourceUrl: string
}

export interface ReminderData {
  /** universityId -> the short name a student recognises. */
  universities: Record<string, string>
  /** programmeId -> universityId. */
  programmeUniversity: Record<string, string>
  deadlines: ReminderDeadline[]
}

export function buildReminderData(): ReminderData {
  const universities: Record<string, string> = {}
  for (const university of universitiesJson) {
    universities[university.id] = university.shortName || university.name
  }

  const programmeUniversity: Record<string, string> = {}
  for (const programme of programmesJson) {
    programmeUniversity[programme.id] = programme.universityId
  }

  const deadlines: ReminderDeadline[] = deadlinesJson.map((deadline) => ({
    id: deadline.id,
    universityId: deadline.universityId,
    scope: deadline.scope,
    ...('closesOn' in deadline && typeof deadline.closesOn === 'string'
      ? { closesOn: deadline.closesOn }
      : {}),
    sourceUrl: deadline.provenance.sourceUrl,
  }))

  return { universities, programmeUniversity, deadlines }
}

/**
 * Resolved lazily. Computing it at module scope broke reminder-data.test.ts,
 * which imports buildReminderData for the drift check: under vitest
 * import.meta.url is not a file: URL and fileURLToPath throws on import.
 */
export function reminderDataPath(): string {
  return resolve(
    join(fileURLToPath(new URL('.', import.meta.url)), '..'),
    'supabase',
    'functions',
    '_shared',
    'reminder-data.json',
  )
}

function main(): void {
  const data = buildReminderData()
  writeFileSync(reminderDataPath(), `${JSON.stringify(data, null, 2)}\n`, 'utf8')

  const dated = data.deadlines.filter((deadline) => deadline.closesOn).length
  process.stdout.write(
    `reminder-data.json: ${Object.keys(data.universities).length} universities, ` +
      `${Object.keys(data.programmeUniversity).length} programmes, ` +
      `${data.deadlines.length} deadlines (${dated} dated)\n`,
  )
}

const invokedDirectly =
  process.argv[1] !== undefined &&
  fileURLToPath(import.meta.url) === resolve(process.argv[1])

if (invokedDirectly) {
  main()
}
