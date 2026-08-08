import { formatCedis, programmeLabel, universityNameOf } from '../../data/catalogue'
import type { Programme } from '../../domain/catalogue/types'

/**
 * The numbers, seen rather than read.
 *
 * A comparison table makes you hold three figures in your head and subtract.
 * A bar makes the difference the first thing you notice, which is the whole
 * point of putting programmes side by side, and it stacks on a phone instead
 * of forcing a sideways scroll through a wide grid.
 */

interface Metric {
  label: string
  /** Undefined where a programme publishes nothing, so its bar is omitted. */
  valueOf: (programme: Programme) => number | undefined
  format: (value: number) => string
  /** Which end of the scale is the better outcome. */
  better: 'lower' | 'higher'
  hint: string
}

const METRICS: Metric[] = [
  {
    label: 'Cut-off aggregate',
    valueOf: (p) => p.requirements.minimumAggregate,
    format: (v) => `Agg. ${v}`,
    better: 'lower',
    hint: 'Lower is more competitive.',
  },
  {
    label: 'Annual fees',
    valueOf: (p) => p.annualFeesGhs,
    format: (v) => `${formatCedis(v)}/yr`,
    better: 'lower',
    hint: 'The midpoint of the published band.',
  },
  {
    label: 'Duration',
    valueOf: (p) => p.durationYears,
    format: (v) => `${v} year${v === 1 ? '' : 's'}`,
    better: 'lower',
    hint: 'Years to complete.',
  },
]

function MetricBars({ metric, programmes }: { metric: Metric; programmes: Programme[] }) {
  const entries = programmes
    .map((programme) => ({ programme, value: metric.valueOf(programme) }))
    .filter((entry): entry is { programme: Programme; value: number } => entry.value !== undefined)

  // One bar compares nothing, and nothing published compares less.
  if (entries.length < 2) return null

  const values = entries.map((e) => e.value)
  const max = Math.max(...values)
  const best = metric.better === 'lower' ? Math.min(...values) : max

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-ink">{metric.label}</h3>
        <span className="text-xs text-ink-muted">{metric.hint}</span>
      </div>

      <ul className="space-y-2.5">
        {entries.map(({ programme, value }) => {
          const isBest = value === best
          // Proportional to the largest, with a floor so the smallest bar is
          // still visible rather than a sliver.
          const width = Math.max(8, Math.round((value / max) * 100))

          return (
            <li key={programme.id}>
              <div className="mb-1 flex items-baseline justify-between gap-3 text-xs">
                <span className="min-w-0 truncate text-ink-muted">
                  {universityNameOf(programme)} · {programmeLabel(programme)}
                </span>
                <span
                  className={isBest ? 'shrink-0 font-semibold text-brand' : 'shrink-0 text-ink'}
                >
                  {metric.format(value)}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-canvas">
                <div
                  className={`h-full rounded-full ${isBest ? 'bg-brand' : 'bg-line'}`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function CompareBars({ programmes }: { programmes: Programme[] }) {
  const bars = METRICS.map((metric) => (
    <MetricBars key={metric.label} metric={metric} programmes={programmes} />
  )).filter(Boolean)

  if (programmes.length < 2) return null

  return (
    <div className="mb-6 grid gap-6 rounded-2xl border border-line bg-surface p-4 shadow-sm sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
      {bars}
    </div>
  )
}
