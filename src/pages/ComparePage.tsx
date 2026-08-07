import { AlertCircle, CheckCircle, GitCompare, X } from 'lucide-react'
import { useMemo } from 'react'
import Badge, { type BadgeVariant } from '../components/ui/Badge'
import Button, { LinkButton } from '../components/ui/Button'
import EligibilityBadge from '../components/programme/EligibilityBadge'
import {
  formatCedis,
  formatFeesPerYear,
  formatSalaryRange,
  getProgramme,
  universityNameOf,
} from '../data/catalogue'
import type { Programme } from '../domain/catalogue/types'
import { useEligibility } from '../hooks/useEligibility'
import { useStudent } from '../state/StudentProvider'
import { MAX_COMPARE } from '../state/types'

interface Superlative {
  label: string
  variant: BadgeVariant
}

/**
 * Superlative badges, computed across the selected set.
 *
 * The prototype hardcoded these by row id (`p.id === 2 ? "Most Competitive" …`),
 * so they were wrong for any selection other than the demo's first three.
 */
function superlativesFor(programmes: Programme[]): Map<string, Superlative[]> {
  const result = new Map<string, Superlative[]>(programmes.map((p) => [p.id, []]))
  if (programmes.length < 2) return result

  const add = (programme: Programme | undefined, superlative: Superlative) => {
    if (!programme) return
    result.get(programme.id)?.push(superlative)
  }

  const byCutoff = [...programmes].sort(
    (a, b) => a.requirements.minimumAggregate - b.requirements.minimumAggregate,
  )
  const byFees = [...programmes].sort((a, b) => a.annualFeesGhs - b.annualFeesGhs)
  const byEmployment = [...programmes].sort((a, b) => b.employmentRatePct - a.employmentRatePct)
  const bySalary = [...programmes].sort((a, b) => b.salary.maxMonthly - a.salary.maxMonthly)
  const byDuration = [...programmes].sort((a, b) => a.durationYears - b.durationYears)

  add(byCutoff[0], { label: 'Most Competitive', variant: 'danger' })
  add(byCutoff[byCutoff.length - 1], { label: 'Easiest Entry', variant: 'success' })
  add(byFees[0], { label: 'Lowest Fees', variant: 'success' })
  add(byEmployment[0], { label: 'Best Employment', variant: 'info' })
  add(bySalary[0], { label: 'Highest Salary', variant: 'info' })

  // Only call out duration when it actually differs.
  if (byDuration[0]!.durationYears !== byDuration[byDuration.length - 1]!.durationYears) {
    add(byDuration[0], { label: 'Shortest', variant: 'neutral' })
  }

  return result
}

interface Row {
  label: string
  values: string[]
  /** Index of the best value, highlighted. */
  bestIndex?: number
}

function buildRows(programmes: Programme[]): Row[] {
  const indexOfMin = (values: number[]) => values.indexOf(Math.min(...values))
  const indexOfMax = (values: number[]) => values.indexOf(Math.max(...values))

  const cutoffs = programmes.map((p) => p.requirements.minimumAggregate)
  const fees = programmes.map((p) => p.annualFeesGhs)
  const employment = programmes.map((p) => p.employmentRatePct)
  const salaries = programmes.map((p) => p.salary.maxMonthly)
  const durations = programmes.map((p) => p.durationYears)

  return [
    { label: 'University', values: programmes.map(universityNameOf) },
    { label: 'Faculty', values: programmes.map((p) => p.faculty) },
    { label: 'Degree Type', values: programmes.map((p) => p.degreeType) },
    {
      label: 'Duration',
      values: programmes.map((p) => `${p.durationYears} years`),
      bestIndex: indexOfMin(durations),
    },
    {
      label: 'Annual Fees',
      values: programmes.map(formatFeesPerYear),
      bestIndex: indexOfMin(fees),
    },
    {
      label: 'Cut-off Agg.',
      values: cutoffs.map(String),
      bestIndex: indexOfMax(cutoffs),
    },
    {
      label: 'Employment Rate',
      values: programmes.map((p) => `${p.employmentRatePct}%`),
      bestIndex: indexOfMax(employment),
    },
    {
      label: 'Avg. Salary',
      values: programmes.map(formatSalaryRange),
      bestIndex: indexOfMax(salaries),
    },
    {
      label: 'Total Est. Fees',
      values: programmes.map((p) => formatCedis(p.annualFeesGhs * p.durationYears)),
      bestIndex: indexOfMin(programmes.map((p) => p.annualFeesGhs * p.durationYears)),
    },
    { label: 'Campus', values: programmes.map((p) => p.campus) },
    { label: 'Region', values: programmes.map((p) => p.region) },
    { label: 'Career Paths', values: programmes.map((p) => p.careers.join(', ')) },
    {
      label: 'Data Source',
      values: programmes.map((p) => `${p.provenance.confidence} · ${p.provenance.year}`),
    },
  ]
}

