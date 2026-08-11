import {
  BookMarked,
  Brain,
  Building2,
  Clock,
  FileText,
  GitCompare,
  GraduationCap,
  Home,
  LayoutGrid,
  Shield,
  Sparkles,
  User,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * The navigation map. Navbar, sidebar, tab bar and menu all read from here, so
 * a destination cannot exist in one and be missing from another.
 *
 * What changed and why:
 *
 * - **Home means the landing page, and only the landing page.** The app used
 *   to have two of them: `/` and the signed-in hub at `/home`, both labelled
 *   Home, so the word answered to two different screens depending on where you
 *   were standing. The hub is Overview now, which is what it shows, and Home
 *   is the one address a student can say out loud.
 *
 * - **Deadlines is promoted into the tab bar.** It is the only thing in the
 *   product with a clock on it, and it was hidden behind a bell icon.
 *
 * - **Profile moves to the avatar.** Every site puts the account there, and it
 *   frees a primary slot for something a student uses weekly rather than once.
 *
 * - **What-if and the Advisor become tools, not destinations.** They are
 *   reached from Home and from the screens where they make sense, and they are
 *   listed in the menu. Neither is a weekly errand.
 *
 * Five is the ceiling for the tab bar: a sixth makes the labels unreadable on
 * a 360px phone.
 */

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
  /** Shown in the menu under the label. */
  hint?: string
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { label: 'Overview', to: '/home', icon: Home, hint: 'Your progress at a glance' },
  { label: 'Matches', to: '/dashboard', icon: LayoutGrid, hint: 'Every programme you qualify for' },
  { label: 'Universities', to: '/universities', icon: Building2, hint: 'All 19 institutions' },
  { label: 'Shortlist', to: '/saved', icon: BookMarked, hint: 'Programmes you saved' },
  { label: 'Deadlines', to: '/deadlines', icon: Clock, hint: 'What closes when' },
] as const

/** Tools: useful, but not somewhere a student goes every week. */
export const TOOL_NAV: readonly NavItem[] = [
  { label: 'What-if simulator', to: '/simulator', icon: Zap, hint: 'Test a different set of grades' },
  { label: 'Career advisor', to: '/advisor', icon: Brain, hint: 'Ask about a programme or career' },
  { label: 'Compare', to: '/compare', icon: GitCompare, hint: 'Your shortlist side by side' },
] as const

export const ACCOUNT_NAV: readonly NavItem[] = [
  { label: 'Profile', to: '/profile', icon: User, hint: 'Your details and checklist' },
  { label: 'Your grades', to: '/eligibility', icon: Sparkles, hint: 'Enter or change your WASSCE' },
] as const

/**
 * The landing page is a destination, not just where you happened to arrive.
 *
 * Inside the app the wordmark goes to `/home`, which is right, but it left the
 * front page reachable only by editing the address bar. A student who wants to
 * see what the product claims, or to send it to a friend, had nowhere to click.
 */
export const ABOUT_NAV: readonly NavItem[] = [
  { label: 'Home', to: '/', icon: GraduationCap, hint: 'The UniMatch front page' },
  { label: 'How it works', to: '/#faq', icon: FileText },
  { label: 'Privacy', to: '/privacy', icon: Shield },
  { label: 'Terms', to: '/terms', icon: FileText },
] as const

/** The whole map, grouped, for the menu. Nothing in the app is unreachable. */
export const NAV_GROUPS: readonly { title: string; items: readonly NavItem[] }[] = [
  { title: 'Your application', items: PRIMARY_NAV },
  { title: 'Tools', items: TOOL_NAV },
  { title: 'Account', items: ACCOUNT_NAV },
  { title: 'About', items: ABOUT_NAV },
] as const

/**
 * Routes that count as "inside" a primary destination for active styling.
 *
 * A programme page reached from Universities still highlights Universities,
 * because that is where the student believes she is.
 */
export const NAV_ALIASES: Record<string, string[]> = {
  '/saved': ['/compare'],
  '/dashboard': ['/programme', '/cut-off-points'],
  '/universities': ['/university'],
  '/home': ['/advisor', '/simulator'],
}

/**
 * Routes where the bottom bar would get in the way: the landing page sells
 * with its own CTAs, and the auth/legal pages are single-purpose.
 */
const BOTTOM_NAV_HIDDEN_ON = ['/', '/login', '/signup', '/privacy', '/terms']

/**
 * Whether the tab bar is carrying the primary destinations on this route.
 *
 * The menu reads this too. Where the tabs are on screen, repeating the same
 * five links inside the drawer gives a student two answers to one question;
 * where they are not, the drawer is the only place they exist.
 */
export function hasBottomNav(pathname: string): boolean {
  return !BOTTOM_NAV_HIDDEN_ON.includes(pathname)
}

export function isNavItemActive(to: string, pathname: string): boolean {
  if (pathname === to) return true
  return (NAV_ALIASES[to] ?? []).some((prefix) => pathname.startsWith(prefix))
}
