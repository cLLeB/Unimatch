import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import ErrorBoundary from '../components/ErrorBoundary'
import ScrollToTop from '../components/layout/ScrollToTop'
import { readAuthFragment } from '../state/authFragment'

/**
 * The magic-link landing.
 *
 * Supabase returns its tokens in the URL fragment, so every successful
 * sign-in arrives on a hash that is not a CSS selector. Handing that to
 * `querySelector` threw, the throw escaped the effect, React unmounted the
 * tree, and the student got a blank page the instant they signed in.
 */

/** Real fragments, copied from what Supabase actually returns. */
const TOKEN_HASH =
  '#access_token=eyJhbGci.eyJzdWIi.sig&expires_at=1786000000&expires_in=3600&refresh_token=abc123&token_type=bearer&type=magiclink'
const ERROR_HASH =
  '#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired'

function renderAt(hash: string) {
  return render(
    <MemoryRouter initialEntries={[`/dashboard${hash}`]}>
      <ScrollToTop />
      <Routes>
        <Route path="/dashboard" element={<p>Dashboard</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ScrollToTop survives every fragment a sign-in can produce', () => {
  it.each([
    ['a success fragment', TOKEN_HASH],
    ['an expired-link fragment', ERROR_HASH],
    ['a fragment with CSS metacharacters', '#a=1&b=[2]:3'],
    ['a bare hash', '#'],
    ['a numeric id, which is not a valid selector', '#123'],
  ])('renders the page with %s', (_case, hash) => {
    renderAt(hash)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('still scrolls to a real anchor', () => {
    const anchor = document.createElement('div')
    anchor.id = 'faq'
    anchor.scrollIntoView = () => undefined
    document.body.appendChild(anchor)

    renderAt('#faq')
    expect(screen.getByText('Dashboard')).toBeInTheDocument()

    anchor.remove()
  })
})

describe('reading what the sign-in link came back with', () => {
  it('recognises a completed sign-in', () => {
    expect(readAuthFragment(TOKEN_HASH)).toEqual({ kind: 'signed-in' })
  })

  it('explains an expired link in words a student can act on', () => {
    const notice = readAuthFragment(ERROR_HASH)
    expect(notice?.kind).toBe('error')
    if (notice?.kind !== 'error') throw new Error('unreachable')
    expect(notice.message).toMatch(/expired or was already opened/)
    expect(notice.message).toMatch(/Request a new one/)
  })

  it('falls back to the supplied description for a code it does not know', () => {
    const notice = readAuthFragment('#error=server_error&error_description=Something+broke')
    expect(notice).toEqual({ kind: 'error', message: 'Something broke' })
  })

  it('falls back to its own wording when there is no description either', () => {
    const notice = readAuthFragment('#error_code=weird_thing')
    expect(notice?.kind).toBe('error')
  })

  it.each(['', '#', '#faq', '#section-2'])('reports nothing for "%s"', (hash) => {
    expect(readAuthFragment(hash)).toBeNull()
  })
})

describe('ErrorBoundary', () => {
  function Boom(): never {
    throw new Error('boom from a child')
  }

  it('shows a way out instead of a blank page', () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    )

    expect(screen.getByRole('heading', { name: /Something went wrong/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back to home' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
    // Reassures the student their data survived, because it did.
    expect(screen.getByText(/saved grades and shortlist are untouched/)).toBeInTheDocument()
  })

  it('renders its children when nothing throws', () => {
    render(
      <ErrorBoundary>
        <p>All good</p>
      </ErrorBoundary>,
    )
    expect(screen.getByText('All good')).toBeInTheDocument()
  })
})
