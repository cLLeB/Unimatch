import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'white'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
  icon?: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand-dark shadow-sm',
  secondary:
    'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50',
  ghost: 'text-slate-600 hover:text-slate-900',
  white: 'bg-white text-slate-900 hover:bg-slate-50 shadow-md',
}

export default function Button({
  variant = 'primary',
  children,
  icon,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
