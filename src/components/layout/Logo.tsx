import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

interface LogoProps {
  /** Footer variant renders on the dark surface. */
  tone?: 'default' | 'inverse'
  className?: string
}

/**
 * The wordmark goes home, and home is the landing page.
 *
 * It used to point at `/home` inside the app and `/` outside it, which meant
 * the same mark took a student to two different screens depending on where
 * she happened to be. The signed-in hub is Overview, and it has a tab.
 */
export default function Logo({ tone = 'default', className }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn(
        'flex items-center gap-2.5 font-bold',
        tone === 'inverse' ? 'text-footer-heading' : 'text-ink',
        className,
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-fill">
        <GraduationCap size={18} className="text-on-brand-fill" aria-hidden="true" />
      </span>
      {/*
        Never wraps, and below `sm` it is the mark alone.

        The bar now carries Home, Matches, the account and the menu on every
        screen of the site, and on a 360px phone those four plus a wordmark
        come to more than the width available: something had to give, and a
        logo that is still recognisable as a mark costs less than a header
        that overflows. "Ghana" needs the room of a tablet.
      */}
      <span className="hidden whitespace-nowrap text-lg sm:inline">
        UniMatch<span className="hidden text-brand md:inline"> Ghana</span>
      </span>
    </Link>
  )
}
