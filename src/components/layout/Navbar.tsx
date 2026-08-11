import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { useAuth } from '../../state/AuthProvider'
import { useStudent } from '../../state/StudentProvider'
import Avatar from '../ui/Avatar'
import Button, { LinkButton } from '../ui/Button'
import Logo from './Logo'
import NavMenu from './NavMenu'
import { PRIMARY_NAV } from './navItems'

/**
 * Public-facing links only.
 *
 * The navbar used to repeat destinations the sidebar already owned, so the
 * same screen was reachable from three different labels. Inside the app the
 * sidebar and tab bar navigate; here the navbar only markets.
 */
const PUBLIC_NAV = [
  // The logo was the only route home, which is not discoverable enough.
  { label: 'Home', to: '/' },
  { label: 'Cut-Off Points', to: '/dashboard' },
  { label: 'Universities', to: '/universities' },
  { label: 'How it works', to: '/#faq' },
] as const

/**
 * Inside the app the wide navbar carries the primary destinations, because at
 * `md` there is no sidebar yet and no tab bar either, so that band had no
 * navigation at all. Below `md` the menu button carries the full map.
 */
const APP_NAV = PRIMARY_NAV.map(({ label, to }) => ({ label, to }))

/**
 * Routes that render inside the signed-in shell, where the sidebar and tab bar
 * navigate. The public browse pages are deliberately not here: they keep the
 * full public navbar.
 */
const APP_ROUTES = [
  '/home',
  '/dashboard',
  '/programme',
  '/simulator',
  '/compare',
  '/advisor',
  '/deadlines',
  '/saved',
  '/profile',
]

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
  const { pathname } = useLocation()
  const { state, hasResults } = useStudent()
  const { enabled: accountsEnabled, session } = useAuth()

  const inApp = APP_ROUTES.some((route) => pathname.startsWith(route))
  /** Show the account chip once there is actually an account or some data. */
  const showAccount = inApp || hasResults || Boolean(session)

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-md">
      {/*
        `gap-2` and a shrinkable logo, because at 360-412px the bar was trying
        to seat a two-word wordmark, "Log in", "Check Eligibility" and the menu
        button side by side. Nothing was allowed to shrink, so all three
        wrapped onto two lines each and the header became a block of stacked
        fragments.
      */}
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-3 lg:px-6">
        <Logo to={inApp ? '/home' : '/'} className="min-w-0 shrink" />

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {(inApp ? APP_NAV : PUBLIC_NAV).map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
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

        {/*
          `ml-auto` so the action and the menu sit together against the right
          edge. Without it, below `md` where the link row is hidden, nothing
          pushed this cluster anywhere: the call to action ended up jammed
          against the wordmark with the empty space stranded on the far side of
          the menu button, which is what made a three-item bar read as crowded.
        */}
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          {showAccount ? (
            /*
              No bell. It pointed at Deadlines, which is now a primary tab of
              its own with a clock on it, the thing it actually is. A bell
              promises notifications the app never sends.
            */
            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-xl py-1.5 pl-2 pr-3 transition-colors hover:bg-canvas"
            >
              <Avatar name={state.profile.name} />
              <span className="hidden text-sm font-medium text-ink sm:block">
                {shortNameOf(state.profile.name)}
              </span>
            </Link>
          ) : (
            <>
              {/*
                A "Log in" link used to sit here even when accounts were not
                enabled, sending students to a page that told them they did not
                need to log in. It now appears only when there is genuinely an
                account to sign in to, and only from `sm` up, because on a
                phone it was the third competing control in a 412px bar. The
                menu carries it below that.
              */}
              {accountsEnabled && (
                <LinkButton to="/login" variant="ghost" size="sm" className="hidden sm:inline-flex">
                  Log in
                </LinkButton>
              )}
              <LinkButton
                to="/eligibility"
                variant="primary"
                size="sm"
                className="whitespace-nowrap"
              >
                {/* "Check Eligibility" wrapped to two lines on a phone. */}
                <span className="sm:hidden">Check grades</span>
                <span className="hidden sm:inline">Check Eligibility</span>
              </LinkButton>
            </>
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
