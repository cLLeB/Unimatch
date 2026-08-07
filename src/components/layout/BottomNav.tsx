import { BookMarked, Home, ListOrdered, User, Zap } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'

/**
 * Routes where the bottom bar would get in the way: the landing page sells
 * with its own CTAs, and the auth/legal pages are single-purpose.
 */
const HIDDEN_ON = ['/', '/login', '/signup', '/privacy', '/terms']

/**
 * Mobile primary navigation.
 *
 * The sidebar is `lg:flex` only, so on a phone the app previously had no way
 * to move between sections at all — you had to open the hamburger menu, which
 * only listed the marketing links. Most Ghanaian students arrive on a phone,
 * so this is the primary navigation for the majority of real usage.
 */
const ITEMS = [
  { label: 'Matches', to: '/dashboard', icon: Home },
  { label: 'Cut-offs', to: '/cut-off-points', icon: ListOrdered },
  { label: 'What-if', to: '/simulator', icon: Zap },
  { label: 'Saved', to: '/saved', icon: BookMarked },
  { label: 'Profile', to: '/profile', icon: User },
] as const

export default function BottomNav() {
  const { pathname } = useLocation()
  if (HIDDEN_ON.includes(pathname)) return null

  return (
    <nav
      aria-label="Primary"
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 lg:hidden',
        'border-t border-line bg-surface/95 backdrop-blur-md',
        // Clear of the iOS home indicator and Android gesture bar.
        'pb-[env(safe-area-inset-bottom)]',
      )}
    >
      <ul className="grid grid-cols-5">
        {ITEMS.map(({ label, to, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  // 56px tall: comfortably above the 44px minimum touch target.
                  'flex h-14 flex-col items-center justify-center gap-0.5 text-[0.6875rem] font-medium transition-colors',
                  isActive ? 'text-brand' : 'text-ink-muted',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                    aria-hidden="true"
                    className={cn(isActive && 'scale-110 transition-transform')}
                  />
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
