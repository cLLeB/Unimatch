import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-brand-fill text-on-brand-fill hover:bg-brand-fill-hover focus-visible:ring-brand',
  secondary: 'bg-secondary text-white hover:bg-secondary-hover focus-visible:ring-secondary',
  outline: 'border border-line bg-surface text-ink hover:bg-canvas focus-visible:ring-brand',
  ghost: 'text-ink-muted hover:bg-slate-100 focus-visible:ring-brand',
  danger: 'bg-danger text-white hover:bg-red-600 focus-visible:ring-danger',
}

interface CommonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  className?: string
}

interface ButtonProps extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> {
  /** When set, the button renders as a router link instead. */
  to?: never
}

interface LinkButtonProps extends CommonProps {
  to: string
  /** Opens in a new tab when the target is external. */
  external?: boolean
}

function classesFor({ variant = 'primary', size = 'md', className }: CommonProps & { variant?: ButtonVariant; size?: ButtonSize }) {
  return cn(BASE, SIZES[size], VARIANTS[variant], className)
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className,
  type = 'button', ...rest
}: ButtonProps) {
  return (
    <button type={type} className={classesFor({ children, variant, size, className })} {...rest}>
      {icon}
      {children}
    </button>
  )
}

export function LinkButton({
  children,
  to,
  variant = 'primary',
  size = 'md',
  icon,
  className,
  external = false,
}: LinkButtonProps) {
  const classes = classesFor({ children, variant, size, className })

  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer noopener" className={classes}>
        {icon}
        {children}
      </a>
    )
  }

  return (
    <Link to={to} className={classes}>
      {icon}
      {children}
    </Link>
  )
}
