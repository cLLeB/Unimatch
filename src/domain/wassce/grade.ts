import { GRADES, LOWEST_CREDIT_PASS, type Grade } from './types'

/**
 * Grade → points. A1 = 1 … F9 = 9. Lower is better, and the aggregate is a sum
 * of points, so a lower aggregate is a stronger result.
 */
export function toPoints(grade: Grade): number {
  return GRADES.indexOf(grade) + 1
}

/** Points → grade. Inverse of {@link toPoints}. */
export function fromPoints(points: number): Grade {
  const grade = GRADES[points - 1]
  if (!grade) {
    throw new RangeError(`No WASSCE grade for ${points} points (expected 1, ${GRADES.length})`)
  }
  return grade
}

/** Narrow an arbitrary string to a Grade. */
export function isGrade(value: unknown): value is Grade {
  return typeof value === 'string' && (GRADES as readonly string[]).includes(value)
}

/**
 * A credit pass is A1 to C6. Universities disregard D7 and below, so a subject
 * that is not a credit pass cannot satisfy a requirement no matter what the
 * aggregate says.
 */
export function isCreditPass(grade: Grade): boolean {
  return toPoints(grade) <= toPoints(LOWEST_CREDIT_PASS)
}

/** True when `grade` is at least as good as `minimum` (A1 is best). */
export function meetsMinimum(grade: Grade, minimum: Grade): boolean {
  return toPoints(grade) <= toPoints(minimum)
}

/** How many grade steps separate `from` and `to`. Negative means a downgrade. */
export function stepsBetween(from: Grade, to: Grade): number {
  return toPoints(from) - toPoints(to)
}

/** The better of two grades. */
export function betterOf(a: Grade, b: Grade): Grade {
  return toPoints(a) <= toPoints(b) ? a : b
}

/** Sort comparator placing better grades first. */
export function byGradeAscending(a: Grade, b: Grade): number {
  return toPoints(a) - toPoints(b)
}
