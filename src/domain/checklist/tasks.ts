import type { AdmissionDeadline, DeadlineStatus, Programme } from '../catalogue/types'
import type { Verdict } from '../wassce/eligibility'
import { formatDeadlineDate, resolveAll } from '../deadlines/status'

/**
 * The application checklist, built from what the student has actually done.
 *
 * The old list was six fixed lines that read the same for everyone: it never
 * said how far through a step you were, never took you to the screen that
 * finished it, and said nothing about the programmes you had actually
 * shortlisted. Two of its six items also ticked on the same condition, so
 * entering your grades scored 2/6 for one action and the bar opened at 33%
 * before you had done anything.
 *
 * Everything here is derived from state, except the steps marked `manual`,
 * which are the ones only the student can know: whether she actually submitted.
 */

export interface ChecklistTask {
  id: string
  label: string
  done: boolean
  /** Live progress, e.g. "2 of 5 saved". Omitted when there is nothing to count. */
  detail?: string
  /** Where to go to do it. */
  href?: string
  /** True when `href` leaves the app. */
  external?: boolean
  /** Ticked by the student rather than computed. */
  manual?: boolean
}

export interface ApplicationPlan {
  programmeId: string
  programmeName: string
  universityName: string
  /** Soonest deadline that applies, where the university publishes one. */
  deadlineLabel?: string
  deadlineStatus?: DeadlineStatus
  tasks: ChecklistTask[]
}

export interface Checklist {
  steps: ChecklistTask[]
  applications: ApplicationPlan[]
  done: number
  total: number
  percent: number
}

/** Programmes that need saving before the "save five" step is met. */
export const SHORTLIST_TARGET = 5

/** Programmes needed before a comparison says anything. */
export const COMPARE_TARGET = 2

export interface ChecklistInput {
  hasResults: boolean
  qualifiedCount: number
  savedProgrammes: Programme[]
  comparedCount: number
  remindersOn: boolean
  /** Student-ticked items, by task id. */
  manual: Record<string, boolean>
  /** True once the student has opened a programme. */
  hasReviewed: boolean
  deadlines: AdmissionDeadline[]
  verdictOf: (programmeId: string) => Verdict | undefined
  applyUrlOf: (programme: Programme) => string | undefined
  universityNameOf: (programme: Programme) => string
  now?: Date
}

function buildSteps(input: ChecklistInput): ChecklistTask[] {
  const saved = input.savedProgrammes.length

  return [
    {
      id: 'enter-grades',
      label: 'Enter WASSCE grades',
      done: input.hasResults,
      href: '/eligibility',
    },
    {
      id: 'review',
      label: 'Review eligible programmes',
      // Ticked by actually opening a programme, not by having grades. Those
      // were the same condition before, which double-counted one action.
      done: input.hasReviewed,
      detail: input.hasResults ? `${input.qualifiedCount} you qualify for` : undefined,
      href: '/dashboard',
    },
    {
      id: 'save-top-5',
      label: `Save ${SHORTLIST_TARGET} programmes`,
      done: saved >= SHORTLIST_TARGET,
      detail: `${Math.min(saved, SHORTLIST_TARGET)} of ${SHORTLIST_TARGET} saved`,
      href: '/dashboard',
    },
    {
      id: 'compare',
      label: 'Compare shortlisted programmes',
      done: input.comparedCount >= COMPARE_TARGET,
      detail:
        input.comparedCount >= COMPARE_TARGET
          ? `${input.comparedCount} compared`
          : `${COMPARE_TARGET - input.comparedCount} more needed`,
      href: '/compare',
    },
    {
      id: 'set-reminders',
      label: 'Set deadline reminders',
      done: input.remindersOn,
      href: '/deadlines',
    },
  ]
}

/**
 * The deadline that governs this programme.
 *
 * Universities publish several, and the soonest is not the student's. KNUST
 * closes on 31 August for mature, top-up and international applicants and
 * stays open until WASSCE results are released for Ghanaian WASSCE applicants.
 * Taking the soonest would show a regular-track student a date three weeks out
 * that does not apply to her. So the programme's own track picks the deadline,
 * and only where nothing matches does a general one stand in.
 */
function deadlineFor(
  deadlines: AdmissionDeadline[],
  programme: Programme,
  now: Date,
): { label: string; status: DeadlineStatus } | undefined {
  const forUniversity = deadlines.filter((d) => d.universityId === programme.universityId)
  const forTrack = forUniversity.filter((d) => d.tracks?.includes(programme.admissionTrack))
  const general = forUniversity.filter((d) => d.tracks === undefined)
  const candidates = forTrack.length > 0 ? forTrack : general
  if (candidates.length === 0) return undefined

  const [soonest] = resolveAll(candidates, now)
  if (!soonest) return undefined

  return {
    label: soonest.closesOn
      ? `Closes ${formatDeadlineDate(soonest.closesOn)}`
      : (soonest.closesWhen ?? 'Open'),
    status: soonest.status,
  }
}

function buildApplications(input: ChecklistInput, now: Date): ApplicationPlan[] {
  return input.savedProgrammes.map((programme) => {
    const verdict = input.verdictOf(programme.id)
    const applyUrl = input.applyUrlOf(programme)
    const deadline = deadlineFor(input.deadlines, programme, now)
    const submitId = `submit:${programme.id}`

    const tasks: ChecklistTask[] = [
      {
        id: `eligible:${programme.id}`,
        label: 'Meet the entry requirement',
        done: verdict?.status === 'qualified',
        detail: describeVerdict(verdict, programme),
        href: `/programme/${programme.id}`,
      },
      {
        id: submitId,
        label: applyUrl ? 'Apply on the university portal' : 'Submit application',
        done: input.manual[submitId] ?? false,
        manual: true,
        href: applyUrl,
        external: applyUrl !== undefined,
      },
    ]

    return {
      programmeId: programme.id,
      programmeName: programme.name,
      universityName: input.universityNameOf(programme),
      deadlineLabel: deadline?.label,
      deadlineStatus: deadline?.status,
      tasks,
    }
  })
}

function describeVerdict(verdict: Verdict | undefined, programme: Programme): string | undefined {
  const cutoff = programme.requirements.minimumAggregate
  if (!verdict || verdict.status === 'incomplete') return `Needs aggregate ${cutoff} or better`
  if (verdict.status === 'qualified') return `Aggregate ${cutoff} or better — you meet it`
  return `Needs aggregate ${cutoff} or better`
}

export function buildChecklist(input: ChecklistInput): Checklist {
  const now = input.now ?? new Date()
  const steps = buildSteps(input)
  const applications = buildApplications(input, now)

  const all = [...steps, ...applications.flatMap((a) => a.tasks)]
  const done = all.filter((t) => t.done).length
  const total = all.length

  return {
    steps,
    applications,
    done,
    total,
    // An empty shortlist still has the five steps, so this never divides by zero.
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
  }
}
