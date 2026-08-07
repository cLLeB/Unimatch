import { AlertTriangle, ShieldCheck } from 'lucide-react'
import type { Provenance } from '../../domain/catalogue/types'
import { CONFIDENCE_LABELS, CONFIDENCE_SHORT } from '../../data/catalogue'
import Badge from '../ui/Badge'

interface ProvenanceBadgeProps {
  provenance: Provenance
  /** Show the full source citation beneath the badge. */
  detailed?: boolean
}

/**
 * Surfaces where a cut-off came from.
 *
 * Anything short of an official university source is visibly flagged, because
 * students make application decisions on these numbers — see the spec's
 * integrity requirements.
 */
export default function ProvenanceBadge({ provenance, detailed = false }: ProvenanceBadgeProps) {
  const official = provenance.confidence === 'authoritative'

  const badge = (
    <Badge
      variant={official ? 'info' : 'warning'}
      title={CONFIDENCE_LABELS[provenance.confidence]}
      icon={
        official ? (
          <ShieldCheck size={12} aria-hidden="true" />
        ) : (
          <AlertTriangle size={12} aria-hidden="true" />
        )
      }
    >
      {CONFIDENCE_SHORT[provenance.confidence]} · {provenance.year}
    </Badge>
  )

  if (!detailed) return badge

  return (
    <div className="space-y-1.5">
      {badge}
      <p className="text-xs leading-relaxed text-ink-muted">
        {CONFIDENCE_LABELS[provenance.confidence]}. Source: {provenance.source}
        {provenance.sourceUrl && (
          <>
            {' — '}
            <a
              href={provenance.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-brand underline underline-offset-2"
            >
              view
            </a>
          </>
        )}
        . Last checked {provenance.lastVerified}.
      </p>
    </div>
  )
}
