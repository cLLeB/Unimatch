import { GitCompare, Star } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { useStudent } from '../../state/StudentProvider'

/**
 * Saved and Compare are one destination in two views.
 *
 * They were separate primary nav entries, which made the app feel bigger than
 * it is: both are "programmes I have picked". One tab strip, one slot in the
 * navigation.
 */
export default function ShortlistTabs() {
  const { pathname } = useLocation()
  const { state } = useStudent()

  const tabs = [
    {
      to: '/saved',
      label: 'Saved',
      count: state.savedProgrammeIds.length,
      icon: Star,
    },
    {
      to: '/compare',
      label: 'Compare',
      count: state.comparedProgrammeIds.length,
      icon: GitCompare,
    },
  ]

  return (
    <div
      role="tablist"
      aria-label="Shortlist views"
      className="mb-5 grid w-full grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1 sm:flex sm:w-fit"
    >
      {tabs.map(({ to, label, count, icon: Icon }) => {
        const active = pathname === to
        return (
          <Link
            key={to}
            to={to}
            role="tab"
            aria-selected={active}
            className={cn(
              'flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all',
              active ? 'bg-surface text-ink shadow-sm' : 'text-ink-muted hover:text-ink',
            )}
          >
            <Icon size={14} aria-hidden="true" />
            {label}
            {count > 0 && (
              <span
                className={cn(
                  'rounded-full px-1.5 text-xs font-semibold',
                  active ? 'bg-brand-fill text-on-brand-fill' : 'bg-slate-200 text-ink-muted',
                )}
              >
                {count}
              </span>
            )}
          </Link>
        )
      })}
    </div>
  )
}
