import { Check, LogOut, Plus, Search, Settings, Share2, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button, { LinkButton } from '../components/ui/Button'
import Card from '../components/ui/Card'
import Select from '../components/ui/Select'
import Toggle from '../components/ui/Toggle'
import { initialsOf } from '../components/layout/Navbar'
import { getProgramme, universityNameOf } from '../data/catalogue'
import { SHS_TRACKS } from '../domain/wassce/subjects'
import type { Programme } from '../domain/catalogue/types'
import { useEligibility } from '../hooks/useEligibility'
import { useStudent } from '../state/StudentProvider'

interface ChecklistItem {
  id: string
  label: string
  /** Derived items cannot be ticked by hand — they reflect real progress. */
  derived?: boolean
}

const CHECKLIST: ChecklistItem[] = [
  { id: 'enter-grades', label: 'Enter WASSCE grades', derived: true },
  { id: 'review', label: 'Review eligible programmes', derived: true },
  { id: 'save-top-5', label: 'Save 5 programmes', derived: true },
  { id: 'compare', label: 'Compare shortlisted programmes', derived: true },
  { id: 'set-reminders', label: 'Set deadline reminders', derived: true },
  { id: 'submit', label: 'Submit applications' },
]

function ProfileCard() {
  const { state, updateProfile, aggregate, setTheme, signOut } = useStudent()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)

  return (
    <div className="space-y-4">
      <Card className="p-6 text-center">
        <div className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-brand text-3xl font-bold text-white">
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
            <Button className="w-full" onClick={() => setEditing(false)}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className="text-xl font-bold text-ink">
              {state.profile.name || 'Add your name'}
            </div>
            <div className="text-sm text-ink-muted">{state.profile.email || '—'}</div>
            <div className="mt-1 text-sm text-ink-muted">
              {[state.profile.school, state.profile.track].filter(Boolean).join(' · ') || '—'}
            </div>

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
              className="w-full"
              icon={<Settings size={16} aria-hidden="true" />}
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </Button>
          </>
        )}
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between">
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

      <Button
        variant="danger"
        className="w-full"
        icon={<LogOut size={16} aria-hidden="true" />}
        onClick={() => {
          signOut()
          navigate('/')
        }}
      >
        Log Out
      </Button>
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
                  {programme.name}
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

function ApplicationChecklist() {
  const { state, setChecklistItem, hasResults } = useStudent()

  const derivedState: Record<string, boolean> = {
    'enter-grades': hasResults,
    review: hasResults,
    'save-top-5': state.savedProgrammeIds.length >= 5,
    compare: state.comparedProgrammeIds.length >= 2,
    'set-reminders': state.reminders.email || state.reminders.sms || state.reminders.whatsapp,
    submit: state.checklist.submit ?? false,
  }

  const done = CHECKLIST.filter((item) => derivedState[item.id]).length
  const percent = Math.round((done / CHECKLIST.length) * 100)

  return (
    <Card className="p-6">
      <h2 className="mb-1 text-lg font-bold text-ink">Application Checklist</h2>
      <div className="mb-2 flex justify-between text-xs text-ink-muted">
        <span>
          {done}/{CHECKLIST.length} complete
        </span>
        <span>{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Application progress"
        className="mb-4 h-2 overflow-hidden rounded-full bg-line"
      >
        <div
          className="h-full rounded-full bg-brand transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ul className="space-y-2.5">
        {CHECKLIST.map((item) => {
          const complete = derivedState[item.id]
          return (
            <li key={item.id} className="flex items-center gap-2.5">
              {item.derived ? (
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                    complete ? 'border-success bg-success text-white' : 'border-line'
                  }`}
                  aria-hidden="true"
                >
                  {complete && <Check size={12} strokeWidth={3} />}
                </span>
              ) : (
                <input
                  type="checkbox"
                  id={`check-${item.id}`}
                  checked={complete}
                  onChange={(event) => setChecklistItem(item.id, event.target.checked)}
                  className="size-5 shrink-0 rounded-full accent-[var(--color-brand)]"
                />
              )}
              <label
                htmlFor={item.derived ? undefined : `check-${item.id}`}
                className={`text-sm ${complete ? 'text-ink-muted line-through' : 'text-ink'}`}
              >
                {item.label}
              </label>
            </li>
          )
        })}
      </ul>
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
        ? `Shortlist: ${saved.map((p) => `${p.name} (${universityNameOf(p)})`).join(', ')}`
        : null,
      'Check yours at UniMatch Ghana.',
    ].filter(Boolean)
    return `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`
  }, [aggregate, qualifiedCount, saved])

  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-ink">Student Profile</h1>
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
