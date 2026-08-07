import { Bell, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { useAuth } from '../../state/AuthProvider'
import { useStudent } from '../../state/StudentProvider'
import Button, { LinkButton } from '../ui/Button'
import Logo from './Logo'
import { PRIMARY_NAV } from './navItems'

/**
 * Public-facing links only.
 *
 * The navbar used to repeat destinations the sidebar already owned, so the
 * same screen was reachable from three different labels. Inside the app the
 * sidebar and tab bar navigate; here the navbar only markets.
 */
const PUBLIC_NAV = [
  { label: 'Cut-Off Points', to: '/cut-off-points' },
  { label: 'Universities', to: '/universities' },
  { label: 'How it works', to: '/#faq' },
] as const

const APP_ROUTES = [
  '/dashboard',
  '/programme',
  '/simulator',
  '/compare',
  '/advisor',
  '/deadlines',
  '/saved',
  '/profile',
  '/cut-off-points',
  '/universities',
  '/university',
]

export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'ME'
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase()
}

export function shortNameOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'My profile'
  if (parts.length === 1) return parts[0]!
  return `${parts[0]} ${parts[parts.length - 1]![0]}.`
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const { state, hasResults } = useStudent()
  const { enabled: accountsEnabled, session } = useAuth()

  const inApp = APP_ROUTES.some((route) => pathname.startsWith(route))
  /** Show the account chip once there is actually an account or some data. */
  const showAccount = inApp || hasResults || Boolean(session)

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 lg:px-6">
        <Logo />

        {/* Public links are hidden inside the app, where the sidebar leads. */}
        {!inApp && (
          <div className="hidden items-center gap-1 md:flex">
            {PUBLIC_NAV.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive && !item.to.includes('#')
                      ? 'bg-brand-subtle text-brand'
                      : 'text-ink-muted hover:bg-canvas hover:text-ink',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          {showAccount ? (
            <>
              <Link
                to="/deadlines"
                aria-label="Application deadlines"
                className="relative rounded-lg p-2 text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
              >
                <Bell className="size-5" aria-hidden="true" />
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-xl py-1.5 pl-2 pr-3 transition-colors hover:bg-canvas"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
                  {initialsOf(state.profile.name)}
                </span>
                <span className="hidden text-sm font-medium text-ink sm:block">
                  {shortNameOf(state.profile.name)}
                </span>
              </Link>
            </>
          ) : (
            <>
              {/*
                A "Log in" link used to sit here even when accounts were not
                enabled, sending students to a page that told them they did not
                need to log in. It now appears only when there is genuinely an
                account to sign in to.
              */}
              {accountsEnabled && (
                <LinkButton to="/login" variant="ghost" size="sm">
                  Log in
                </LinkButton>
              )}
              <LinkButton to="/eligibility" variant="primary" size="sm">
                Check Eligibility
              </LinkButton>
            </>
          )}

          {!inApp && (
            <Button
              variant="ghost"
              size="sm"
              className="p-2 md:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          )}
        </div>
      </div>

      {mobileOpen && !inApp && (
        <div className="space-y-1 border-t border-line bg-surface px-4 py-3 md:hidden">
          {PUBLIC_NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to={PRIMARY_NAV[0].to}
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-brand"
          >
            My matches
          </Link>
        </div>
      )}
    </nav>
  )
}
