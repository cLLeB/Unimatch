import {
  Building2,
  ArrowRight,
  CheckCheck,
  CheckCircle,
  ChevronLeft,
  FileText,
  MessageSquare,
  Star,
  TrendingUp,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Badge from '../components/ui/Badge'
import Button, { LinkButton } from '../components/ui/Button'
import Card from '../components/ui/Card'
import EligibilityBadge from '../components/programme/EligibilityBadge'
import ProvenanceBadge from '../components/programme/ProvenanceBadge'
import ShortfallList from '../components/programme/ShortfallList'
import {
  aggregateLabel,
  catalogue,
  formatFeesPerYear,
  getProgramme,
  getUniversity,
  hasPublishedCutoff,
  universityNameOf,
} from '../data/catalogue'
import { otherRoutesFor } from '../domain/catalogue/routes'
import { computeStats, describeCompetitiveness } from '../domain/catalogue/stats'
import { ADMISSION_TRACK_LABELS } from '../domain/catalogue/types'
import { useChartPalette } from '../hooks/useChartPalette'
import { useProgrammeVerdict } from '../hooks/useEligibility'
import { useStudent } from '../state/StudentProvider'

const TABS = ['overview', 'requirements', 'careers', 'apply'] as const
type Tab = (typeof TABS)[number]

const APPLICATION_DOCUMENTS = [
  'WASSCE certificate or results slip',
  'Completed application form',
  'Birth certificate',
  'Two passport photographs',
  'Recommendation letter from your SHS head',
]

export default function ProgrammeDetailPage() {
  const { programmeId } = useParams<{ programmeId: string }>()
  const [tab, setTab] = useState<Tab>('overview')
  const { state, toggleSaved, isSaved } = useStudent()
  const chart = useChartPalette()

  const programme = programmeId ? getProgramme(programmeId) : undefined
  const verdict = useProgrammeVerdict(programme)

  if (!programme) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-lg font-semibold text-ink">Programme not found</p>
        <p className="text-sm text-ink-muted">
          We couldn&apos;t find a programme matching &ldquo;{programmeId}&rdquo;.
        </p>
        <LinkButton to="/dashboard">Back to Dashboard</LinkButton>
      </div>
    )
  }

  const university = getUniversity(programme.universityId)
  const saved = isSaved(programme.id)
  const shortfalls =
    verdict.status === 'qualified' || verdict.status === 'incomplete' ? [] : verdict.shortfalls

  const trend = (programme.cutoffTrend ?? []).map((point) => ({
    year: String(point.year),
    cutoff: point.aggregate,
  }))

  const stats = computeStats(catalogue, programme)

  /*
   * The same subject at the same university, admitted a different way. These
   * are separate records with their own cut-offs, and without this a student
   * reading the regular page never learns the distance route may take them.
   */
  const routes = otherRoutesFor(catalogue, programme)

  /** This programme plus its faculty peers, for the comparison chart. */
  const comparison = [programme, ...stats.peers]
    .map((entry) => ({
      name: entry.name.length > 22 ? `${entry.name.slice(0, 22)}...` : entry.name,
      cutoff: entry.requirements.minimumAggregate,
      isThis: entry.id === programme.id,
    }))
    .sort((a, b) => a.cutoff - b.cutoff)

  return (
    <>
      <div className="bg-brand-fill px-4 py-6 text-on-brand-fill sm:px-6 sm:py-8">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/dashboard"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-on-brand transition-colors hover:text-on-brand-fill"
          >
            <ChevronLeft size={16} aria-hidden="true" /> Back to Results
          </Link>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold">
              {university?.shortName.charAt(0) ?? '?'}
            </div>

            <div className="flex-1">
              <EligibilityBadge status={verdict.status} />
              <h1 className="mb-1 mt-2 text-2xl font-bold sm:text-3xl">{programme.name}</h1>
              <p className="text-sm text-on-brand sm:text-lg">
                {university?.name} · {programme.faculty}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-on-brand-bright">
                <span>{programme.degreeType}</span>
                <span aria-hidden="true">·</span>
                <span>{programme.durationYears} years</span>
                <span aria-hidden="true">·</span>
                <span>
                  {programme.campus}, {programme.region}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-col">
              <LinkButton
                to={university?.admissionsUrl ?? '#'}
                external
                variant="outline"
                className="col-span-2 sm:col-span-1"
                icon={<ArrowRight size={16} aria-hidden="true" />}
              >
                Apply Now
              </LinkButton>
              <Button
                variant="ghost"
                className="text-on-brand-fill hover:bg-white/10"
                icon={<Star size={16} className={saved ? 'fill-current' : ''} aria-hidden="true" />}
                onClick={() => toggleSaved(programme.id)}
              >
                {saved ? 'Saved' : 'Save'}
              </Button>
              <LinkButton
                to="/advisor"
                variant="ghost"
                className="text-on-brand-fill hover:bg-white/10"
                icon={<MessageSquare size={16} aria-hidden="true" />}
              >
                Ask AI
              </LinkButton>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 px-4 py-4 sm:grid-cols-4 sm:gap-4 sm:px-6">
          {/* A metric with nothing published behind it is dropped, not captioned. */}
          {[
            {
              label: aggregateLabel(programme),
              value: `Agg. ${programme.requirements.minimumAggregate}`,
              sub: hasPublishedCutoff(programme)
                ? `${programme.provenance.year} admission`
                : 'Minimum to be eligible',
            },
            {
              label: 'Annual Fees',
              value: formatFeesPerYear(programme),
              sub: programme.fees ? `Published band, ${programme.fees.year}` : null,
            },
            {
              label: 'Duration',
              value: `${programme.durationYears} years`,
              sub: programme.qualificationLevel === 'degree' ? 'Full-time degree' : 'Diploma',
            },
            {
              label: 'Competitiveness',
              value: `Top ${stats.nationalPercentile}%`,
              sub: `${stats.nationalRank} of ${stats.totalProgrammes} nationally`,
            },
          ]
            .filter((metric) => metric.value !== null)
            .map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-xl font-bold text-brand">{metric.value}</div>
                <div className="text-xs font-semibold text-ink">{metric.label}</div>
                <div className="text-xs text-ink-muted">{metric.sub}</div>
              </div>
            ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6">
        {/* Full-width equal columns on a phone so four tabs never overflow. */}
        <div
          role="tablist"
          aria-label="Programme details"
          className="mb-6 grid w-full grid-cols-4 gap-1 rounded-xl bg-slate-100 p-1 sm:flex sm:w-fit"
        >
          {TABS.map((name) => (
            <button
              key={name}
              role="tab"
              aria-selected={tab === name}
              type="button"
              onClick={() => setTab(name)}
              className={`rounded-lg px-2 py-2 text-xs font-medium capitalize transition-all sm:px-4 sm:text-sm ${
                tab === name ? 'bg-surface text-ink shadow-sm' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="grid gap-6 pb-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {shortfalls.length > 0 && (
                <Card className="p-5">
                  <h3 className="mb-3 font-semibold text-ink">Where you stand</h3>
                  <ShortfallList
                    shortfalls={shortfalls}
                    requirements={programme.requirements}
                    results={state.results}
                    programmeName={programme.name}
                  />
                </Card>
              )}

              <Card className="p-5">
                <h3 className="mb-3 font-semibold text-ink">Programme Overview</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{programme.overview}</p>
              </Card>

              {trend.length > 1 ? (
                <Card className="p-5">
                  <h3 className="mb-4 font-semibold text-ink">
                    Cut-off trend {trend[0]?.year} to {trend[trend.length - 1]?.year}
                  </h3>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trend}>
                        <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
                        <XAxis dataKey="year" tick={{ fontSize: 12, fill: chart.axis }} />
                        <YAxis
                          tick={{ fontSize: 12, fill: chart.axis }}
                          domain={[0, 36]}
                          reversed
                          allowDecimals={false}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: 12,
                            border: `1px solid ${chart.tooltipBorder}`,
                            background: chart.tooltipBackground,
                            color: chart.tooltipText,
                            fontSize: 13,
                          }}
                          formatter={(value) => [`Aggregate ${value}`, 'Cut-off']}
                        />
                        <Line
                          type="monotone"
                          dataKey="cutoff"
                          stroke={chart.brand}
                          strokeWidth={2.5}
                          dot={{ fill: chart.brand, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="mt-2 text-xs text-ink-muted">
                    Lower aggregate means more competitive.
                  </p>
                </Card>
              ) : (
                comparison.length > 1 && (
                  <Card className="p-5">
                    <h3 className="mb-4 font-semibold text-ink">
                      How this compares in {programme.faculty}
                    </h3>
                    <div className="w-full" style={{ height: Math.max(160, comparison.length * 34) }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparison} layout="vertical" margin={{ left: 8, right: 16 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} horizontal={false} />
                          <XAxis
                            type="number"
                            domain={[0, 36]}
                            reversed
                            tick={{ fontSize: 11, fill: chart.axis }}
                            allowDecimals={false}
                          />
                          <YAxis
                            type="category"
                            dataKey="name"
                            width={130}
                            tick={{ fontSize: 11, fill: chart.axis }}
                          />
                          <Tooltip
                            contentStyle={{
                              borderRadius: 10,
                              border: `1px solid ${chart.tooltipBorder}`,
                              background: chart.tooltipBackground,
                              color: chart.tooltipText,
                              fontSize: 12,
                            }}
                            formatter={(value) => [`Aggregate ${value}`, 'Cut-off']}
                          />
                          <Bar dataKey="cutoff" radius={[0, 4, 4, 0]}>
                            {comparison.map((entry) => (
                              <Cell key={entry.name} fill={entry.isThis ? chart.brand : chart.peer} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="mt-2 text-xs text-ink-muted">
                      A longer bar is a higher aggregate, which is easier to reach. This programme
                      is highlighted.
                    </p>
                  </Card>
                )
              )}

              <Card className="p-5">
                <h3 className="mb-3 font-semibold text-ink">Where this cut-off comes from</h3>
                <ProvenanceBadge provenance={programme.provenance} detailed />
                {programme.fees && (
                  <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-ink-muted">
                    Fees: {programme.fees.source}. Universities publish a band by college rather
                    than a figure per programme, so a range is shown for {programme.fees.year}.
                  </p>
                )}
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="mb-3 text-sm font-semibold text-ink">How competitive</h4>
                <p className="text-sm font-medium text-brand">{describeCompetitiveness(stats)}</p>
                <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                  <li className="flex items-start gap-2">
                    <TrendingUp size={14} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                    Ranks {stats.nationalRank} of {stats.totalProgrammes} nationally by cut-off
                  </li>
                  <li className="flex items-start gap-2">
                    <Building2 size={14} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                    {stats.universityRank} of {stats.universityTotal} at{' '}
                    {university?.shortName ?? 'this university'}
                  </li>
                  {stats.isMostCompetitiveAtUniversity && (
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                      The hardest entry at this university
                    </li>
                  )}
                  {stats.isMostAccessibleAtUniversity && (
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                      The most accessible entry at this university
                    </li>
                  )}
                </ul>
              </Card>

              {routes.length > 0 && (
                <Card className="p-4">
                  <h4 className="mb-1 text-sm font-semibold text-ink">Other ways in</h4>
                  <p className="mb-3 text-xs text-ink-muted">
                    {university?.shortName ?? 'This university'} admits this programme more than one
                    way, each with its own cut-off.
                  </p>
                  <ul className="space-y-2">
                    {routes.map((route) => (
                      <li key={route.programme.id}>
                        <Link
                          to={`/programme/${route.programme.id}`}
                          className="flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-2.5 transition-colors hover:bg-canvas"
                        >
                          <span className="text-sm font-medium text-ink">
                            {ADMISSION_TRACK_LABELS[route.track]}
                          </span>
                          <span className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-brand">
                              Agg. {route.aggregate}
                            </span>
                            {route.difference !== 0 && (
                              <Badge variant={route.difference > 0 ? 'success' : 'warning'}>
                                {route.difference > 0 ? `${route.difference} looser` : `${-route.difference} tighter`}
                              </Badge>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              <Card className="p-4">
                <h4 className="mb-3 text-sm font-semibold text-ink">Career paths</h4>
                <div className="flex flex-wrap gap-2">
                  {(programme.careers ?? []).map((career) => (
                    <Badge key={career} variant="info">
                      {career}
                    </Badge>
                  ))}
                </div>
                <p className="mt-3 text-xs text-ink-muted">
                  Typical destinations for this qualification, not a prediction about any
                  individual.
                </p>
              </Card>

              {stats.alternatives.length > 0 && (
                <Card className="p-4">
                  <h4 className="mb-3 text-sm font-semibold text-ink">Also offered elsewhere</h4>
                  <div className="space-y-1">
                    {stats.alternatives.map((alternative) => (
                      <Link
                        key={alternative.id}
                        to={`/programme/${alternative.id}`}
                        className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-canvas"
                      >
                        <span className="min-w-0 truncate text-ink-muted">
                          {universityNameOf(alternative)}
                        </span>
                        <Badge variant="neutral">{alternative.requirements.minimumAggregate}</Badge>
                      </Link>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-ink-muted">Same programme, different cut-offs.</p>
                </Card>
              )}
            </div>
          </div>
        )}

        {tab === 'requirements' && (
          <div className="space-y-4 pb-8">
            <Card className="p-5">
              <h3 className="mb-4 font-semibold text-ink">WASSCE Requirements</h3>

              {hasPublishedCutoff(programme) && (
                <div className="mb-4 rounded-xl bg-brand-subtle p-3 text-sm text-ink-muted">
                  <span className="font-semibold text-ink">
                    Aggregate {programme.requirements.minimumAggregate} is the first-choice figure.
                  </span>{' '}
                  Universities publish cut-offs for applicants who list a programme first, and do
                  not publish a separate figure for lower choices. Listing this lower is more
                  competitive, so treat {programme.requirements.minimumAggregate} as the floor
                  rather than a guarantee.
                  {routes.length > 0 && ' The other routes below have their own cut-offs.'}
                </div>
              )}
              <div className="space-y-3 text-sm">
                {[
                  ...programme.requirements.coreSubjects, ...programme.requirements.electiveSubjects,
                ].map((requirement) => (
                  <div
                    key={`${requirement.subject}-${requirement.minimumGrade}`}
                    className="flex items-center gap-2 text-ink-muted"
                  >
                    <CheckCheck size={15} className="shrink-0 text-brand" aria-hidden="true" />
                    {[requirement.subject, ...(requirement.alternatives ?? [])].join(' or ')}, minimum{' '}
                    {requirement.minimumGrade}
                  </div>
                ))}
                {programme.requirements.electiveSubjects.length === 0 && (
                  <div className="flex items-center gap-2 text-ink-muted">
                    <CheckCheck size={15} className="shrink-0 text-brand" aria-hidden="true" />
                    Three relevant elective subjects at credit level
                  </div>
                )}
              </div>

              <div className="mt-4 rounded-xl bg-brand-subtle p-3">
                <div className="text-xs font-semibold text-brand">Minimum Aggregate</div>
                <div className="text-2xl font-bold text-brand">
                  {programme.requirements.minimumAggregate}
                </div>
                <div className="text-xs text-ink-muted">Based on your best six subjects</div>
              </div>

              {programme.requirements.notes.length > 0 && (
                <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                  {programme.requirements.notes.map((note) => (
                    <li key={note} className="text-xs leading-relaxed text-ink-muted">
                      • {note}
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card className="p-5">
              <h3 className="mb-4 font-semibold text-ink">Application Documents</h3>
              <div className="space-y-2 text-sm text-ink-muted">
                {APPLICATION_DOCUMENTS.map((document) => (
                  <div key={document} className="flex items-center gap-2">
                    <FileText size={14} aria-hidden="true" />
                    {document}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {tab === 'careers' && (
          <div className="space-y-4 pb-8">
            <Card className="p-5">
              <h3 className="mb-4 font-semibold text-ink">Career Opportunities</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {(programme.careers ?? []).map((career) => (
                  <div
                    key={career}
                    className="flex items-center gap-3 rounded-xl border border-line bg-canvas p-3"
                  >
                    <div className="flex size-8 items-center justify-center rounded-lg bg-brand/10">
                      <TrendingUp size={16} className="text-brand" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-ink">{career}</div>
                      <div className="text-xs text-ink-muted">{programme.faculty}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-ink-muted">
                Typical destinations for this qualification. Actual roles depend on specialisation, further study and the job market.
              </p>
            </Card>
          </div>
        )}

        {tab === 'apply' && (
          <div className="space-y-4 pb-8">
            <Card className="p-5">
              <h3 className="mb-4 font-semibold text-ink">Application Process</h3>
              {[
                'Check your WASSCE results and confirm your eligibility here',
                `Visit the ${university?.shortName ?? 'university'} admissions portal`,
                'Complete the online application form',
                'Upload the required documents',
                'Pay the application fee',
                'Submit and await your admission letter',
              ].map((step, index) => (
                <div key={step} className="mb-4 flex items-start gap-3">
                  <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-fill text-xs font-bold text-on-brand-fill">
                    {index + 1}
                  </div>
                  <p className="pt-0.5 text-sm text-ink-muted">{step}</p>
                </div>
              ))}
              <LinkButton
                to={university?.admissionsUrl ?? '#'}
                external
                size="lg"
                className="mt-2 w-full"
                icon={<ArrowRight size={18} aria-hidden="true" />}
              >
                Apply on the {university?.shortName ?? 'university'} portal
              </LinkButton>
            </Card>
          </div>
        )}
      </div>
    </>
  )
}
