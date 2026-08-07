import { Brain, Clock, LogOut } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { useStudent } from '../../state/StudentProvider'
import { isNavItemActive, PRIMARY_NAV } from './navItems'

/** Reached in context rather than competing for a primary slot. */
const SECONDARY_NAV = [
  { label: 'Deadlines', to: '/deadlines', icon: Clock },
  { label: 'Advisor', to: '/advisor', icon: Brain },
] as const

export default function Sidebar() {
  const { signOut } = useStudent()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const linkClass = (active: boolean) =>
    cn(
      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
      active ? 'bg-brand-subtle text-brand' : 'text-ink-muted hover:bg-canvas hover:text-ink',
    )

  return (
    <aside className="hidden min-h-[calc(100vh-4rem)] w-56 shrink-0 flex-col border-r border-line bg-surface px-3 pb-4 pt-6 lg:flex">
      {/* Same five destinations as the mobile tab bar, in the same order. */}
      <nav className="space-y-1" aria-label="Sections">
        {PRIMARY_NAV.map(({ label, to, icon: Icon }) => {
          const active = isNavItemActive(to, pathname)
          return (
            <Link
              key={to}
              to={to}
              aria-current={active ? 'page' : undefined}
              className={linkClass(active)}
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="my-3 border-t border-line" />

      <nav className="flex-1 space-y-1" aria-label="More">
        {SECONDARY_NAV.map(({ label, to, icon: Icon }) => (
          <Link key={to} to={to} className={linkClass(pathname === to)}>
            <Icon size={18} aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => {
          signOut()
          navigate('/')
        }}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-muted transition-all hover:bg-red-50 hover:text-danger"
      >
        <LogOut size={18} aria-hidden="true" />
        Clear my data
      </button>
    </aside>
  )
}
