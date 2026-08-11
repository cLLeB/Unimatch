import { User } from 'lucide-react'
import { cn } from '../../lib/cn'

/**
 * The account face, in the navbar chip and on the Profile page.
 *
 * Before a student types a name there are no initials to show, and the
 * placeholder used to be the literal letters "ME". Two capitals in a filled
 * circle read as somebody's initials, so the default looked like an account
 * belonging to a person called M. E. rather than an empty one. So the unnamed
 * state wears the person icon, and letters appear only once they mean
 * something.
 */
export type AvatarSize = 'sm' | 'lg'

/** Initials for a filled avatar; empty when there is no name to shorten. */
export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase()
}

const SIZES: Record<AvatarSize, { box: string; icon: number }> = {
  sm: { box: 'size-7 text-xs font-semibold', icon: 16 },
  lg: { box: 'size-24 text-3xl font-bold', icon: 40 },
}

interface AvatarProps {
  name: string
  size?: AvatarSize
  className?: string
}

export default function Avatar({ name, size = 'sm', className }: AvatarProps) {
  const initials = initialsOf(name)
  const { box, icon } = SIZES[size]

  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-brand-fill text-on-brand-fill',
        box,
        className,
      )}
    >
      {initials || <User size={icon} aria-hidden="true" />}
    </span>
  )
}
