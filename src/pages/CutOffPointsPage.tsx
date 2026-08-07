import { ArrowUpDown, Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import EligibilityBadge from '../components/programme/EligibilityBadge'
import ProvenanceBadge from '../components/programme/ProvenanceBadge'
import Badge from '../components/ui/Badge'
import Button, { LinkButton } from '../components/ui/Button'
import Card from '../components/ui/Card'
import Select from '../components/ui/Select'
import {
  catalogueStats,
  degreeTypes,
  formatFeesPerYear,
  regions,
  universities,
  universityNameOf,
} from '../data/catalogue'
import { useEligibility } from '../hooks/useEligibility'

type SortKey = 'cutoff-asc' | 'cutoff-desc' | 'name' | 'fees' | 'university'

const SORTS: { value: SortKey; label: string }[] = [
  { value: 'cutoff-asc', label: 'Most competitive first' },
  { value: 'cutoff-desc', label: 'Easiest to enter first' },
  { value: 'name', label: 'Programme A–Z' },
  { value: 'university', label: 'University A–Z' },
  { value: 'fees', label: 'Lowest fees' },
]

/**
 * A browsable cut-off reference that needs no grades and no account.
 *
 * Students search for "KNUST cut off points" long before they are ready to
 * enter eight grades. Putting the whole table behind the eligibility form
 * hid the most useful thing we hold; this is the front door.
 */
export default function CutOffPointsPage() {
  const { byId, hasResults } = useEligibility()

  const [query, setQuery] = useState('')
  const [university, setUniversity] = useState('')
  const [region, setRegion] = useState('')
  const [degreeType, setDegreeType] = useState('')
  const [sort, setSort] = useState<SortKey>('cutoff-asc')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const { verdicts } = useEligibility()

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()

    const filtered = verdicts.filter(({ programme }) => {
      if (university && programme.universityId !== university) return false
      if (region && programme.region !== region) return false
      if (degreeType && programme.degreeType !== degreeType) return false
      if (!needle) return true
      return `${programme.name} ${universityNameOf(programme)} ${programme.faculty} ${programme.careers.join(' ')}`
        .toLowerCase()
        .includes(needle)
    })

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'cutoff-asc':
          return a.programme.requirements.minimumAggregate - b.programme.requirements.minimumAggregate
        case 'cutoff-desc':
          return b.programme.requirements.minimumAggregate - a.programme.requirements.minimumAggregate
        case 'name':
          return a.programme.name.localeCompare(b.programme.name)
        case 'university':
          return universityNameOf(a.programme).localeCompare(universityNameOf(b.programme))
        case 'fees':
          return a.programme.annualFeesGhs - b.programme.annualFeesGhs
      }
    })
  }, [verdicts, query, university, region, degreeType, sort])

  const activeFilters = [university, region, degreeType].filter(Boolean).length

  const clearFilters = () => {
    setUniversity('')
    setRegion('')
    setDegreeType('')
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'University cut-off points in Ghana',
    numberOfItems: rows.length,
    itemListElement: rows.slice(0, 50).map((row, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${row.programme.name} — ${universityNameOf(row.programme)}`,
      url: `/programme/${row.programme.id}`,
    })),
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <Seo
        title={`Cut-Off Points ${catalogueStats.latestCycleYear} — All Universities in Ghana`}
        description={`Browse cut-off points for ${catalogueStats.programmeCount} programmes across ${catalogueStats.universityCount} Ghanaian universities. ${catalogueStats.authoritativeCount} taken directly from official admissions lists, each showing its source.`}
        path="/cut-off-points"
        structuredData={structuredData}
      />

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">
          Cut-Off Points {catalogueStats.latestCycleYear}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          {catalogueStats.programmeCount} programmes across {catalogueStats.universityCount}{' '}
          universities. A lower aggregate is more competitive.
        </p>
      </header>

      {/* Search — full width and first, because it is what most visitors want. */}
      <div className="sticky top-16 z-30 -mx-4 mb-4 bg-canvas/95 px-4 py-3 backdrop-blur-sm sm:static sm:mx-0 sm:bg-transparent sm:p-0 sm:pb-4 sm:backdrop-blur-none">
        <div className="relative">
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search programmes and universities"
            placeholder="Search a programme or university…"
            className="w-full rounded-xl border border-line bg-surface py-3 pl-10 pr-4 text-base text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40 sm:py-2.5 sm:text-sm"
          />
        </div>

        <div className="mt-2 flex gap-2 sm:hidden">
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
            ariaLabel="Sort"
            value={sort}
            onChange={(value) => setSort(value as SortKey)}
            options={SORTS}
          />
        </div>
      </div>

      {/* Filters: always visible from sm up, collapsible on phones. */}
      <div className={`${filtersOpen ? 'grid' : 'hidden'} mb-4 grid-cols-1 gap-2 sm:!grid sm:grid-cols-4`}>
        <Select
          ariaLabel="Filter by university"
          value={university}
          onChange={setUniversity}
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
          placeholder="All degree types"
        />
        <Select
          className="hidden sm:block"
          ariaLabel="Sort"
          value={sort}
          onChange={(value) => setSort(value as SortKey)}
          options={SORTS}
        />
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
        <span>
          {rows.length} programme{rows.length === 1 ? '' : 's'}
        </span>
        {activeFilters > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-ink-muted hover:text-ink"
          >
            <X size={11} aria-hidden="true" /> Clear filters
          </button>
        )}
        {!hasResults && (
          <LinkButton to="/eligibility" size="sm" className="ml-auto">
            Check what I qualify for
          </LinkButton>
        )}
      </div>

      {/* ── Mobile: compact cards ───────────────────────────────────────── */}
      <ul className="space-y-2 sm:hidden">
        {rows.map(({ programme }) => (
          <li key={programme.id}>
            <Link to={`/programme/${programme.id}`} className="block">
              <Card className="p-3.5" hover>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{programme.name}</p>
                    <p className="truncate text-xs text-ink-muted">
                      {universityNameOf(programme)} · {programme.degreeType}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <ProvenanceBadge provenance={programme.provenance} />
                      {hasResults && (
                        <EligibilityBadge status={byId.get(programme.id)?.status ?? 'incomplete'} />
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-2xl font-bold leading-none text-brand">
                      {programme.requirements.minimumAggregate}
                    </div>
                    <div className="mt-0.5 text-[0.625rem] uppercase tracking-wide text-ink-muted">
                      cut-off
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>

      {/* ── Desktop: table ──────────────────────────────────────────────── */}
      <div className="hidden overflow-hidden rounded-2xl border border-line bg-surface shadow-sm sm:block">
        <table className="w-full text-sm">
          <caption className="sr-only">
            Cut-off points by programme, {catalogueStats.latestCycleYear}
          </caption>
          <thead className="border-b border-line bg-canvas text-xs uppercase tracking-widest text-ink-muted">
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-semibold">
                Programme
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold">
                University
              </th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">
                <span className="inline-flex items-center gap-1">
                  <ArrowUpDown size={11} aria-hidden="true" /> Cut-off
                </span>
              </th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">
                Fees / yr
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold">
                Source
              </th>
              {hasResults && (
                <th scope="col" className="px-4 py-3 text-left font-semibold">
                  You
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ programme }, index) => (
              <tr
                key={programme.id}
                className={`border-b border-line last:border-0 ${index % 2 ? 'bg-canvas/40' : ''}`}
              >
                <td className="px-4 py-3">
                  <Link
                    to={`/programme/${programme.id}`}
                    className="font-medium text-ink hover:text-brand"
                  >
                    {programme.name}
                  </Link>
                  <div className="text-xs text-ink-muted">{programme.degreeType}</div>
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/university/${programme.universityId}`}
                    className="text-ink-muted hover:text-brand"
                  >
                    {universityNameOf(programme)}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-base font-bold text-brand">
                    {programme.requirements.minimumAggregate}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-ink-muted">
                  {formatFeesPerYear(programme)}
                </td>
                <td className="px-4 py-3">
                  <ProvenanceBadge provenance={programme.provenance} />
                </td>
                {hasResults && (
                  <td className="px-4 py-3">
                    <EligibilityBadge status={byId.get(programme.id)?.status ?? 'incomplete'} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <div className="rounded-2xl border border-dashed border-line bg-surface p-10 text-center text-sm text-ink-muted">
          Nothing matches &ldquo;{query}&rdquo;. Try a shorter search, or clear the filters.
        </div>
      )}

      <Card className="mt-6 p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          <Badge variant="info">Official</Badge>
          <span>straight from a university&apos;s published list.</span>
          <Badge variant="warning">Unconfirmed</Badge>
          <span>researched but not verified with the university.</span>
          <Badge variant="warning">Estimate</Badge>
          <span>our own estimate — treat as a starting point only.</span>
        </div>
        <p className="mt-2 text-xs text-ink-muted">
          Cut-offs move each year with the pass rate and available places. Always confirm on the
          university&apos;s own portal before applying.
        </p>
      </Card>
    </div>
  )
}
