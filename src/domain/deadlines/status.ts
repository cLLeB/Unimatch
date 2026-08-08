import type { AdmissionDeadline, DeadlineStatus } from '../catalogue/types'

/**
 * A deadline within this many days is "closing soon".
 *
 * Consistent with the prototype's fixtures, where 25 and 18 days render as
 * Closing Soon while 39, 69 and 82 render as Open.
 */
export const CLOSING_SOON_DAYS = 30

const MS_PER_DAY = 86_400_000

/** Midnight UTC for a date, so day counts don't drift with the clock. */
function startOfDay(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
}

/**
 * Whole days from `now` until `closesOn`. Negative once the date has passed.
 *
 * Derived, never stored: the prototype hardcoded `days: 82`, which could never
 * count down and was stale the moment it was written.
 */
export function daysUntil(closesOn: string, now: Date = new Date()): number {
  const target = new Date(closesOn)
  if (Number.isNaN(target.getTime())) {
    throw new RangeError(`Invalid deadline date: ${closesOn}`)
  }
  return Math.round((startOfDay(target) - startOfDay(now)) / MS_PER_DAY)
}

export function statusOf(closesOn: string, now: Date = new Date()): DeadlineStatus {
  const days = daysUntil(closesOn, now)
  if (days < 0) return 'closed'
  if (days <= CLOSING_SOON_DAYS) return 'closing-soon'
  return 'open'
}

export interface ResolvedDeadline extends AdmissionDeadline {
  status: DeadlineStatus
  /** Infinite for a condition-based deadline, which sorts it after dated ones. */
  daysLeft: number
}

export function resolve(deadline: AdmissionDeadline, now: Date = new Date()): ResolvedDeadline {
  if (deadline.closesOn === undefined) {
    return { ...deadline, status: 'open-ended', daysLeft: Number.POSITIVE_INFINITY }
  }
  return {
    ...deadline,
    status: statusOf(deadline.closesOn, now),
    daysLeft: daysUntil(deadline.closesOn, now),
  }
}

/** Resolve and sort: soonest first, with closed deadlines last. */
export function resolveAll(
  deadlines: AdmissionDeadline[],
  now: Date = new Date(),
): ResolvedDeadline[] {
  return deadlines
    .map((d) => resolve(d, now))
    .sort((a, b) => {
      const aClosed = a.status === 'closed'
      const bClosed = b.status === 'closed'
      if (aClosed !== bClosed) return aClosed ? 1 : -1
      return a.daysLeft - b.daysLeft
    })
}

/** Long-form date for display, e.g. "March 28, 2025". */
export function formatDeadlineDate(closesOn: string): string {
  return new Date(closesOn).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
