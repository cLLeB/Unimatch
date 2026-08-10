import { Check, ExternalLink, LogOut, Plus, Search, Settings, Share2, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button, { LinkButton } from '../components/ui/Button'
import Card from '../components/ui/Card'
import Select from '../components/ui/Select'
import Toggle from '../components/ui/Toggle'
import { initialsOf } from '../components/layout/Navbar'
import {
  applyUrlOf,
  deadlines,
  getProgramme,
  universityNameOf,
  programmeLabel,
} from '../data/catalogue'
import { buildChecklist, type ChecklistTask } from '../domain/checklist/tasks'
import { SHS_TRACKS } from '../domain/wassce/subjects'
import type { DeadlineStatus, Programme } from '../domain/catalogue/types'
import { useEligibility } from '../hooks/useEligibility'
import { useAuth } from '../state/AuthProvider'
import { useStudent } from '../state/StudentProvider'
import { hasContent } from '../state/types'

const DEADLINE_TONE: Record<DeadlineStatus, string> = {
  open: 'text-success',
  'closing-soon': 'text-accent',
  closed: 'text-danger',
  'open-ended': 'text-success',
}

function ProfileCard() {
  const { state, updateProfile, aggregate, setTheme } = useStudent()
  const [editing, setEditing] = useState(false)

  return (
    <div className="space-y-4">
      <Card className="p-6 text-center">
        <div className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-brand-fill text-3xl font-bold text-on-brand-fill">
          {initialsOf(state.profile.name)}
        </div>

        {editing ? (
          <div className="space-y-3 text-left">
            <div>
              <label htmlFor="profile-name" className="mb-1 block text-xs font-medium text-ink">
                Full name
              </label>
              <input
                id="profile-name"
                value={state.profile.name}
                onChange={(event) => updateProfile({ name: event.target.value })}
                className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </div>
            <div>
              <label htmlFor="profile-email" className="mb-1 block text-xs font-medium text-ink">
                Email
              </label>
              <input
                id="profile-email"
                type="email"
                value={state.profile.email}
                onChange={(event) => updateProfile({ email: event.target.value })}
                className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </div>
            <div>
              <label htmlFor="profile-school" className="mb-1 block text-xs font-medium text-ink">
                Senior high school
              </label>
              <input
                id="profile-school"
                value={state.profile.school}
                onChange={(event) => updateProfile({ school: event.target.value })}
                className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </div>
            <div>
              <label htmlFor="profile-track" className="mb-1 block text-xs font-medium text-ink">
                Track
              </label>
              <Select
                id="profile-track"
                value={state.profile.track}
                onChange={(value) => updateProfile({ track: value })}
                options={SHS_TRACKS}
                placeholder="Select track"
              />
            </div>
            <Button fullWidth onClick={() => setEditing(false)}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className="text-xl font-bold text-ink">
              {state.profile.name || 'Add your name'}
            </div>
            {state.profile.email && (
              <div className="text-sm text-ink-muted">{state.profile.email}</div>
            )}
            {[state.profile.school, state.profile.track].filter(Boolean).length > 0 && (
              <div className="mt-1 text-sm text-ink-muted">
                {[state.profile.school, state.profile.track].filter(Boolean).join(' · ')}
              </div>
            )}

            <div className="my-5 rounded-xl bg-brand-subtle py-4">
              {aggregate?.complete && aggregate.aggregate !== null ? (
                <>
                  <div className="text-3xl font-bold text-brand">Agg. {aggregate.aggregate}</div>
                  <div className="text-xs text-ink-muted">
                    {state.results?.examYear} WASSCE · best six
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm font-medium text-ink">No grades entered</div>
                  <Link to="/eligibility" className="text-xs text-brand underline underline-offset-2">
                    Enter them now
                  </Link>
                </>
              )}
            </div>

            <Button
              variant="outline"
              fullWidth
              icon={<Settings size={16} aria-hidden="true" />}
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </Button>
          </>
        )}
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-ink">Dark Mode</div>
            <div className="text-xs text-ink-muted">Easier on the eyes at night</div>
          </div>
          <Toggle
            label="Dark mode"
            checked={state.theme === 'dark'}
            onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </div>
      </Card>

      <AccountActions />
    </div>
  )
}

/**
 * What sits at the bottom of the profile depends on whether there is an
 * account, and there usually is not.
 *
 * A full-width red "Log Out" used to render for everyone, including a student
 * who had never signed in to anything — the loudest control on her screen
 * offering to end a session that did not exist. `signOut` here only ever wiped
 * device-local data, so on this deployment it was a data-wipe button wearing
 * the word "Log Out".
 *
 * Now: an account gets a real log out; a student without one gets the offer to
 * keep her work, and a wipe only once there is something to lose.
 */
function AccountActions() {
  const { state, signOut } = useStudent()
  const { enabled: accountsEnabled, session } = useAuth()
  const navigate = useNavigate()

  if (session) {
    return (
      <Button
        variant="outline"
        fullWidth
        icon={<LogOut size={16} aria-hidden="true" />}
        onClick={() => {
          signOut()
          navigate('/')
        }}
      >
        Log out
      </Button>
    )
  }

  return (
    <div className="space-y-3">
      {accountsEnabled && (
        <Card className="p-5">
          <div className="text-sm font-medium text-ink">Keep your work</div>
          <p className="mt-1 text-xs text-ink-muted">
            Your grades and shortlist live on this phone only. An account carries them to any
            device.
          </p>
          <LinkButton to="/signup" fullWidth className="mt-3">
            Create an account
          </LinkButton>
        </Card>
      )}

      {hasContent(state) && (
        <Button
          variant="ghost"
          fullWidth
          className="text-danger hover:bg-badge-danger"
          icon={<Trash2 size={16} aria-hidden="true" />}
          onClick={() => {
            if (
              window.confirm(
                'This clears your grades, shortlist and comparisons from this device. It cannot be undone.',
              )
            ) {
              signOut()
              navigate('/')
            }
          }}
        >
          Clear my data on this device
        </Button>
      )}
    </div>
  )
}

function SavedProgrammes({ saved }: { saved: Programme[] }) {
  const { toggleSaved } = useStudent()

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-bold text-ink">Saved Programmes</h2>

      {saved.length === 0 ? (
        <p className="py-4 text-center text-sm text-ink-muted">
          Nothing saved yet. Tap Save on any programme to build a shortlist.
        </p>
      ) : (
        <div className="space-y-1">
          {saved.map((programme) => (
            <div
              key={programme.id}
              className="flex items-center justify-between gap-3 border-b border-slate-100 py-3 last:border-0"
            >
              <Link to={`/programme/${programme.id}`} className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-ink hover:text-brand">
                  {programmeLabel(programme)}
                </div>
                <div className="truncate text-xs text-ink-muted">
                  {universityNameOf(programme)} · {programme.degreeType}
                </div>
              </Link>
              <Badge variant="success">Agg. {programme.requirements.minimumAggregate}</Badge>
              <Button
                variant="ghost"
                size="sm"
                className="p-1.5"
                aria-label={`Remove ${programme.name}`}
                onClick={() => toggleSaved(programme.id)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}

      <LinkButton
        to="/dashboard"
        variant="ghost"
        className="mt-3 w-full"
        icon={<Plus size={16} aria-hidden="true" />}
      >
        Add Programme
      </LinkButton>
    </Card>
  )
}

/**
 * One row of the checklist.
 *
 * A derived task shows a read-only dot, because ticking it by hand would be a
 * claim the app can check for itself. A manual one is a real checkbox, and it
 * carries the link out to the portal where the work actually happens.
 */
function ChecklistRow({
  task,
  onToggle,
}: {
  task: ChecklistTask
  onToggle: (id: string, done: boolean) => void
}) {
  const label = (
    <span className={task.done ? 'text-ink-muted line-through' : 'text-ink'}>{task.label}</span>
  )

  return (
    <li className="flex items-start gap-2.5">
      {task.manual ? (
        <input
          type="checkbox"
          id={`check-${task.id}`}
          checked={task.done}
          onChange={(event) => onToggle(task.id, event.target.checked)}
          className="mt-0.5 size-5 shrink-0 rounded-full accent-[var(--color-brand)]"
        />
      ) : (
        <span
          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border ${
            task.done ? 'border-success bg-success text-white' : 'border-line'
          }`}
          aria-hidden="true"
        >
          {task.done && <Check size={12} strokeWidth={3} />}
        </span>
      )}

      <div className="min-w-0 flex-1 text-sm">
        {task.manual ? (
          <label htmlFor={`check-${task.id}`} className="block">
            {label}
          </label>
        ) : task.href && !task.done ? (
          <Link to={task.href} className="block hover:underline">
            {label}
          </Link>
        ) : (
          <span className="block">{label}</span>
        )}

        {task.detail && <div className="text-xs text-ink-muted">{task.detail}</div>}

        {task.external && task.href && (
          <a
            href={task.href}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline"
          >
            Open the portal
            <ExternalLink size={11} aria-hidden="true" />
          </a>
        )}
      </div>
    </li>
  )
}

/**
 * The checklist, built from what the student has actually done.
 *
 * It grows: the five setup steps are there from the start, and every
 * programme she shortlists adds its own block with that university's real
 * deadline and portal. The list was previously six fixed lines that read the
 * same for every student and never said how far through anything you were.
 */
function ApplicationChecklist() {
  const { state, setChecklistItem, hasResults } = useStudent()
  const { byId, qualifiedCount } = useEligibility()

  const checklist = useMemo(() => {
    const savedProgrammes = state.savedProgrammeIds
      .map((id) => getProgramme(id))
      .filter((p): p is Programme => p !== undefined)

    return buildChecklist({
      hasResults,
      qualifiedCount,
      savedProgrammes,
      comparedCount: state.comparedProgrammeIds.length,
      remindersOn:
        state.reminders.email || state.reminders.sms || state.reminders.whatsapp,
      manual: state.checklist,
      hasReviewed: state.checklist.review ?? false,
      deadlines,
      verdictOf: (id) => byId.get(id),
      applyUrlOf,
      universityNameOf,
    })
  }, [
    byId,
    hasResults,
    qualifiedCount,
    state.checklist,
    state.comparedProgrammeIds.length,
    state.reminders,
    state.savedProgrammeIds,
  ])

  return (
    <Card className="p-6">
      <h2 className="mb-1 text-lg font-bold text-ink">Application Checklist</h2>
      <div className="mb-2 flex justify-between text-xs text-ink-muted">
        <span>
          {checklist.done}/{checklist.total} complete
        </span>
        <span>{checklist.percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={checklist.percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Application progress"
        className="mb-4 h-2 overflow-hidden rounded-full bg-line"
      >
        <div
          className="h-full rounded-full bg-brand transition-all duration-300"
          style={{ width: `${checklist.percent}%` }}
        />
      </div>

      <ul className="space-y-2.5">
        {checklist.steps.map((task) => (
          <ChecklistRow key={task.id} task={task} onToggle={setChecklistItem} />
        ))}
      </ul>

      {checklist.applications.length === 0 ? (
        <p className="mt-4 border-t border-line pt-4 text-xs text-ink-muted">
          Save a programme and its own steps — entry requirement, deadline and portal — appear
          here.
        </p>
      ) : (
        <div className="mt-4 space-y-4 border-t border-line pt-4">
          {checklist.applications.map((plan) => (
            <div key={plan.programmeId}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-sm font-semibold text-ink">
                  {plan.universityName} · {plan.programmeName}
                </h3>
                {plan.deadlineLabel && plan.deadlineStatus && (
                  <span className={`text-xs font-medium ${DEADLINE_TONE[plan.deadlineStatus]}`}>
                    {plan.deadlineLabel}
                  </span>
                )}
              </div>
              <ul className="mt-2 space-y-2.5">
                {plan.tasks.map((task) => (
                  <ChecklistRow key={task.id} task={task} onToggle={setChecklistItem} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

function RecentSearches() {
  const { state, clearSearchHistory } = useStudent()
  if (state.searchHistory.length === 0) return null

  return (
    <Card className="p-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink">Recent Searches</h2>
        <Button variant="ghost" size="sm" onClick={clearSearchHistory}>
          Clear
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {state.searchHistory.map((term) => (
          <span
            key={term}
            className="flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1.5 text-xs text-ink-muted"
          >
            <Search size={11} aria-hidden="true" />
            {term}
          </span>
        ))}
      </div>
    </Card>
  )
}

export default function ProfilePage() {
  const { state, aggregate } = useStudent()
  const { qualifiedCount } = useEligibility()

  const saved = useMemo(
    () =>
      state.savedProgrammeIds
        .map(getProgramme)
        .filter((programme): programme is Programme => programme !== undefined),
    [state.savedProgrammeIds],
  )

  /** WhatsApp sharing, per the design's feature list. */
  const shareUrl = useMemo(() => {
    const lines = [
      'My UniMatch Ghana results 🎓',
      aggregate?.aggregate != null ? `Aggregate: ${aggregate.aggregate}` : null,
      `Programmes I qualify for: ${qualifiedCount}`,
      saved.length > 0
        ? `Shortlist: ${saved.map((p) => `${programmeLabel(p)} (${universityNameOf(p)})`).join(', ')}`
        : null,
      'Check yours at UniMatch Ghana.',
    ].filter(Boolean)
    return `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`
  }, [aggregate, qualifiedCount, saved])

  return (
    <div className="p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Student Profile</h1>
          <LinkButton
            to={shareUrl}
            external
            variant="outline"
            size="sm"
            icon={<Share2 size={14} aria-hidden="true" />}
          >
            Share on WhatsApp
          </LinkButton>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ProfileCard />
          </div>

          <div className="space-y-6 lg:col-span-2">
            <SavedProgrammes saved={saved} />
            <ApplicationChecklist />
            <RecentSearches />
          </div>
        </div>
      </div>
    </div>
  )
}
