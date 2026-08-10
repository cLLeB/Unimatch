import { Banknote, Building2, Clock, GitCompare, MapPin, Star } from 'lucide-react'
import { formatFeesPerYear, universityNameOf } from '../../data/catalogue'
import type { Programme } from '../../domain/catalogue/types'
import type { Verdict } from '../../domain/wassce/eligibility'
import { useStudent } from '../../state/StudentProvider'
import { MAX_COMPARE } from '../../state/types'
import { ADMISSION_TRACK_LABELS } from '../../domain/catalogue/types'
import Badge from '../ui/Badge'
import Button, { LinkButton } from '../ui/Button'
import Card from '../ui/Card'
import EligibilityBadge, { AGGREGATE_TONE } from './EligibilityBadge'
import ProvenanceBadge from './ProvenanceBadge'
import ShortfallList from './ShortfallList'

interface ProgrammeCardProps {
  programme: Programme
  verdict: Verdict
  /** Show the "why not" breakdown inline. */
  expanded?: boolean
}

export default function ProgrammeCard({ programme, verdict, expanded = false }: ProgrammeCardProps) {
  const { state, toggleSaved, isSaved, toggleCompared, isCompared } = useStudent()

  const saved = isSaved(programme.id)
  const compared = isCompared(programme.id)
  const compareFull = state.comparedProgrammeIds.length >= MAX_COMPARE && !compared

  const aggregate = verdict.status === 'incomplete' ? null : verdict.aggregate
  const shortfalls = verdict.status === 'qualified' || verdict.status === 'incomplete' ? [] : verdict.shortfalls

  return (
    <Card className="p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <h3 className="text-base font-semibold text-ink sm:text-lg">{programme.name}</h3>
            <EligibilityBadge status={verdict.status} />
            <Badge variant="neutral">{programme.degreeType}</Badge>
            {/*
              Without this, the regular and full-fee-paying records for one
              programme are two identical cards at different cut-offs, which
              reads as a duplicate rather than as the two routes it is.
            */}
            {programme.admissionTrack !== 'regular' && (
              <Badge variant="warning">{ADMISSION_TRACK_LABELS[programme.admissionTrack]}</Badge>
            )}
            <ProvenanceBadge provenance={programme.provenance} />
          </div>

          <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-muted sm:gap-x-4 sm:text-sm">
            <span className="flex items-center gap-1">
              <Building2 size={13} aria-hidden="true" />
              {universityNameOf(programme)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={13} aria-hidden="true" />
              {programme.campus}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} aria-hidden="true" />
              {programme.durationYears} years
            </span>
            <span className="flex items-center gap-1">
              <Banknote size={13} aria-hidden="true" />
              {formatFeesPerYear(programme)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div>
              <span className="text-ink-muted">Cut-off: </span>
              <span className="font-semibold text-ink">
                Agg. {programme.requirements.minimumAggregate}
              </span>
            </div>
            {aggregate !== null && (
              <div>
                <span className="text-ink-muted">Your aggregate: </span>
                <span className={`font-semibold ${AGGREGATE_TONE[verdict.status]}`}>
                  Agg. {aggregate}
                </span>
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            {/*
              * Careers are descriptive labels, not a status. Rendering them as
              * `info` gave every card a row of blue pills competing with the
              * eligibility badge, which is the one thing on the card that does
              * carry status.
              */}
            {(programme.careers ?? []).slice(0, 3).map((career) => (
              <Badge key={career} variant="neutral">
                {career}
              </Badge>
            ))}
          </div>

          {expanded && shortfalls.length > 0 && (
            <div className="mt-4">
              <ShortfallList
                shortfalls={shortfalls}
                requirements={programme.requirements}
                results={state.results}
                programmeName={programme.name}
              />
            </div>
          )}
        </div>

        {/* On a phone: primary action full width, secondary pair beneath it.
            Three buttons abreast at 360px leaves each below the 44px target. */}
        <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-col">
          <LinkButton
            to={`/programme/${programme.id}`}
            variant="primary"
            size="sm"
            className="col-span-2 sm:col-span-1"
          >
            View Details
          </LinkButton>
          <Button
            variant={compared ? 'secondary' : 'outline'}
            size="sm"
            icon={<GitCompare size={14} aria-hidden="true" />}
            onClick={() => toggleCompared(programme.id)}
            disabled={compareFull}
            title={compareFull ? `You can compare up to ${MAX_COMPARE} programmes` : undefined}
          >
            Compare
          </Button>
          <Button
            variant={saved ? 'primary' : 'outline'}
            size="sm"
            icon={<Star size={14} className={saved ? 'fill-current' : ''} aria-hidden="true" />}
            onClick={() => toggleSaved(programme.id)}
          >
            {saved ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>
    </Card>
  )
}
