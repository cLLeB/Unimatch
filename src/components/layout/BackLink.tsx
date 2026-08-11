import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

/**
 * The way back out of a page that no tab owns.
 *
 * The tab bar answers "where can I go", never "where am I". On the Advisor,
 * the simulator and the profile no tab is highlighted, because none of them is
 * a tab, so a student on a phone had no marker of place and no route back to
 * the screen that sent her there.
 *
 * It names its destination rather than saying "Back", and it goes there rather
 * than through history. A label that reads "Home" and lands somewhere else is
 * worse than no label, and history walks out of the app entirely when the page
 * was opened from a search result or a shared link.
 *
 * Below `lg` only: from there up the sidebar is on screen and already says
 * where you are.
 */
export default function BackLink({
  to,
  label,
  className,
}: {
  to: string
  label: string
  className?: string
}) {
  return (
    <Link
      to={to}
      className={cn(
        '-ml-2 mb-1 inline-flex min-h-11 items-center gap-1 rounded-lg px-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink lg:hidden',
        className,
      )}
    >
      <ChevronLeft size={18} aria-hidden="true" />
      {label}
    </Link>
  )
}
