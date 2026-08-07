import { BookMarked, Home, ListOrdered, User, Zap } from 'lucide-react'

/**
 * The single source of primary navigation.
 *
 * Previously the navbar listed 7 destinations, the sidebar another 7 and the
 * bottom bar 5, overlapping but not agreeing. One list, used by all three,
 * means a student learns the app once.
 *
 * Kept to five because that is the most a mobile tab bar can carry without the
 * labels becoming unreadable. Everything else is reachable in context: the
 * advisor from any programme page and the profile, deadlines from the navbar
 * bell, and comparison from the shortlist.
 */
export const PRIMARY_NAV = [
  { label: 'Matches', to: '/dashboard', icon: Home },
  { label: 'Cut-offs', to: '/cut-off-points', icon: ListOrdered },
  { label: 'What-if', to: '/simulator', icon: Zap },
  { label: 'Shortlist', to: '/saved', icon: BookMarked },
  { label: 'Profile', to: '/profile', icon: User },
] as const

/** Routes that count as "inside" a primary destination for active styling. */
export const NAV_ALIASES: Record<string, string[]> = {
  '/saved': ['/compare'],
  '/dashboard': ['/programme'],
  '/cut-off-points': ['/universities', '/university'],
  '/profile': ['/advisor', '/deadlines'],
}

export function isNavItemActive(to: string, pathname: string): boolean {
  if (pathname === to) return true
  return (NAV_ALIASES[to] ?? []).some((prefix) => pathname.startsWith(prefix))
}
