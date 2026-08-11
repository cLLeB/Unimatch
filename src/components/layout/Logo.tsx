import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

interface LogoProps {
  /** Footer variant renders on the dark surface. */
  tone?: 'default' | 'inverse'
  className?: string
  /** Defaults to the landing page; the app shell passes its own home. */
  to?: string
}

/**
 * The wordmark is a route home, and inside the app "home" is the student's
 * hub rather than the marketing page. Sending a signed-in student to the
 * landing page is how a product loses her: she has to find her way back in.
 */
export default function Logo({ tone = 'default', className, to = '/' }: LogoProps) {
  return (
    <Link
      to={to}
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
        Never wraps. In a crowded phone header the wordmark broke as
        "UniMatch / Ghana" across two lines, which made the whole bar look
        broken. "Ghana" is dropped below `sm` instead, so the brand still reads
        and the row stays one line tall.
      */}
      <span className="whitespace-nowrap text-lg">
        UniMatch<span className="hidden text-brand sm:inline"> Ghana</span>
      </span>
    </Link>
  )
}
