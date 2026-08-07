import { ArrowUpDown, Filter, GitCompare, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LinkButton } from '../components/ui/Button'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Select from '../components/ui/Select'
import ProgrammeCard from '../components/programme/ProgrammeCard'
import { catalogueStats, regions, universities } from '../data/catalogue'
import { compareVerdicts } from '../domain/wassce/eligibility'
import { useEligibility } from '../hooks/useEligibility'
import { useStudent } from '../state/StudentProvider'

type SortKey = 'best-match' | 'most-competitive' | 'lowest-cutoff' | 'lowest-fees' | 'highest-salary'

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
      <Card className="mb-6 border-0 bg-gradient-to-r from-brand to-secondary p-5 text-white">
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
    <Card className="mb-6 border-0 bg-gradient-to-r from-brand to-secondary p-5 text-white">
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

        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{aggregate?.aggregate}</div>
            <div className="text-xs text-on-brand">Aggregate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-300">{qualifiedCount}</div>
            <div className="text-xs text-on-brand">Qualified</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-300">{closeCount}</div>
            <div className="text-xs text-on-brand">Close</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{universityCount}</div>
            <div className="text-xs text-on-brand">Universities</div>
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

  const [university, setUniversity] = useState(searchParams.get('university') ?? '')
  const [region, setRegion] = useState('')
  const [sort, setSort] = useState<SortKey>('best-match')

  const filtered = useMemo(() => {
    const matching = verdicts.filter(
      ({ programme }) =>
        (!university || programme.universityId === university) &&
        (!region || programme.region === region),
    )

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
        sorted.sort((a, b) => a.programme.annualFeesGhs - b.programme.annualFeesGhs)
        break
      case 'highest-salary':
        sorted.sort((a, b) => b.programme.salary.maxMonthly - a.programme.salary.maxMonthly)
        break
    }
    return sorted
  }, [verdicts, university, region, sort])

  const handleUniversityChange = (value: string) => {
    setUniversity(value)
    setSearchParams(value ? { university: value } : {}, { replace: true })
  }

  const sortOptions = hasResults ? SORT_OPTIONS : SORT_OPTIONS.filter((o) => o.value !== 'best-match')

  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <SummaryCard />

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-ink-muted">
            <Filter size={14} aria-hidden="true" /> Filters:
          </div>
          <Select
            className="w-44"
            ariaLabel="Filter by university"
            value={university}
            onChange={handleUniversityChange}
            options={universities.map((u) => ({ value: u.id, label: u.shortName }))}
            placeholder="All Universities"
          />
          <Select
            className="w-40"
            ariaLabel="Filter by region"
            value={region}
            onChange={setRegion}
            options={regions}
            placeholder="All Regions"
          />
          <div className="ml-auto flex items-center gap-2">
            <ArrowUpDown size={14} className="text-ink-muted" aria-hidden="true" />
            <Select
              className="w-48"
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
          {filtered.map(({ programme, verdict }) => (
            <ProgrammeCard
              key={programme.id}
              programme={programme}
              verdict={verdict}
              expanded={verdict.status === 'close-match'}
            />
          ))}

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
