import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { hasBottomNav, isNavItemActive, PRIMARY_NAV } from './navItems'

/**
 * Mobile primary navigation.
 *
 * The sidebar is `lg:flex` only, so on a phone the app previously had no way
 * to move between sections at all. Most Ghanaian students arrive on a phone,
 * so this is the primary navigation for the majority of real usage.
 */
export default function BottomNav() {
  const { pathname } = useLocation()
  if (!hasBottomNav(pathname)) return null

  return (
    <nav
      aria-label="Primary"
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 lg:hidden',
        /*
         * Opaque, not translucent. At 95% with a blur, page text showed
         * through the bar and read as content sliding under broken
         * navigation rather than as depth, and it dulled the labels sitting
         * on top of it.
         */
        'border-t border-line bg-surface',
        // Clear of the iOS home indicator and Android gesture bar.
        'pb-[env(safe-area-inset-bottom)]',
      )}
    >
      <ul className="grid grid-cols-5">
        {PRIMARY_NAV.map(({ label, to, icon: Icon }) => {
          const active = isNavItemActive(to, pathname)
          return (
            <li key={to}>
              <Link
                to={to}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  // 56px tall: comfortably above the 44px minimum touch target.
                  'flex h-14 flex-col items-center justify-center gap-0.5 text-[0.6875rem] font-medium transition-colors',
                  active ? 'text-brand' : 'text-ink-muted',
                )}
              >
                <Icon
                  size={20}
                  strokeWidth={active ? 2.5 : 2}
                  aria-hidden="true"
                  className={cn(active && 'scale-110 transition-transform')}
                />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