export default function ComparePage() {
  const { state, toggleCompared, clearCompared } = useStudent()
  const { byId } = useEligibility()

  const selected = useMemo(
    () =>
      state.comparedProgrammeIds
        .map(getProgramme)
        .filter((p): p is Programme => p !== undefined),
    [state.comparedProgrammeIds],
  )

  const superlatives = useMemo(() => superlativesFor(selected), [selected])
  const rows = useMemo(() => (selected.length > 0 ? buildRows(selected) : []), [selected])

  if (selected.length === 0) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-1 text-2xl font-bold text-ink">Programme Comparison</h1>
          <p className="mb-8 text-sm text-ink-muted">
            Side-by-side analysis of your selected programmes.
          </p>

          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-line bg-surface p-12 text-center">
            <GitCompare size={32} className="text-ink-muted" aria-hidden="true" />
            <div>
              <p className="font-medium text-ink">Nothing to compare yet</p>
              <p className="mt-1 text-sm text-ink-muted">
                Pick up to {MAX_COMPARE} programmes on the dashboard and they&apos;ll appear here
                side by side.
              </p>
            </div>
            <LinkButton to="/dashboard">Browse programmes</LinkButton>
          </div>
        </div>
      </div>
    )
  }

  const columns = `grid-cols-[minmax(7rem,1fr)_repeat(${selected.length},minmax(0,1fr))]`

  return (
    <div className="p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="mb-1 text-2xl font-bold text-ink">Programme Comparison</h1>
            <p className="text-sm text-ink-muted">
              Side-by-side analysis of your selected programmes. Best value in each row is
              highlighted.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={clearCompared}>
            Clear all
          </Button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-line bg-surface shadow-sm">
          <div className="min-w-[46rem]">
            <div className={`grid ${columns} sticky top-0 z-10 border-b border-line bg-canvas`}>
              <div className="p-4 text-xs font-semibold uppercase tracking-widest text-ink-muted">
                Criteria
              </div>
              {selected.map((programme) => (
                <div key={programme.id} className="relative border-l border-line p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 p-1"
                    aria-label={`Remove ${programme.name} from comparison`}
                    onClick={() => toggleCompared(programme.id)}
                  >
                    <X size={14} />
                  </Button>
                  <div className="pr-6 text-sm font-bold text-ink">{programme.name}</div>
                  <div className="mb-2 text-xs text-ink-muted">{universityNameOf(programme)}</div>
                  <div className="flex flex-wrap gap-1">
                    <EligibilityBadge status={byId.get(programme.id)?.status ?? 'incomplete'} />
                    {superlatives.get(programme.id)?.map((superlative) => (
                      <Badge key={superlative.label} variant={superlative.variant}>
                        {superlative.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {rows.map((row, rowIndex) => (
              <div
                key={row.label}
                className={`grid ${columns} border-b border-line last:border-0 ${
                  rowIndex % 2 === 0 ? '' : 'bg-canvas/40'
                }`}
              >
                <div className="flex items-center p-4 text-xs font-semibold text-ink-muted">
                  {row.label}
                </div>
                {row.values.map((value, index) => (
                  <div
                    key={index}
                    className={`flex items-center border-l border-line p-4 text-sm ${
                      row.bestIndex === index ? 'font-semibold text-brand' : 'text-ink'
                    }`}
                  >
                    {value}
                  </div>
                ))}
              </div>
            ))}

            <div className={`grid ${columns} border-b border-line bg-brand-subtle/30`}>
              <div className="flex items-center p-4 text-xs font-semibold text-ink-muted">Pros</div>
              {selected.map((programme) => (
                <div key={programme.id} className="border-l border-line p-4">
                  {programme.pros.map((pro) => (
                    <div key={pro} className="mb-1 flex items-start gap-1.5 text-xs text-ink-muted">
                      <CheckCircle
                        size={12}
                        className="mt-0.5 shrink-0 text-success"
                        aria-hidden="true"
                      />
                      {pro}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className={`grid ${columns}`}>
              <div className="flex items-center p-4 text-xs font-semibold text-ink-muted">Cons</div>
              {selected.map((programme) => (
                <div key={programme.id} className="border-l border-line p-4">
                  {programme.cons.map((con) => (
                    <div key={con} className="mb-1 flex items-start gap-1.5 text-xs text-ink-muted">
                      <AlertCircle
                        size={12}
                        className="mt-0.5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      {con}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-ink-muted">
          Fees, employment rates and salary ranges are indicative estimates. Cut-offs show their own
          source on each programme page.
        </p>
      </div>
    </div>
  )
}
