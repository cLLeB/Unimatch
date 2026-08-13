import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

/*
 * Colour lives in the text and the icon only: no fill, no outline. A card can
 * carry four of these at once (eligibility, degree, admission track,
 * provenance) and four tinted pills in a row shouted louder than the
 * programme name they were labelling.
 *
 * Tokens rather than palette steps, so dark mode is a change in index.css
 * rather than a `dark:` variant on five variants here.
 */
const VARIANTS: Record<BadgeVariant, string> = {
  success: 'text-badge-success-ink',
  warning: 'text-badge-warning-ink',
  danger: 'text-badge-danger-ink',
  info: 'text-badge-info-ink',
  neutral: 'text-badge-neutral-ink',
}

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  icon?: ReactNode
  className?: string
  title?: string
  /**
   * Sitting on the teal header rather than on a card. The variant inks are
   * mixed for daylight surfaces and all but vanish on brand fill, so the
   * icon carries the distinction there instead of the hue.
   */
  onBrand?: boolean
}

export default function Badge({
  children,
  variant = 'neutral',
  icon,
  className,
  title,
  onBrand = false,
}: BadgeProps) {
  return (
    <span
      title={title}
      className={cn(
        'inline-flex items-center gap-1 text-xs font-medium',
        onBrand ? 'text-on-brand-bright' : VARIANTS[variant],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
