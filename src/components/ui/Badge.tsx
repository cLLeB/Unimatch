import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

/*
 * Tokens rather than palette steps, so dark mode is a change in index.css
 * rather than a `dark:` variant on five variants here. After dark the fill
 * goes transparent and the colour moves to the text.
 */
const VARIANTS: Record<BadgeVariant, string> = {
  success: 'bg-badge-success text-badge-success-ink border-badge-success-line',
  warning: 'bg-badge-warning text-badge-warning-ink border-badge-warning-line',
  danger: 'bg-badge-danger text-badge-danger-ink border-badge-danger-line',
  info: 'bg-badge-info text-badge-info-ink border-badge-info-line',
  neutral: 'bg-badge-neutral text-badge-neutral-ink border-badge-neutral-line',
}

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  icon?: ReactNode
  className?: string
  title?: string
}

export default function Badge({
  children,
  variant = 'neutral',
  icon,
  className,
  title,
}: BadgeProps) {
  return (
    <span
      title={title}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        VARIANTS[variant],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
