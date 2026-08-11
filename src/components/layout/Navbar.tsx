import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { useAuth } from '../../state/AuthProvider'
import { useStudent } from '../../state/StudentProvider'
import Avatar from '../ui/Avatar'
import Button, { LinkButton } from '../ui/Button'
import Logo from './Logo'
import NavMenu from './NavMenu'

/**
 * The bar is the same on every screen of the site.
 *
 * It used to hold one set of links on the marketing pages and a different set
 * inside the app, swapped by matching the path against a list of routes, so
 * the header rearranged itself as a student moved around and the same product
 * wore two headers. Two destinations, an account and the menu: that is the
 * whole bar, everywhere, and the menu behind it carries the rest of the map.
 */
const BAR_NAV = [
  { label: 'Home', to: '/' },
  { label: 'Matches', to: '/dashboard' },
] as const

export function shortNameOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  // "Me" rather than "My profile": it is the student's own chip, and the two
  // words wrapped against the menu button on a narrow phone.
  if (parts.length === 0) return 'Me'
  if (parts.length === 1) return parts[0]!
  return `${parts[0]} ${parts[parts.length - 1]![0]}.`
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { state } = useStudent()
  const { enabled: accountsEnabled, session } = useAuth()

  /*
   * "Log in" only where there is an account to sign in to. On a deployment
   * with no Supabase credentials the button used to send students to a page
   * that told them they did not need to log in, so there the account slot
   * carries the profile instead. Either way the slot is always filled, and
   * the bar keeps its shape.
   */
  const showLogIn = accountsEnabled && !session

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-1 px-4 sm:gap-3 lg:px-6">
        <Logo className="min-w-0 shrink" />

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {BAR_NAV.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-2 py-2 text-sm font-medium transition-colors sm:px-3',
                  isActive
                    ? 'bg-brand-subtle text-brand'
                    : 'text-ink-muted hover:bg-canvas hover:text-ink',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}

          {showLogIn ? (
            <LinkButton to="/login" variant="ghost" size="sm" className="whitespace-nowrap">
              Log in
            </LinkButton>
          ) : (
            <Link
              to="/profile"
              aria-label="Your profile"
              className="flex items-center gap-2 rounded-xl py-1.5 pl-1 pr-1 transition-colors hover:bg-canvas sm:pl-2 sm:pr-3"
            >
              <Avatar name={state.profile.name} />
              <span className="hidden text-sm font-medium text-ink sm:block">
                {shortNameOf(state.profile.name)}
              </span>
            </Link>
          )}

          {/*
            The menu holds the entire map, on every screen size. It used to be
            `md:hidden` and to list two links inside the app, so a student on a
            phone could not reach the simulator, the advisor, comparison or the
            legal pages at all.
          */}
          <Button
            variant="ghost"
            size="md"
            iconOnly
            icon={<Menu className="size-5" aria-hidden="true" />}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            Open menu
          </Button>
        </div>
      </div>

      <NavMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </nav>
  )
}
