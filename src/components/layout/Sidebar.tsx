import { BookMarked, Brain, Clock, GitCompare, Home, LogOut, User, Zap } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { useStudent } from '../../state/StudentProvider'

/**
 * The design's six sidebar items, plus the What-if Simulator.
 *
 * The prototype reached the simulator only through the top nav's "Cut-Off
 * Points" link, which left it with no active state in the app shell. Adding it
 * here keeps every app screen reachable and highlighted from one place.
 */
const ITEMS = [
  { label: 'Dashboard', to: '/dashboard', icon: Home },
  { label: 'Saved Programmes', to: '/saved', icon: BookMarked },
  { label: 'Comparison', to: '/compare', icon: GitCompare },
  { label: 'What-if Simulator', to: '/simulator', icon: Zap },
  { label: 'AI Advisor', to: '/advisor', icon: Brain },
  { label: 'Deadlines', to: '/deadlines', icon: Clock },
  { label: 'Profile', to: '/profile', icon: User },
] as const

export default function Sidebar() {
  const { signOut } = useStudent()
  const navigate = useNavigate()

  return (
    <aside className="hidden min-h-[calc(100vh-4rem)] w-56 shrink-0 flex-col border-r border-line bg-surface px-3 pb-4 pt-6 lg:flex">
      <nav className="flex-1 space-y-1" aria-label="Sections">
        {ITEMS.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-brand-subtle text-brand'
                  : 'text-ink-muted hover:bg-canvas hover:text-ink',
              )
            }
          >
            <Icon size={18} aria-hidden="true" />
            {label}
          </NavLink>
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
        Log out
      </button>
    </aside>
  )
}
