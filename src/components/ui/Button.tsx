import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

/**
 * The one button system.
 *
 * Variants are roles, not decoration. A screen has at most one `primary`: the
 * action it exists for. Everything else supports it. The Profile page used to
 * carry five different treatments at once — a pill outline, a full-width
 * outline, a full-width solid red, a centred ghost and an underlined text
 * link — which reads as five unrelated components rather than one product.
 *
 * | variant   | means                                                        |
 * |-----------|--------------------------------------------------------------|
 * | primary   | the action this screen wants. One per screen.                 |
 * | secondary | a second action of comparable weight, e.g. Compare.           |
 * | outline   | a supporting action sitting next to a primary.                |
 * | ghost     | tertiary, toolbars, icon buttons.                             |
 * | danger    | destroys something. Never the default on a screen.            |
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'

/**
 * Sizes carry a minimum height, not only padding.
 *
 * Padding alone let a short label render a 30px-tall control, under any
 * reasonable touch target on a phone — and this app is used on phones. The
 * minimums here are the floor; text still sets the height when it is taller.
 */
const SIZES: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-3 py-1.5 text-sm',
  md: 'min-h-11 px-4 py-2.5 text-sm',
  lg: 'min-h-12 px-6 py-3 text-base',
}

/** Icon-only buttons are square, so they never inherit label padding. */
const ICON_SIZES: Record<ButtonSize, string> = {
  sm: 'size-10 p-0',
  md: 'size-11 p-0',
  lg: 'size-12 p-0',
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-brand-fill text-on-brand-fill hover:bg-brand-fill-hover focus-visible:ring-brand',
  secondary: 'bg-secondary text-white hover:bg-secondary-hover focus-visible:ring-secondary',
  outline: 'border border-line bg-surface text-ink hover:bg-canvas focus-visible:ring-brand',
  // A token, not a palette step: `slate-100` stayed light in dark mode.
  ghost: 'text-ink-muted hover:bg-canvas hover:text-ink focus-visible:ring-brand',
  danger: 'bg-danger text-white hover:bg-red-600 focus-visible:ring-danger',
}

interface CommonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  /**
   * Which side the icon sits on. An arrow means "onward" and belongs after the
   * label — "Apply Now →", not "→ Apply Now".
   */
  iconPosition?: 'leading' | 'trailing'
  /**
   * Stretch to the container. A prop rather than `className="w-full"` at each
   * call site, so full-width is a decision the system knows about.
   */
  fullWidth?: boolean
  /** Square button with no label; `children` becomes the accessible name. */
  iconOnly?: boolean
  className?: string
}

interface ButtonProps
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> {
  /** When set, the button renders as a router link instead. */
  to?: never
}

interface LinkButtonProps extends CommonProps {
  to: string
  /** Opens in a new tab when the target is external. */
  external?: boolean
  'aria-label'?: string
}

function classesFor({
  variant = 'primary',
  size = 'md',
  fullWidth,
  iconOnly,
  className,
}: CommonProps) {
  return cn(
    BASE,
    iconOnly ? ICON_SIZES[size] : SIZES[size],
    VARIANTS[variant],
    fullWidth && 'w-full',
    className,
  )
}

function content({ icon, iconPosition = 'leading', iconOnly, children }: CommonProps) {
  if (iconOnly) return icon
  return (
    <>
      {iconPosition === 'leading' && icon}
      {children}
      {iconPosition === 'trailing' && icon}
    </>
  )
}

export default function Button({ type = 'button', ...props }: ButtonProps) {
  const { onClick, disabled, ...rest } = props
  return (
    <button
      type={type}
      className={classesFor(props)}
      onClick={onClick}
      disabled={disabled}
      {...(props.iconOnly && typeof props.children === 'string'
        ? { 'aria-label': props.children }
        : {})}
      {...omitCommon(rest)}
    >
      {content(props)}
    </button>
  )
}

export function LinkButton(props: LinkButtonProps) {
  const { to, external = false } = props
  const classes = classesFor(props)
  const label =
    props['aria-label'] ??
    (props.iconOnly && typeof props.children === 'string' ? props.children : undefined)

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
        {...(label ? { 'aria-label': label } : {})}
      >
        {content(props)}
      </a>
    )
  }

  return (
    <Link to={to} className={classes} {...(label ? { 'aria-label': label } : {})}>
      {content(props)}
    </Link>
  )
}

/** Strip the styling props so they never reach the DOM as attributes. */
function omitCommon<T extends Record<string, unknown>>(props: T) {
  const {
    children: _children,
    variant: _variant,
    size: _size,
    icon: _icon,
    iconPosition: _iconPosition,
    fullWidth: _fullWidth,
    iconOnly: _iconOnly,
    className: _className,
    ...rest
  } = props
  return rest
}
