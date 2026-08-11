import { ArrowRight, Brain, Clock, LayoutGrid, Sparkles, Zap } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { LinkButton } from '../components/ui/Button'
import Card from '../components/ui/Card'
import {
  catalogueStats,
  deadlines,
  getProgramme,
  getUniversity,
  programmeLabel,
} from '../data/catalogue'
import { buildChecklist } from '../domain/checklist/tasks'
import { applyUrlOf, universityNameOf } from '../data/catalogue'
import { formatDeadlineDate, resolveAll } from '../domain/deadlines/status'
import type { Programme } from '../domain/catalogue/types'
import { useEligibility } from '../hooks/useEligibility'
import { useStudent } from '../state/StudentProvider'

/**
 * The place the app comes back to.
 *
 * There wasn't one. The tab bar opened on Matches, a list of 546 programmes,
 * and the only route to anything resembling home was a hamburger that held two
 * links. Students said they could not find their way back, which was fair:
 * there was nowhere to go back to.
 *
 * This answers "where am I up to and what is next", and hands off to the
 * screens that do the work. It deliberately repeats nothing in full: the
 * shortlist shows three of your saved programmes, not all of them.
 */
export default function HomePage() {
  const { state, hasResults } = useStudent()
  const { byId, qualifiedCount, closeCount } = useEligibility()

  const saved = useMemo(
    () =>
      state.savedProgrammeIds
        .map(getProgramme)
        .filter((programme): programme is Programme => programme !== undefined),
    [state.savedProgrammeIds],
  )

  const checklist = useMemo(
    () =>
      buildChecklist({
        hasResults,
        qualifiedCount,
        savedProgrammes: saved,
        comparedCount: state.comparedProgrammeIds.length,
        remindersOn: state.reminders.email || state.reminders.sms || state.reminders.whatsapp,
        manual: state.checklist,
        hasReviewed: state.checklist.review ?? false,
        deadlines,
        verdictOf: (id) => byId.get(id),
        applyUrlOf,
        universityNameOf,
      }),
    [byId, hasResults, qualifiedCount, saved, state],
  )

  /*
   * Only deadlines that are actually hers: the universities on her shortlist,
   * on the tracks she is applying by, and not already closed.
   *
   * Without the track filter this listed KNUST's 31 August date beside its
   * open-ended one, and that date belongs to mature, top-up and international
   * applicants. A countdown to somebody else's deadline is worse than no
   * countdown.
   */
  const upcoming = useMemo(() => {
    const tracks = new Set<string>(saved.map((p) => p.admissionTrack))
    const universityIds = new Set(saved.map((p) => p.universityId))

    const mine = deadlines.filter(
      (d) =>
        universityIds.has(d.universityId) &&
        (d.tracks === undefined || d.tracks.some((track) => tracks.has(track))),
    )
    return resolveAll(mine)
      .filter((d) => d.status !== 'closed')
      .slice(0, 3)
  }, [saved])

  const firstName = state.profile.name.trim().split(/\s+/)[0]

  return (
    <div className="p-4 sm:p-6">
      <Seo title="Your UniMatch overview" description="Your progress, shortlist and deadlines." noIndex />

      <div className="mx-auto max-w-4xl space-y-4">
        <header>
          <h1 className="text-xl font-bold text-ink sm:text-2xl">
            {firstName ? `Hi ${firstName}` : 'Welcome'}
          </h1>
          <p className="text-sm text-ink-muted">
            {hasResults
              ? 'Here is where your application stands.'
              : 'Enter your WASSCE grades and the rest of the app fills in.'}
          </p>
        </header>

        {hasResults ? <ResultsSummary /> : <EnterGradesPrompt />}

        {/* Progress, as a number the student can act on rather than a bar alone. */}
        <Card className="p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-sm font-semibold text-ink">Your application</h2>
            <span className="text-xs text-ink-muted">
              {checklist.done} of {checklist.total} done
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={checklist.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Application progress"
            className="mt-3 h-2 overflow-hidden rounded-full bg-line"
          >
            <div
              className="h-full rounded-full bg-brand transition-all duration-300"
              style={{ width: `${checklist.percent}%` }}
            />
          </div>
          <NextStep checklist={checklist} />
        </Card>

        {upcoming.length > 0 && (
          <Card className="p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-sm font-semibold text-ink">Closing next</h2>
              <Link to="/deadlines" className="text-xs font-medium text-brand hover:underline">
                All deadlines
              </Link>
            </div>
            <ul className="mt-3 space-y-2">
              {upcoming.map((deadline) => {
                const university = getUniversity(deadline.universityId)
                return (
                  <li key={deadline.id} className="flex items-start justify-between gap-3 text-sm">
                    <div className="min-w-0">
                      <div className="font-medium text-ink">
                        {university?.shortName ?? deadline.universityId}
                      </div>
                      <div className="truncate text-xs text-ink-muted">{deadline.scope}</div>
                    </div>
                    <span
                      className={`shrink-0 text-xs font-medium ${
                        deadline.status === 'closing-soon' ? 'text-accent' : 'text-success'
                      }`}
                    >
                      {deadline.closesOn
                        ? formatDeadlineDate(deadline.closesOn)
                        : (deadline.closesWhen ?? 'Open')}
                    </span>
                  </li>
                )
              })}
            </ul>
          </Card>
        )}

        {saved.length > 0 && (
          <Card className="p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-sm font-semibold text-ink">Your shortlist</h2>
              <Link to="/saved" className="text-xs font-medium text-brand hover:underline">
                See all {saved.length}
              </Link>
            </div>
            <ul className="mt-3 space-y-2">
              {saved.slice(0, 3).map((programme) => (
                <li key={programme.id}>
                  <Link
                    to={`/programme/${programme.id}`}
                    className="flex items-center justify-between gap-3 rounded-lg py-1 text-sm hover:underline"
                  >
                    <span className="min-w-0 truncate text-ink">{programmeLabel(programme)}</span>
                    <span className="shrink-0 text-xs text-ink-muted">
                      {universityNameOf(programme)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <div className="grid gap-3 sm:grid-cols-3">
          <QuickLink
            to="/dashboard"
            icon={LayoutGrid}
            label="Browse matches"
            // Counted, not typed. The literal here said 546 and stayed saying
            // it after eight KNUST records were removed from the catalogue.
            hint={
              hasResults
                ? `${qualifiedCount} you qualify for`
                : `All ${catalogueStats.programmeCount} programmes`
            }
          />
          <QuickLink
            to="/simulator"
            icon={Zap}
            label="What-if"
            hint={closeCount > 0 ? `${closeCount} are close` : 'Test other grades'}
          />
          <QuickLink to="/advisor" icon={Brain} label="Ask the advisor" hint="Careers and courses" />
        </div>
      </div>
    </div>
  )
}

function ResultsSummary() {
  const { state, aggregate } = useStudent()
  const { qualifiedCount, closeCount } = useEligibility()

  const stats = [
    { value: aggregate?.aggregate ?? '?', label: 'Aggregate' },
    { value: qualifiedCount, label: 'Qualified' },
    { value: closeCount, label: 'Close' },
  ]

  return (
    <div className="rounded-2xl bg-brand-fill p-5 text-on-brand-fill">
      <p className="text-xs text-on-brand">Your {state.results?.examYear} WASSCE, best six</p>
      <div className="mt-3 flex gap-6">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-on-brand">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EnterGradesPrompt() {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-subtle text-brand">
          <Sparkles size={18} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-ink">Start with your grades</h2>
          <p className="mt-1 text-xs text-ink-muted">
            Six subjects is enough. Nothing leaves this device unless you make an account.
          </p>
          <LinkButton
            to="/eligibility"
            className="mt-3"
            icon={<ArrowRight size={16} aria-hidden="true" />}
            iconPosition="trailing"
          >
            Enter my grades
          </LinkButton>
        </div>
      </div>
    </Card>
  )
}

/** The single next thing to do, named. A bar alone does not tell you that. */
function NextStep({ checklist }: { checklist: ReturnType<typeof buildChecklist> }) {
  const next =
    checklist.steps.find((step) => !step.done) ??
    checklist.applications.flatMap((a) => a.tasks).find((task) => !task.done)

  if (!next) {
    return (
      <p className="mt-3 text-sm text-success">
        Everything on your checklist is done. Good luck.
      </p>
    )
  }

  return (
    <div className="mt-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs text-ink-muted">Next</p>
        <p className="truncate text-sm font-medium text-ink">{next.label}</p>
      </div>
      <LinkButton to={next.href ?? '/profile'} variant="outline" size="sm" className="shrink-0">
        {next.href ? 'Do it' : 'Open checklist'}
      </LinkButton>
    </div>
  )
}

function QuickLink({
  to,
  icon: Icon,
  label,
  hint,
}: {
  to: string
  icon: typeof Clock
  label: string
  hint: string
}) {
  return (
    <Link to={to}>
      <Card className="flex h-full items-center gap-3 p-4" hover>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-subtle text-brand">
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-ink">{label}</span>
          <span className="block truncate text-xs text-ink-muted">{hint}</span>
        </span>
      </Card>
    </Link>
  )
}
