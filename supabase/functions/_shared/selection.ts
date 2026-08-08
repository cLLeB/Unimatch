/**
 * Who gets a reminder, and about what.
 *
 * This is the part of the job that can quietly go wrong: a bad window emails
 * students about deadlines that have already passed, and a bad filter emails
 * them about universities they never shortlisted. Both look like spam from the
 * receiving end, and an .app domain that gets marked as spam takes the sign-in
 * links down with it. So the logic lives here as plain functions with no Deno,
 * no network and no database, and is tested by the normal vitest suite.
 *
 * `daysUntil` is deliberately a copy of src/domain/deadlines/status.ts rather
 * than an import: this file is bundled by the Supabase CLI, which only reliably
 * ships what lives under supabase/functions/. selection.test.ts asserts the two
 * agree across a range of dates, so the copy cannot drift silently.
 */

export interface ReminderDeadline {
  id: string
  universityId: string
  scope: string
  closesOn?: string
  sourceUrl: string
}

export interface ReminderData {
  universities: Record<string, string>
  programmeUniversity: Record<string, string>
  deadlines: ReminderDeadline[]
}

/** A deadline, resolved for a particular student on a particular day. */
export interface SelectedDeadline {
  id: string
  universityName: string
  scope: string
  closesOn: string
  daysLeft: number
  sourceUrl: string
}

/** The subset of student_state the job reads. */
export interface StudentRow {
  user_id: string
  email: string
  name: string
  saved_programme_ids: string[]
}

/** Matches CLOSING_SOON_DAYS in src/domain/deadlines/status.ts. */
export const REMINDER_WINDOW_DAYS = 30

const MS_PER_DAY = 86_400_000

function startOfDay(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
}

export function daysUntil(closesOn: string, now: Date): number {
  const target = new Date(closesOn)
  if (Number.isNaN(target.getTime())) {
    throw new RangeError(`Invalid deadline date: ${closesOn}`)
  }
  return Math.round((startOfDay(target) - startOfDay(now)) / MS_PER_DAY)
}

/**
 * The Monday of the week containing `now`, as an ISO date.
 *
 * The de-duplication key. Ghana is GMT the whole year with no daylight saving,
 * so UTC is the local week and no timezone library is needed.
 */
export function weekKey(now: Date): string {
  const day = now.getUTCDay()
  const daysSinceMonday = (day + 6) % 7
  const monday = new Date(startOfDay(now) - daysSinceMonday * MS_PER_DAY)
  return monday.toISOString().slice(0, 10)
}

/**
 * Dated deadlines still ahead of us, closest first.
 *
 * Open-ended intakes are excluded: there is nothing to count down to, so a
 * weekly nudge about one would repeat forever and say nothing new.
 */
export function upcomingDeadlines(
  data: ReminderData,
  now: Date,
  windowDays: number = REMINDER_WINDOW_DAYS,
): SelectedDeadline[] {
  const upcoming: SelectedDeadline[] = []

  for (const deadline of data.deadlines) {
    if (!deadline.closesOn) continue

    const daysLeft = daysUntil(deadline.closesOn, now)
    if (daysLeft < 0 || daysLeft > windowDays) continue

    upcoming.push({
      id: deadline.id,
      universityName: data.universities[deadline.universityId] ?? deadline.universityId,
      scope: deadline.scope,
      closesOn: deadline.closesOn,
      daysLeft,
      sourceUrl: deadline.sourceUrl,
    })
  }

  return upcoming.sort((a, b) => a.daysLeft - b.daysLeft)
}

/**
 * The upcoming deadlines that touch a university this student has shortlisted.
 *
 * A student who has saved nothing gets no mail. They opted in, but there is
 * nothing personal to say yet, and a generic list of every deadline in the
 * country is the sort of message people mark as spam.
 */
export function deadlinesForStudent(
  savedProgrammeIds: readonly string[],
  upcoming: readonly SelectedDeadline[],
  data: ReminderData,
): SelectedDeadline[] {
  const universities = new Set<string>()
  for (const programmeId of savedProgrammeIds) {
    const universityId = data.programmeUniversity[programmeId]
    if (universityId) universities.add(data.universities[universityId] ?? universityId)
  }

  if (universities.size === 0) return []

  return upcoming.filter((deadline) => universities.has(deadline.universityName))
}

/** A student is mailable only if there is an address to mail. */
export function hasUsableAddress(row: Pick<StudentRow, 'email'>): boolean {
  const email = row.email.trim()
  // Deliberately loose. Supabase already verified the address at sign-in; this
  // only catches the empty-string default the table ships with.
  return email.length > 3 && email.includes('@')
}
