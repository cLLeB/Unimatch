import { betterOf, toPoints } from './grade'
import {
  ALWAYS_COUNTED_CORES,
  CONTESTED_CORES,
  CORE_SUBJECT_LABELS,
  REQUIRED_ELECTIVE_COUNT,
  type AggregateResult,
  type CountedSubject,
  type StudentResults,
} from './types'

/**
 * Compute the WASSCE aggregate: the sum of the best six subjects, being
 *
 *   English Language
 * + Core Mathematics
 * + the better of (Integrated Science, Social Studies)
 * + the best three electives
 *
 * This is the rule Ghanaian universities publish cut-offs against, and it is
 * the rule the design itself documents on the Programme Detail page ("Aggregate
 * is sum of best 6 grades"). The Figma prototype's simulator sums all seven
 * entered subjects instead, which inflates every student's aggregate and makes
 * them look less eligible than they are — see docs/superpowers/specs §7.1.
 */
export function computeAggregate(results: StudentResults): AggregateResult {
  const counted: CountedSubject[] = []
  const excluded: CountedSubject[] = []
  const missing: string[] = []

  // --- Cores that always count -------------------------------------------
  for (const key of ALWAYS_COUNTED_CORES) {
    const grade = results.core[key]
    if (grade) {
      counted.push({ subject: CORE_SUBJECT_LABELS[key], grade, points: toPoints(grade) })
    } else {
      missing.push(CORE_SUBJECT_LABELS[key])
    }
  }

  // --- The contested third core slot -------------------------------------
  const [scienceKey, socialKey] = CONTESTED_CORES
  const science = results.core[scienceKey]
  const social = results.core[socialKey]

  if (science && social) {
    const winner = betterOf(science, social)
    // Ties resolve to Integrated Science; either choice yields the same
    // aggregate, and picking deterministically keeps output stable.
    const winnerIsScience = winner === science
    const winKey = winnerIsScience ? scienceKey : socialKey
    const loseKey = winnerIsScience ? socialKey : scienceKey
    const loseGrade = winnerIsScience ? social : science

    counted.push({
      subject: CORE_SUBJECT_LABELS[winKey],
      grade: winner,
      points: toPoints(winner),
    })
    excluded.push({
      subject: CORE_SUBJECT_LABELS[loseKey],
      grade: loseGrade,
      points: toPoints(loseGrade),
      excludedReason: 'weaker-core',
    })
  } else if (science || social) {
    // Only one entered — it takes the slot by default.
    const key = science ? scienceKey : socialKey
    const grade = (science ?? social) as NonNullable<typeof science>
    counted.push({ subject: CORE_SUBJECT_LABELS[key], grade, points: toPoints(grade) })
  } else {
    missing.push(`${CORE_SUBJECT_LABELS.science} or ${CORE_SUBJECT_LABELS.social}`)
  }

  // --- Best three electives ----------------------------------------------
  const rankedElectives = [...results.electives].sort(
    (a, b) => toPoints(a.grade) - toPoints(b.grade),
  )

  rankedElectives.forEach((elective, index) => {
    const entry: CountedSubject = {
      subject: elective.subject,
      grade: elective.grade,
      points: toPoints(elective.grade),
    }
    if (index < REQUIRED_ELECTIVE_COUNT) {
      counted.push(entry)
    } else {
      excluded.push({ ...entry, excludedReason: 'surplus-elective' })
    }
  })

  const electiveShortfall = REQUIRED_ELECTIVE_COUNT - rankedElectives.length
  if (electiveShortfall > 0) {
    missing.push(
      `${electiveShortfall} more elective subject${electiveShortfall === 1 ? '' : 's'}`,
    )
  }

  const complete = missing.length === 0

  return {
    aggregate: complete ? counted.reduce((sum, s) => sum + s.points, 0) : null,
    counted,
    excluded,
    complete,
    missing,
  }
}

/**
 * Convenience for callers that only want the number and are certain the results
 * are complete. Returns `null` rather than throwing when they are not.
 */
export function aggregateOf(results: StudentResults): number | null {
  return computeAggregate(results).aggregate
}
