import { ArrowRight, Building2, ChevronLeft, MapPin } from 'lucide-react'
import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import EligibilityBadge from '../components/programme/EligibilityBadge'
import ProvenanceBadge from '../components/programme/ProvenanceBadge'
import { LinkButton } from '../components/ui/Button'
import Card from '../components/ui/Card'
import {
  catalogueStats,
  formatCedis,
  formatFeesPerYear,
  getUniversity,
  programmes,
  universities,
} from '../data/catalogue'
import { useEligibility } from '../hooks/useEligibility'

/** Index of every institution we cover. */
export function UniversitiesPage() {
  const counts = useMemo(() => {
    return universities.map((university) => {
      const owned = programmes.filter((p) => p.universityId === university.id)
      const cutoffs = owned.map((p) => p.requirements.minimumAggregate)
      return {
        university,
        count: owned.length,
        lowest: cutoffs.length ? Math.min(...cutoffs) : null,
        highest: cutoffs.length ? Math.max(...cutoffs) : null,
      }
    })
  }, [])

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      <Seo
        title="Universities in Ghana, Cut-Off Points & Programmes"
        description={`Cut-off points and programme requirements for ${catalogueStats.universityCount} Ghanaian universities, including KNUST, the University of Ghana and UCC.`}
        path="/universities"
      />

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">Universities</h1>
        <p className="mt-1 text-sm text-ink-muted">
          {catalogueStats.universityCount} institutions, {catalogueStats.programmeCount} programmes.
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {counts.map(({ university, count, lowest, highest }) => (
          <li key={university.id}>
            <Link to={`/university/${university.id}`} className="block h-full">
              <Card className="flex h-full flex-col p-4" hover>
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-base font-bold text-brand">
                    {university.shortName.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink">{university.shortName}</p>
                    <p className="truncate text-xs text-ink-muted">
                      {university.city}, {university.region}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-ink-muted">
                  <span>
                    {count} programme{count === 1 ? '' : 's'}
                  </span>
                  {lowest !== null && (
                    <span>
                      Cut-offs{' '}
                      <span className="font-semibold text-brand">
                        {lowest}, {highest}
                      </span>
                    </span>
                  )}
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** One institution: its profile and every programme we hold for it. */
export default function UniversityPage() {
  const { universityId } = useParams<{ universityId: string }>()
  const university = universityId ? getUniversity(universityId) : undefined
  const { byId, hasResults } = useEligibility()

  const owned = useMemo(
    () =>
      programmes
        .filter((p) => p.universityId === universityId)
        .sort((a, b) => a.requirements.minimumAggregate - b.requirements.minimumAggregate),
    [universityId],
  )

  if (!university) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <Seo title="University not found" noIndex />
        <p className="text-lg font-semibold text-ink">University not found</p>
        <LinkButton to="/universities">Browse universities</LinkButton>
      </div>
    )
  }

  const cutoffs = owned.map((p) => p.requirements.minimumAggregate)
  const fees = owned.map((p) => p.annualFeesGhs).filter((f): f is number => f !== undefined)
  const officialCount = owned.filter((p) => p.provenance.confidence === 'authoritative').length

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: university.name,
    alternateName: university.shortName,
    address: {
      '@type': 'PostalAddress',
      addressLocality: university.city,
      addressRegion: university.region,
      addressCountry: 'GH',
    }, ...(university.admissionsUrl ? { url: university.admissionsUrl } : {}),
  }

  const stats = [
    { label: 'Programmes', value: String(owned.length) },
    {
      label: 'Cut-off range',
      value: cutoffs.length ? `${Math.min(...cutoffs)}, ${Math.max(...cutoffs)}` : ', ',
    },
    {
      label: 'Fees from',
      value: fees.length ? formatCedis(Math.min(...fees)) : ', ',
    },
    { label: 'Official figures', value: `${officialCount}/${owned.length}` },
  ]

  return (
    <>
      <Seo
        title={`${university.shortName} Cut-Off Points & Programmes`}
        description={`Cut-off points, fees and entry requirements for ${owned.length} programmes at ${university.name}, ${university.city}. ${officialCount} taken from the university's own published admissions list.`}
        path={`/university/${university.id}`}
        structuredData={structuredData}
      />

      <div className="bg-brand px-4 py-6 text-white sm:px-6 sm:py-8">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/universities"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-on-brand transition-colors hover:text-white"
          >
            <ChevronLeft size={16} aria-hidden="true" /> All universities
          </Link>

          <div className="flex items-start gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-xl font-bold sm:size-16 sm:text-2xl">
              {university.shortName.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold leading-tight sm:text-3xl">{university.name}</h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-on-brand">
                <MapPin size={14} aria-hidden="true" />
                {university.city}, {university.region}
              </p>
            </div>
          </div>

          {university.admissionsUrl && (
            <LinkButton
              to={university.admissionsUrl}
              external
              variant="outline"
              size="sm"
              className="mt-4"
              icon={<ArrowRight size={14} aria-hidden="true" />}
            >
              Admissions portal
            </LinkButton>
          )}
        </div>
      </div>

      <div className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 px-4 py-4 sm:grid-cols-4 sm:px-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-lg font-bold text-brand sm:text-xl">{stat.value}</div>
              <div className="text-xs text-ink-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <h2 className="mb-3 text-lg font-bold text-ink">
          Programmes at {university.shortName}
        </h2>

        <ul className="space-y-2">
          {owned.map((programme) => (
            <li key={programme.id}>
              <Link to={`/programme/${programme.id}`} className="block">
                <Card className="p-3.5 sm:p-4" hover>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-ink sm:text-base">
                        {programme.name}
                      </p>
                      <p className="truncate text-xs text-ink-muted">
                        {programme.degreeType} · {programme.durationYears} years ·{' '}
                        {formatFeesPerYear(programme)}
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                        <ProvenanceBadge provenance={programme.provenance} />
                        {hasResults && (
                          <EligibilityBadge
                            status={byId.get(programme.id)?.status ?? 'incomplete'}
                          />
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

        {owned.length === 0 && (
          <div className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center text-sm text-ink-muted">
            <Building2 size={24} className="mx-auto mb-2 text-ink-muted" aria-hidden="true" />
            We don&apos;t hold programmes for {university.shortName} yet.
          </div>
        )}

        {!hasResults && owned.length > 0 && (
          <Card className="mt-6 flex flex-col items-center gap-3 p-5 text-center sm:flex-row sm:text-left">
            <p className="flex-1 text-sm text-ink-muted">
              Enter your WASSCE grades to see which of these you qualify for, and what would change
              the ones you don&apos;t.
            </p>
            <LinkButton to="/eligibility" size="sm">
              Check my eligibility
            </LinkButton>
          </Card>
        )}
      </div>
    </>
  )
}
