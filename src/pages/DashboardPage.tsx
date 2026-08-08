import { Filter, GitCompare, Search, SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LinkButton } from '../components/ui/Button'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Select from '../components/ui/Select'
import ProgrammeCard from '../components/programme/ProgrammeCard'
import {
  byOptional,
  catalogueStats,
  degreeTypes,
  hasAnyFees,
  hasAnySalary,
  regions,
  universities,
  universityNameOf,
} from '../data/catalogue'
import { ADMISSION_TRACK_LABELS, ADMISSION_TRACKS } from '../domain/catalogue/types'
import { compareVerdicts } from '../domain/wassce/eligibility'
import { useEligibility } from '../hooks/useEligibility'
import { useStudent } from '../state/StudentProvider'

type SortKey = 'best-match' | 'most-competitive' | 'lowest-cutoff' | 'lowest-fees' | 'highest-salary'

const PAGE_SIZE = 25

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'best-match', label: 'Best match for me' },
  { value: 'most-competitive', label: 'Most competitive' },
  { value: 'lowest-cutoff', label: 'Easiest to enter' },
  { value: 'lowest-fees', label: 'Lowest fees' },
  { value: 'highest-salary', label: 'Highest salary' },
]

function SummaryCard() {
  const { state, aggregate } = useStudent()
  const { qualifiedCount, closeCount, hasResults } = useEligibility()

  if (!hasResults) {
    return (
      <Card className="mb-6 border-0 bg-brand-fill p-5 text-on-brand-fill">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-1 text-sm text-on-brand">You haven&apos;t entered your grades yet</div>
            <div className="mb-1 text-2xl font-bold">See what you qualify for</div>
            <div className="text-sm text-on-secondary">
              {catalogueStats.programmeCount} programmes across {catalogueStats.universityCount}{' '}
              universities are waiting.
            </div>
          </div>
          <LinkButton
            to="/eligibility"
            variant="outline"
            icon={<Search size={16} aria-hidden="true" />}
          >
            Enter my grades
          </LinkButton>
        </div>
      </Card>
    )
  }

  const universityCount = new Set(
    universities.filter((u) => u.id).map((u) => u.id),
  ).size

  return (
    <Card className="mb-6 border-0 bg-brand-fill p-5 text-on-brand-fill">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 text-sm text-on-brand">
            Your {state.results?.examYear} WASSCE Results
          </div>
          <div className="mb-1 text-2xl font-bold">{state.profile.name || 'Your results'}</div>
          <div className="text-sm text-on-secondary">
            {[state.profile.school, state.profile.track].filter(Boolean).join(' · ') ||
              'Add your school on the Profile page'}
          </div>
        </div>

        {/* A grid rather than a flex row: four stats side by side overflow a
            360px screen, and wrapping mid-row looks broken. */}
        <div className="grid grid-cols-4 gap-2 sm:flex sm:gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold sm:text-3xl">{aggregate?.aggregate}</div>
            <div className="text-[0.6875rem] text-on-brand sm:text-xs">Aggregate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-300 sm:text-3xl">{qualifiedCount}</div>
            <div className="text-[0.6875rem] text-on-brand sm:text-xs">Qualified</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-300 sm:text-3xl">{closeCount}</div>
            <div className="text-[0.6875rem] text-on-brand sm:text-xs">Close</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold sm:text-3xl">{universityCount}</div>
            <div className="text-[0.6875rem] text-on-brand sm:text-xs">Unis</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { state, clearCompared } = useStudent()
  const { verdicts, hasResults } = useEligibility()

  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [university, setUniversity] = useState(searchParams.get('university') ?? '')
  const [region, setRegion] = useState('')
  const [track, setTrack] = useState('')
  const [degreeType, setDegreeType] = useState('')
  const [sort, setSort] = useState<SortKey>('best-match')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()

    const matching = verdicts.filter(({ programme }) => {
      if (university && programme.universityId !== university) return false
      if (region && programme.region !== region) return false
      if (track && programme.admissionTrack !== track) return false
      if (degreeType && programme.degreeType !== degreeType) return false
      if (!needle) return true
      return `${programme.name} ${universityNameOf(programme)} ${programme.faculty} ${programme.degreeType} ${(programme.careers ?? []).join(' ')}`
        .toLowerCase()
        .includes(needle)
    })

    const sorted = [...matching]
    switch (sort) {
      case 'best-match':
        sorted.sort(
          (a, b) =>
            compareVerdicts(a.verdict, b.verdict) ||
            a.programme.requirements.minimumAggregate - b.programme.requirements.minimumAggregate,
        )
        break
      case 'most-competitive':
        sorted.sort(
          (a, b) =>
            a.programme.requirements.minimumAggregate - b.programme.requirements.minimumAggregate,
        )
        break
      case 'lowest-cutoff':
        sorted.sort(
          (a, b) =>
            b.programme.requirements.minimumAggregate - a.programme.requirements.minimumAggregate,
        )
        break
      case 'lowest-fees':
        sorted.sort(byOptional((row) => row.programme.annualFeesGhs))
        break
      case 'highest-salary':
        sorted.sort(byOptional((row) => row.programme.salary?.maxMonthly, 'desc'))
        break
    }
    return sorted
  }, [verdicts, query, university, region, track, degreeType, sort])

  const shown = filtered.slice(0, visible)

  useEffect(() => {
    setVisible(PAGE_SIZE)
  }, [query, university, region, track, degreeType, sort])

  const handleUniversityChange = (value: string) => {
    setUniversity(value)
    setSearchParams(value ? { university: value } : {}, { replace: true })
  }

  // Only offer a sort the data can actually satisfy. Most Ghanaian
  // universities publish no fee or salary, so those options would silently
  // reorder nothing.
  const [filtersOpen, setFiltersOpen] = useState(false)
  const activeFilters = [university, region, track, degreeType].filter(Boolean).length

  const sortOptions = SORT_OPTIONS.filter((option) => {
    if (option.value === 'best-match') return hasResults
    if (option.value === 'lowest-fees') return hasAnyFees
    if (option.value === 'highest-salary') return hasAnySalary
    return true
  })

  return (
    <div className="p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">
        <SummaryCard />

        {/*
          Search first: this screen absorbed the old Cut-offs page, so it is now
          the one place to browse all 448 programmes as well as your matches.
        */}
        <div className="mb-3">
          <div className="relative">
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setSearchParams(event.target.value ? { q: event.target.value } : {}, {
                  replace: true,
                })
              }}
              aria-label="Search programmes and universities"
              placeholder="Search a programme, university or career..."
              className="w-full rounded-xl border border-line bg-surface py-3 pl-10 pr-4 text-base text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40 sm:py-2.5 sm:text-sm"
            />
          </div>
        </div>

        <div className="mb-4 flex gap-2 sm:hidden">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            icon={<SlidersHorizontal size={14} aria-hidden="true" />}
            onClick={() => setFiltersOpen((open) => !open)}
          >
            Filters{activeFilters > 0 ? ` (${activeFilters})` : ''}
          </Button>
          <Select
            className="flex-1"
            ariaLabel="Sort programmes"
            value={sort}
            onChange={(value) => setSort(value as SortKey)}
            options={sortOptions}
          />
        </div>

        <div className="mb-6">
          <div className="mb-2 hidden items-center gap-2 text-sm text-ink-muted sm:flex">
            <Filter size={14} aria-hidden="true" /> Filters
          </div>
          <div
            className={`${filtersOpen ? 'grid' : 'hidden'} grid-cols-2 gap-2 sm:!grid sm:grid-cols-5 sm:gap-3`}
          >
            <Select
              ariaLabel="Filter by university"
              value={university}
              onChange={handleUniversityChange}
              options={universities.map((u) => ({ value: u.id, label: u.shortName }))}
              placeholder="All universities"
            />
            <Select
              ariaLabel="Filter by region"
              value={region}
              onChange={setRegion}
              options={regions}
              placeholder="All regions"
            />
            <Select
              ariaLabel="Filter by degree type"
              value={degreeType}
              onChange={setDegreeType}
              options={degreeTypes}
              placeholder="All degrees"
            />
            <Select
              ariaLabel="Filter by admission track"
              value={track}
              onChange={setTrack}
              options={ADMISSION_TRACKS.map((t) => ({ value: t, label: ADMISSION_TRACK_LABELS[t] }))}
              placeholder="All tracks"
            />
            <Select
              className="hidden sm:block"
              ariaLabel="Sort programmes"
              value={sort}
              onChange={(value) => setSort(value as SortKey)}
              options={sortOptions}
            />
          </div>
        </div>

        {state.comparedProgrammeIds.length > 0 && (
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-secondary/20 bg-secondary/10 px-4 py-3 text-sm">
            <GitCompare size={16} className="text-secondary" aria-hidden="true" />
            <span className="font-medium text-ink">
              {state.comparedProgrammeIds.length} programme
              {state.comparedProgrammeIds.length > 1 ? 's' : ''} selected for comparison
            </span>
            <LinkButton to="/compare" variant="secondary" size="sm" className="ml-auto">
              Compare Now
            </LinkButton>
            <Button
              variant="ghost"
              size="sm"
              className="p-1"
              aria-label="Clear comparison"
              onClick={clearCompared}
            >
              <X size={14} />
            </Button>
          </div>
        )}

        <div className="mb-4 text-sm text-ink-muted">
          {filtered.length} programme{filtered.length === 1 ? '' : 's'} found
        </div>

        <div className="space-y-4">
          {shown.map(({ programme, verdict }) => (
            <ProgrammeCard
              key={programme.id}
              programme={programme}
              verdict={verdict}
              expanded={verdict.status === 'close-match'}
            />
          ))}

          {shown.length < filtered.length && (
            <div className="pt-2 text-center">
              <Button variant="outline" onClick={() => setVisible((n) => n + PAGE_SIZE)}>
                Show {Math.min(PAGE_SIZE, filtered.length - shown.length)} more
              </Button>
              <p className="mt-2 text-xs text-ink-muted">
                Showing {shown.length} of {filtered.length}
              </p>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-line bg-surface p-10 text-center text-sm text-ink-muted">
              No programmes match these filters. Try clearing the university or region filter.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
