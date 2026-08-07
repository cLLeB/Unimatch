import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface CardProps {
  children: ReactNode
  className?: string
  /** Adds the lift-on-hover treatment used for clickable cards. */
  hover?: boolean
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-line bg-surface',
        hover
          ? 'cursor-pointer transition-all duration-200 hover:border-brand/30 hover:shadow-md'
          : 'shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}
