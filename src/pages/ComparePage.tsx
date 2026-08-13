import { GitCompare, X } from 'lucide-react'
import { useMemo } from 'react'
import Badge, { type BadgeVariant } from '../components/ui/Badge'
import Button, { LinkButton } from '../components/ui/Button'
import CompareBars from '../components/programme/CompareBars'
import EligibilityBadge from '../components/programme/EligibilityBadge'
import ShortlistTabs from '../components/programme/ShortlistTabs'
import {
  byOptional,
  CONFIDENCE_SHORT,
  formatCedis,
  formatEmploymentRate,
  formatFeesPerYear,
  formatSalaryRange,
  getProgramme,
  hasPublishedCutoff,
  universityNameOf,
  withValue,
} from '../data/catalogue'
import { ADMISSION_TRACK_LABELS, type Programme } from '../domain/catalogue/types'
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
  const byDuration = [...programmes].sort((a, b) => a.durationYears - b.durationYears)

  add(byCutoff[0], { label: 'Most Competitive', variant: 'danger' })
  add(byCutoff[byCutoff.length - 1], { label: 'Easiest Entry', variant: 'success' })

  // A superlative is only awarded when every programme in the set publishes
  // the figure. "Lowest fees" among two programmes when only one lists a fee
  // would be meaningless.
  const feePriced = withValue(programmes, (p) => p.annualFeesGhs)
  if (feePriced.length === programmes.length) {
    add(
      [...programmes].sort(byOptional((p) => p.annualFeesGhs))[0],
      { label: 'Lowest Fees', variant: 'success' },
    )
  }

  const employmentKnown = withValue(programmes, (p) => p.employmentRatePct)
  if (employmentKnown.length === programmes.length) {
    add(
      [...programmes].sort(byOptional((p) => p.employmentRatePct, 'desc'))[0],
      { label: 'Best Employment', variant: 'info' },
    )
  }

  const salaryKnown = withValue(programmes, (p) => p.salary?.maxMonthly)
  if (salaryKnown.length === programmes.length) {
    add(
      [...programmes].sort(byOptional((p) => p.salary?.maxMonthly, 'desc'))[0],
      { label: 'Highest Salary', variant: 'info' },
    )
  }

  // Only call out duration when it actually differs.
  if (byDuration[0]!.durationYears !== byDuration[byDuration.length - 1]!.durationYears) {
    add(byDuration[0], { label: 'Shortest', variant: 'neutral' })
  }

  return result
}

interface Row {
  label: string
  /** null where nothing is published, rendered as an empty cell. */
  values: (string | null)[]
  /** Index of the best value, highlighted. */
  bestIndex?: number
}

