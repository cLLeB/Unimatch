import { AlertCircle, CheckCheck, CheckCircle, RotateCcw } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Badge from '../components/ui/Badge'
import Button, { LinkButton } from '../components/ui/Button'
import Card from '../components/ui/Card'
import { programmes, universityNameOf } from '../data/catalogue'
import { computeAggregate } from '../domain/wassce/aggregate'
import { evaluate } from '../domain/wassce/eligibility'
import { fromPoints, toPoints } from '../domain/wassce/grade'
import {
  CORE_SUBJECT_LABELS,
  type CoreSubjectKey,
  type Grade,
  type StudentResults,
} from '../domain/wassce/types'
import { useStudent } from '../state/StudentProvider'

const CORE_ORDER: CoreSubjectKey[] = ['english', 'mathematics', 'science', 'social']

/** Used when a student opens the simulator before entering real grades. */
const DEFAULT_RESULTS: StudentResults = {
  examYear: new Date().getFullYear(),
  core: { english: 'B2', mathematics: 'B3', science: 'B3', social: 'C4' },
  electives: [
    { subject: 'Elective Mathematics', grade: 'B2' },
    { subject: 'Physics', grade: 'B3' },
    { subject: 'Chemistry', grade: 'C4' },
  ],
}

function gradeTone(grade: Grade): string {
  const points = toPoints(grade)
  if (points <= 3) return 'bg-green-100 text-green-700'
  if (points <= 6) return 'bg-amber-100 text-amber-700'
  return 'bg-red-100 text-red-700'
}

function countQualified(results: StudentResults): number {
  const aggregate = computeAggregate(results)
  if (!aggregate.complete) return 0
  return programmes.filter(
    (programme) => evaluate(programme.requirements, results, aggregate).status === 'qualified',
  ).length
}

