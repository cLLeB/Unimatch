import { AlertCircle, TrendingUp } from 'lucide-react'
import type { EntryRequirements } from '../../domain/catalogue/types'
import { describeShortfall, type Shortfall } from '../../domain/wassce/eligibility'
import { describePlan, improvementsToQualify } from '../../domain/wassce/inverse'
import type { StudentResults } from '../../domain/wassce/types'

interface ShortfallListProps {
  shortfalls: Shortfall[]
  /** When supplied, the actionable "raise X to Y" route is shown too. */
  requirements?: EntryRequirements
  results?: StudentResults | null
  programmeName?: string
}

/**
 * Why a programme is out of reach, and what would fix it.
 *
 * A red badge alone tells a student nothing they can act on; this is the part
 * that does.
 */
export default function ShortfallList({
  shortfalls,
  requirements,
  results,
  programmeName = 'this programme',
}: ShortfallListProps) {
  if (shortfalls.length === 0) return null

  const plan = requirements && results ? improvementsToQualify(requirements, results) : null

  return (
    <div className="space-y-2">
      <ul className="space-y-1.5">
        {shortfalls.map((shortfall, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-ink-muted">
            <AlertCircle size={14} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            {describeShortfall(shortfall)}
          </li>
        ))}
      </ul>

      {plan && (
        <p className="flex items-start gap-2 rounded-xl bg-brand-subtle px-3 py-2 text-sm font-medium text-brand">
          <TrendingUp size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
          {describePlan(plan, programmeName)}
        </p>
      )}
    </div>
  )
}
