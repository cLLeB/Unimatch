import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './renderApp'

/**
 * The bar does not change as a student moves around.
 *
 * It used to carry one set of links on the marketing pages and another inside
 * the app, chosen by matching the path against a list of routes. Adding a
 * route to one list and not the other, or reaching an app screen through a
 * public URL, silently gave a student the wrong header. There is one bar now,
 * and this is what pins it: two destinations, an account, and the menu.
 */

const ROUTES = ['/', '/dashboard', '/universities', '/home', '/deadlines', '/profile', '/privacy']

const LAZY = { timeout: 10_000 }

describe('the navbar', () => {
  it.each(ROUTES)('carries the same four controls at %s', async (route) => {
    renderApp(route)

    const bar = (await screen.findAllByRole('navigation', undefined, LAZY))[0]!
    const inBar = within(bar)

    expect(inBar.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(inBar.getByRole('link', { name: 'Matches' })).toHaveAttribute('href', '/dashboard')
    expect(inBar.getByRole('button', { name: 'Open menu' })).toBeInTheDocument()

    // Accounts are off in tests, so the slot holds the profile rather than a
    // sign-in that would lead nowhere. Either way it is filled.
    expect(inBar.getByRole('link', { name: 'Your profile' })).toHaveAttribute('href', '/profile')
  })

  it('offers no other destination, whichever page you are on', async () => {
    renderApp('/dashboard')

    const bar = (await screen.findAllByRole('navigation', undefined, LAZY))[0]!
    const labels = within(bar)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))

    // The wordmark, Home, Matches, the profile. Nothing else.
    expect(labels).toEqual(['/', '/', '/dashboard', '/profile'])
  })
})
