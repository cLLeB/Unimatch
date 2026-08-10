import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { ACCOUNT_NAV, PRIMARY_NAV, TOOL_NAV, isNavItemActive } from './navItems'

/**
 * Desktop navigation, reading the same map as the tab bar and the menu.
 *
 * It used to end in a "Clear my data" button, a destructive action sitting
 * permanently in the navigation where a mis-tap wiped a student's grades and
 * shortlist without confirming. That now lives on the profile, behind a
 * confirm, and only appears once there is data to lose.
 */
export default function Sidebar() {
  const { pathname } = useLocation()

  const linkClass = (active: boolean) =>
    cn(
      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
      active ? 'bg-brand-subtle text-brand' : 'text-ink-muted hover:bg-canvas hover:text-ink',
    )

  const section = (title: string, items: typeof PRIMARY_NAV) => (
    <div>
      <h2 className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-ink-muted/70">
        {title}
      </h2>
      <ul className="space-y-1">
        {items.map(({ label, to, icon: Icon }) => {
          const active = isNavItemActive(to, pathname)
          return (
            <li key={to}>
              <Link
                to={to}
                aria-current={active ? 'page' : undefined}
                className={linkClass(active)}
              >
                <Icon size={18} aria-hidden="true" />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <aside className="hidden min-h-[calc(100vh-4rem)] w-56 shrink-0 flex-col gap-5 border-r border-line bg-surface px-3 pb-4 pt-6 lg:flex">
      <nav className="space-y-5" aria-label="Sections">
        {section('Your application', PRIMARY_NAV)}
        {section('Tools', TOOL_NAV)}
        {section('Account', ACCOUNT_NAV)}
      </nav>
    </aside>
  )
}
