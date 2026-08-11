import { describe, expect, it } from 'vitest'
import {
  ABOUT_NAV,
  ACCOUNT_NAV,
  NAV_GROUPS,
  PRIMARY_NAV,
  TOOL_NAV,
  isNavItemActive,
} from './navItems'

/**
 * Navigation invariants.
 *
 * The old map broke quietly: the navbar listed seven destinations, the sidebar
 * another seven and the tab bar five, none of them agreeing, and the in-app
 * menu had shrunk to two links, which left the simulator, the advisor and
 * comparison unreachable on a phone. Nothing failed, because nothing checked.
 */

/** Every route the app actually serves, from App.tsx. */
const ROUTES = [
  '/',
  '/eligibility',
  '/cut-off-points',
  '/universities',
  '/university/:universityId',
  '/login',
  '/signup',
  '/privacy',
  '/terms',
  '/home',
  '/dashboard',
  '/programme/:programmeId',
  '/saved',
  '/compare',
  '/simulator',
  '/advisor',
  '/deadlines',
  '/profile',
]

describe('navigation map', () => {
  it('keeps the tab bar to five, which is what a phone can label', () => {
    expect(PRIMARY_NAV).toHaveLength(5)
  })

  it('starts at a home the student can return to', () => {
    expect(PRIMARY_NAV[0]?.to).toBe('/home')
  })

  it('points every destination at a route that exists', () => {
    const targets = NAV_GROUPS.flatMap((group) => group.items)
      .map((item) => item.to)
      .filter((to) => !to.includes('#'))

    const unknown = targets.filter((to) => !ROUTES.includes(to))
    expect(unknown).toEqual([])
  })

  it('never lists the same destination twice', () => {
    const targets = NAV_GROUPS.flatMap((group) => group.items).map((item) => item.to)
    expect(targets).toHaveLength(new Set(targets).size)
  })

  /**
   * The menu is the only surface that carries everything, so a destination
   * missing from it is a destination reachable only by typing a URL.
   */
  it('reaches every navigable section from the menu', () => {
    const inMenu = new Set(NAV_GROUPS.flatMap((group) => group.items).map((item) => item.to))

    for (const group of [PRIMARY_NAV, TOOL_NAV, ACCOUNT_NAV, ABOUT_NAV]) {
      for (const item of group) expect(inMenu.has(item.to)).toBe(true)
    }
  })

  it('leaves no app route unreachable from navigation', () => {
    const reachable = new Set(NAV_GROUPS.flatMap((group) => group.items).map((item) => item.to))
    // Detail and auth routes are reached from a list or a link, not a tab.
    const reachedInContext = [
      '/',
      '/cut-off-points',
      '/university/:universityId',
      '/programme/:programmeId',
      '/login',
      '/signup',
    ]

    const orphans = ROUTES.filter(
      (route) => !reachable.has(route) && !reachedInContext.includes(route),
    )
    expect(orphans).toEqual([])
  })

  it('highlights the section a detail page belongs to', () => {
    expect(isNavItemActive('/universities', '/university/knust')).toBe(true)
    expect(isNavItemActive('/dashboard', '/programme/knust-computer-science')).toBe(true)
    expect(isNavItemActive('/saved', '/compare')).toBe(true)
    expect(isNavItemActive('/dashboard', '/universities')).toBe(false)
  })

  it('gives the menu a hint for everything it offers as a destination', () => {
    const missing = [...PRIMARY_NAV, ...TOOL_NAV, ...ACCOUNT_NAV]
      .filter((item) => !item.hint)
      .map((item) => item.to)

    expect(missing).toEqual([])
  })
})
