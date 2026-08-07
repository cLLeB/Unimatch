import { useMemo } from 'react'
import { programmes } from '../data/catalogue'
import type { Programme } from '../domain/catalogue/types'
import { evaluate, type Verdict } from '../domain/wassce/eligibility'
import { useStudent } from '../state/StudentProvider'

export interface ProgrammeVerdict {
  programme: Programme
  verdict: Verdict
}

const INCOMPLETE: Verdict = { status: 'incomplete', missing: ['your WASSCE grades'] }

/**
 * Evaluate every programme against the student's results.
 *
 * `qualifies` is derived here and nowhere else. The old data file hardcoded a
 * boolean per programme, which drifted out of step with the cut-offs and
 * produced badges that contradicted the figures next to them.
 */
export function useEligibility(): {
  verdicts: ProgrammeVerdict[]
  byId: Map<string, Verdict>
  qualifiedCount: number
  closeCount: number
  hasResults: boolean
} {
  const { state, aggregate } = useStudent()

  return useMemo(() => {
    const complete = Boolean(aggregate?.complete) && state.results !== null

    const verdicts: ProgrammeVerdict[] = programmes.map((programme) => ({
      programme,
      verdict: complete
        ? evaluate(programme.requirements, state.results!, aggregate ?? undefined)
        : INCOMPLETE,
    }))

    return {
      verdicts,
      byId: new Map(verdicts.map((v) => [v.programme.id, v.verdict])),
      qualifiedCount: verdicts.filter((v) => v.verdict.status === 'qualified').length,
      closeCount: verdicts.filter((v) => v.verdict.status === 'close-match').length,
      hasResults: complete,
    }
  }, [state.results, aggregate])
}

/** Verdict for a single programme. */
export function useProgrammeVerdict(programme: Programme | undefined): Verdict {
  const { state, aggregate } = useStudent()

  return useMemo(() => {
    if (!programme) return INCOMPLETE
    if (!state.results || !aggregate?.complete) return INCOMPLETE
    return evaluate(programme.requirements, state.results, aggregate)
  }, [programme, state.results, aggregate])
}