export default function SimulatorPage() {
  const { state } = useStudent()
  const baseline = state.results ?? DEFAULT_RESULTS

  const [draft, setDraft] = useState<StudentResults>(baseline)

  const baselineAggregate = computeAggregate(baseline).aggregate
  const baselineQualified = useMemo(() => countQualified(baseline), [baseline])

  const aggregate = computeAggregate(draft)
  const simulated = aggregate.aggregate

  const evaluated = useMemo(
    () =>
      programmes.map((programme) => ({
        programme,
        verdict: evaluate(programme.requirements, draft, aggregate),
      })),
    [draft, aggregate],
  )

  const qualified = evaluated.filter((e) => e.verdict.status === 'qualified')
  const close = evaluated.filter((e) => e.verdict.status === 'close-match')
  const delta = qualified.length - baselineQualified

  const chartData = useMemo(
    () =>
      [...programmes]
        .sort((a, b) => a.requirements.minimumAggregate - b.requirements.minimumAggregate)
        .slice(0, 10)
        .map((programme) => ({
          name:
            programme.name.length > 14 ? `${programme.name.slice(0, 14)}…` : programme.name,
          cutoff: programme.requirements.minimumAggregate,
          yours: simulated ?? 0,
        })),
    [simulated],
  )

  const setCore = (key: CoreSubjectKey, points: number) => {
    setDraft((current) => ({
      ...current,
      core: { ...current.core, [key]: fromPoints(points) },
    }))
  }

  const setElective = (index: number, points: number) => {
    setDraft((current) => ({
      ...current,
      electives: current.electives.map((elective, i) =>
        i === index ? { ...elective, grade: fromPoints(points) } : elective,
      ),
    }))
  }

  const sliders = [
    ...CORE_ORDER.filter((key) => draft.core[key]).map((key) => ({
      id: key,
      label: CORE_SUBJECT_LABELS[key],
      grade: draft.core[key]!,
      onChange: (points: number) => setCore(key, points),
    })), ...draft.electives.map((elective, index) => ({
      id: `elective-${index}`,
      label: elective.subject,
      grade: elective.grade,
      onChange: (points: number) => setElective(index, points),
    })),
  ]

  return (
    <div className="p-4 sm:p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="mb-1 text-xl font-bold text-ink sm:text-2xl">What-if Grade Simulator</h1>
            <p className="text-sm text-ink-muted">
              Adjust your grades to explore how eligibility changes. Results update live.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={<RotateCcw size={14} aria-hidden="true" />}
            onClick={() => setDraft(baseline)}
          >
            Reset
          </Button>
        </div>

        {!state.results && (
          <Card className="mb-6 flex flex-wrap items-center justify-between gap-3 p-4">
            <p className="text-sm text-ink-muted">
              You&apos;re simulating with example grades. Enter your real ones to compare against
              them.
            </p>
            <LinkButton to="/eligibility" size="sm">
              Enter my grades
            </LinkButton>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <Card className="p-5">
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink-muted">
                Adjust Your Grades
              </div>

              {sliders.map((slider) => (
                <div key={slider.id} className="mb-5">
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor={`slider-${slider.id}`} className="text-sm font-medium text-ink">
                      {slider.label}
                    </label>
                    <span
                      className={`rounded-md px-2 py-0.5 text-sm font-bold ${gradeTone(slider.grade)}`}
                    >
                      {slider.grade}
                    </span>
                  </div>
                  <input
                    id={`slider-${slider.id}`}
                    type="range"
                    min={1}
                    max={9}
                    step={1}
                    value={toPoints(slider.grade)}
                    onChange={(event) => slider.onChange(Number(event.target.value))}
                    className="slider-brand h-2 w-full cursor-pointer appearance-none rounded-full bg-line"
                  />
                  <div className="mt-1 flex justify-between text-xs text-ink-muted">
                    <span>A1</span>
                    <span>F9</span>
                  </div>
                </div>
              ))}
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-1 text-xs text-ink-muted">Simulated Aggregate</div>
                  <div className="text-4xl font-bold text-brand">{simulated ?? ', '}</div>
                </div>
                <div className="text-right">
                  <div className="mb-1 text-xs text-ink-muted">Qualifying Programmes</div>
                  <div
                    className={`text-4xl font-bold ${
                      delta > 0 ? 'text-success' : delta < 0 ? 'text-danger' : 'text-ink'
                    }`}
                  >
                    {qualified.length}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-xl bg-brand-subtle p-3">
                {delta > 0 ? (
                  <>
                    <CheckCircle size={16} className="text-success" aria-hidden="true" />
                    <span className="text-sm font-medium text-success">
                      +{delta} new programme{delta === 1 ? '' : 's'} unlocked
                    </span>
                  </>
                ) : delta < 0 ? (
                  <>
                    <AlertCircle size={16} className="text-danger" aria-hidden="true" />
                    <span className="text-sm font-medium text-danger">
                      {Math.abs(delta)} fewer programme{Math.abs(delta) === 1 ? '' : 's'}
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCheck size={16} className="text-brand" aria-hidden="true" />
                    <span className="text-sm text-brand">
                      Same as your baseline aggregate of {baselineAggregate ?? ', '}
                    </span>
                  </>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-4 lg:col-span-3">
            <Card className="p-5">
              <h2 className="mb-4 text-sm font-semibold text-ink">Programmes vs. Your Aggregate</h2>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                    <XAxis
                      type="number"
                      domain={[0, 30]}
                      reversed
                      tick={{ fontSize: 11, fill: '#475569' }}
                      allowDecimals={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      tick={{ fontSize: 11, fill: '#475569' }}
                    />
                    <Tooltip
                      contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }}
                    />
                    <Legend />
                    <Bar dataKey="cutoff" name="Programme Cut-off" fill="#0F766E" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="yours" name="Your Aggregate" fill="#F59E0B" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-2 text-xs text-ink-muted">
                A bar reaching further right is a lower aggregate. You qualify where your bar is at
                least as long as the programme&apos;s.
              </p>
            </Card>

            <div className="grid gap-3 sm:grid-cols-3">
              <Card className="border-l-4 border-l-success p-4">
                <div className="text-2xl font-bold text-success">{qualified.length}</div>
                <div className="text-xs text-ink-muted">Currently qualified</div>
              </Card>
              <Card className="border-l-4 border-l-accent p-4">
                <div className="text-2xl font-bold text-accent">{close.length}</div>
                <div className="text-xs text-ink-muted">Within reach</div>
              </Card>
              <Card className="border-l-4 border-l-secondary p-4">
                <div className="text-2xl font-bold text-secondary">{programmes.length}</div>
                <div className="text-xs text-ink-muted">Total programmes</div>
              </Card>
            </div>

            <Card className="p-5">
              <div className="mb-3 text-sm font-semibold text-ink">
                Eligible with aggregate {simulated ?? ', '}
              </div>
              <div className="space-y-2">
                {qualified.map(({ programme }) => (
                  <div
                    key={programme.id}
                    className="flex items-center justify-between border-b border-slate-100 py-2 last:border-0"
                  >
                    <div>
                      <div className="text-sm font-medium text-ink">{programme.name}</div>
                      <div className="text-xs text-ink-muted">{universityNameOf(programme)}</div>
                    </div>
                    <Badge variant="success">Agg. {programme.requirements.minimumAggregate}</Badge>
                  </div>
                ))}

                {qualified.length === 0 && (
                  <p className="py-4 text-center text-sm text-ink-muted">
                    No programmes at this aggregate yet. Drag a slider towards A1 to see what opens
                    up.
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
