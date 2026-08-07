import { Check, HelpCircle, X, Zap } from 'lucide-react'
import type { VerdictStatus } from '../../domain/wassce/eligibility'
import Badge, { type BadgeVariant } from '../ui/Badge'

const PRESENTATION: Record<
  VerdictStatus,
  { label: string; variant: BadgeVariant; Icon: typeof Check; title: string }
> = {
  qualified: {
    label: 'Qualified',
    variant: 'success',
    Icon: Check,
    title: 'You meet the aggregate and every subject requirement',
  },
  'close-match': {
    label: 'Close Match',
    variant: 'warning',
    Icon: Zap,
    title: 'Within reach, see what you would need to change',
  },
  'not-eligible': {
    label: 'Not Eligible',
    variant: 'danger',
    Icon: X,
    title: 'Requirements are not met on your current grades',
  },
  incomplete: {
    label: 'Enter your grades',
    variant: 'neutral',
    Icon: HelpCircle,
    title: 'Add your WASSCE grades to check this programme',
  },
}

interface EligibilityBadgeProps {
  status: VerdictStatus
}

export default function EligibilityBadge({ status }: EligibilityBadgeProps) {
  const { label, variant, Icon, title } = PRESENTATION[status]
  return (
    <Badge variant={variant} title={title} icon={<Icon size={12} strokeWidth={3} aria-hidden="true" />}>
      {label}
    </Badge>
  )
}

/** Text colour matching the badge, for the "Your aggregate" figure. */
export const AGGREGATE_TONE: Record<VerdictStatus, string> = {
  qualified: 'text-success',
  'close-match': 'text-accent',
  'not-eligible': 'text-danger',
  incomplete: 'text-ink-muted',
}
