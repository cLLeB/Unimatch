import { screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './renderApp'

/**
 * The critical user journey: enter grades → see the right matches.
 *
 * This is what the product exists to do, and it did not exist at all before
 * this rebuild — the prototype's "Check My Eligibility" button went nowhere and
 * every verdict was a hardcoded boolean.
 */

/** Fill the form with grades that produce a known aggregate. */
async function enterGrades(user: ReturnType<typeof renderApp>['user']) {
  await user.selectOptions(screen.getByLabelText('English Language'), 'B2')
  await user.selectOptions(screen.getByLabelText('Core Mathematics'), 'B3')
  await user.selectOptions(screen.getByLabelText('Integrated Science'), 'B3')
  await user.selectOptions(screen.getByLabelText('Social Studies'), 'C4')

  await user.selectOptions(screen.getByLabelText('Elective subject 1'), 'Elective Mathematics')
  await user.selectOptions(screen.getByLabelText('Elective 1 grade'), 'B2')
  await user.selectOptions(screen.getByLabelText('Elective subject 2'), 'Physics')
  await user.selectOptions(screen.getByLabelText('Elective 2 grade'), 'B3')
  await user.selectOptions(screen.getByLabelText('Elective subject 3'), 'Chemistry')
  await user.selectOptions(screen.getByLabelText('Elective 3 grade'), 'C4')
}

describe('eligibility flow', () => {
  it('computes the best-six aggregate, not the sum of all seven subjects', async () => {
    const { user } = renderApp('/eligibility')
    await enterGrades(user)

    // 2 + 3 + 3 (better of Science/Social) + 2 + 3 + 4 = 17.
    // The Figma prototype would have reported 21 for these same grades.
    const preview = await screen.findByText('17')
    expect(preview).toBeInTheDocument()
    expect(screen.queryByText('21')).not.toBeInTheDocument()
  })

  it('refuses to submit until the required grades are entered', async () => {
    const { user } = renderApp('/eligibility')

    await user.click(screen.getByRole('button', { name: /find eligible programmes/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /enter all four core subjects and at least three named electives/i,
    )
    expect(screen.getAllByText('Required').length).toBeGreaterThan(0)
  })

  it('carries the student through to a dashboard of real verdicts', async () => {
    const { user } = renderApp('/eligibility')
    await enterGrades(user)
    await user.click(screen.getByRole('button', { name: /find eligible programmes/i }))

    // The dashboard summary reports the computed aggregate, not a stored one.
    await waitFor(() => expect(screen.getByText('Aggregate')).toBeInTheDocument(), {
      timeout: 3000,
    })
    expect(screen.getByText('17')).toBeInTheDocument()

    // Verdicts are derived: at aggregate 17 some programmes qualify and the
    // very competitive ones (Medicine at 8, Biomedical Engineering at 6) do not.
    const qualified = screen.getAllByTitle('You meet the aggregate and every subject requirement')
    const notEligible = screen.getAllByTitle('Requirements are not met on your current grades')
    expect(qualified.length).toBeGreaterThan(0)
    expect(notEligible.length).toBeGreaterThan(0)
  })

  it('explains a shortfall rather than only refusing', async () => {
    const { user } = renderApp('/eligibility')
    await enterGrades(user)
    await user.click(screen.getByRole('button', { name: /find eligible programmes/i }))

    await waitFor(() => expect(screen.getByText('Aggregate')).toBeInTheDocument(), {
      timeout: 3000,
    })

    // Close matches render their reasons inline on the dashboard.
    const reasons = await screen.findAllByText(/you miss it by \d+ point/i)
    expect(reasons.length).toBeGreaterThan(0)
  })

  it('persists the results across a remount', async () => {
    const { user, repository, unmount } = renderApp('/eligibility')
    await enterGrades(user)
    await user.click(screen.getByRole('button', { name: /find eligible programmes/i }))

    await waitFor(async () => {
      const stored = await repository.load()
      expect(stored.results).not.toBeNull()
    })

    unmount()

    const stored = await repository.load()
    expect(stored.results?.electives).toHaveLength(3)
    expect(stored.results?.core.english).toBe('B2')
  })
})

describe('programme detail', () => {
  it('shows a programme with its cut-off and data source', async () => {
    renderApp('/programme/ug-medicine')

    expect(await screen.findByRole('heading', { name: 'Medicine & Surgery' })).toBeInTheDocument()
    expect(screen.getByText(/Agg\. 8/)).toBeInTheDocument()
    expect(screen.getAllByText(/Official · 2025/).length).toBeGreaterThan(0)
  })

  it('shows a real not-found state for an unknown programme', async () => {
    renderApp('/programme/does-not-exist')
    expect(await screen.findByText('Programme not found')).toBeInTheDocument()
  })
})

describe('routing', () => {
  it('renders a 404 rather than silently redirecting', async () => {
    renderApp('/no-such-page')
    expect(await screen.findByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })

  it('renders the deadline tracker, which the prototype never routed', async () => {
    renderApp('/deadlines')
    expect(await screen.findByRole('heading', { name: 'Deadline Tracker' })).toBeInTheDocument()
  })

  it('renders the comparison page empty state', async () => {
    renderApp('/compare')
    expect(await screen.findByText('Nothing to compare yet')).toBeInTheDocument()
  })
})

describe('advisor', () => {
  it('answers a suggested question from the data', async () => {
    const { user } = renderApp('/advisor')

    await user.click(await screen.findByRole('button', { name: /which university is easiest/i }))

    const log = screen.getByRole('log')
    await waitFor(
      () => expect(within(log).getByText(/average cut-off/i)).toBeInTheDocument(),
      { timeout: 3000 },
    )
  })
})