function buildRows(programmes: Programme[]): Row[] {
  /**
   * Index of the best value, or undefined when any programme is missing the
   * figure, highlighting a "best" across an incomplete row would imply a
   * comparison we cannot actually make.
   */
  const bestOf = (
    get: (p: Programme) => number | undefined,
    direction: 'min' | 'max',
  ): number | undefined => {
    const values = programmes.map(get)
    if (values.some((value) => value === undefined)) return undefined
    const numbers = values as number[]
    const target = direction === 'min' ? Math.min(...numbers) : Math.max(...numbers)
    return numbers.indexOf(target)
  }

  const rows: Row[] = [
    { label: 'University', values: programmes.map(universityNameOf) },
    { label: 'Faculty', values: programmes.map((p) => p.faculty) },
    { label: 'Degree Type', values: programmes.map((p) => p.degreeType) },
    {
      label: 'Track',
      values: programmes.map((p) => ADMISSION_TRACK_LABELS[p.admissionTrack]),
    },
    {
      label: 'Duration',
      values: programmes.map((p) => `${p.durationYears} years`),
      bestIndex: bestOf((p) => p.durationYears, 'min'),
    },
    {
      label: 'Aggregate',
      values: programmes.map((p) => String(p.requirements.minimumAggregate)),
      bestIndex: bestOf((p) => p.requirements.minimumAggregate, 'max'),
    },
    {
      // The same number means different things at different universities, and
      // a comparison table is exactly where that difference matters.
      label: 'Aggregate is',
      values: programmes.map((p) =>
        hasPublishedCutoff(p) ? 'Published cut-off' : 'Minimum entry requirement',
      ),
    },
    {
      label: 'Annual Fees',
      values: programmes.map(formatFeesPerYear),
      bestIndex: bestOf((p) => p.annualFeesGhs, 'min'),
    },
    {
      label: 'Total Est. Fees',
      values: programmes.map((p) =>
        p.annualFeesGhs === undefined ? null : formatCedis(p.annualFeesGhs * p.durationYears),
      ),
      bestIndex: bestOf(
        (p) => (p.annualFeesGhs === undefined ? undefined : p.annualFeesGhs * p.durationYears),
        'min',
      ),
    },
    {
      label: 'Employment Rate',
      values: programmes.map(formatEmploymentRate),
      bestIndex: bestOf((p) => p.employmentRatePct, 'max'),
    },
    {
      label: 'Avg. Salary',
      values: programmes.map(formatSalaryRange),
      bestIndex: bestOf((p) => p.salary?.maxMonthly, 'max'),
    },
    { label: 'Campus', values: programmes.map((p) => p.campus) },
    { label: 'Region', values: programmes.map((p) => p.region) },
    {
      label: 'Career Paths',
      values: programmes.map((p) => p.careers?.join(', ') ?? null),
    },
    {
      label: 'Data Source',
      values: programmes.map(
        (p) => `${CONFIDENCE_SHORT[p.provenance.confidence]} · ${p.provenance.year}`,
      ),
    },
  ]

  return rows.filter((row) => row.values.some((value) => value !== null))
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
      <div className="p-4 sm:p-6">
        <div className="mx-auto max-w-3xl">
          <ShortlistTabs />
          <h1 className="mb-1 text-xl font-bold text-ink sm:text-2xl">Shortlist</h1>
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

  /*
   * An inline style, not a class.
   *
   * This was `grid-cols-[...repeat(${selected.length}...)]`, built at runtime.
   * Tailwind only emits classes it can see in the source, so that class never
   * existed and the grid fell back to a single column: the comparison had
   * never actually been side by side on any screen, which is what made it read
   * as one long vertical list.
   */
  const gridStyle = {
    gridTemplateColumns: `minmax(6rem, 0.8fr) repeat(${selected.length}, minmax(0, 1fr))`,
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mx-auto max-w-5xl">
        <ShortlistTabs />
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="mb-1 text-xl font-bold text-ink sm:text-2xl">Shortlist</h1>
            <p className="text-sm text-ink-muted">
              Side by side, with the figures drawn to scale. The best value in each row is
              highlighted.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={clearCompared}>
            Clear all
          </Button>
        </div>

        <CompareBars programmes={selected} />

        {/*
          The grid stays side by side on every width, because a comparison
          folded into one column per programme is no longer a comparison. It is
          narrower than it was so two programmes fit a phone without scrolling,
          and scroll-snaps when a third pushes it over.
        */}
        <div className="snap-x snap-mandatory overflow-x-auto rounded-2xl border border-line bg-surface shadow-sm">
          <div style={{ minWidth: `${8 + selected.length * 8.5}rem` }}>
            <div className="sticky top-0 z-10 grid border-b border-line bg-canvas" style={gridStyle}>
              <div className="p-4 text-xs font-semibold uppercase tracking-widest text-ink-muted">
                Criteria
              </div>
              {selected.map((programme) => (
                <div
                  key={programme.id}
                  className="relative snap-start border-l border-line p-3 sm:p-4"
                >
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
                  <div className="mb-2 text-xs text-ink-muted">
                    {universityNameOf(programme)}
                    {programme.admissionTrack !== 'regular' &&
                      ` · ${ADMISSION_TRACK_LABELS[programme.admissionTrack]}`}
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
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
                className={`grid border-b border-line last:border-0 ${
                  rowIndex % 2 === 0 ? '' : 'bg-canvas/40'
                }`}
                style={gridStyle}
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
          </div>
        </div>

        <p className="mt-4 text-xs text-ink-muted">
          Fees are the band the university publishes for the year shown. A blank cell means nothing
          is published for that programme. Each figure&apos;s source is on its programme page.
        </p>
      </div>
    </div>
  )
}
