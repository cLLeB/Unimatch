import { screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { catalogueStats, programmes } from '../data/catalogue'
import type { StudentResults } from '../domain/wassce/types'
import { renderApp } from './renderApp'

/**
 * Every route renders, with real data and without crashing.
 *
 * These are deliberately shallow. Their job is to catch the class of failure
 * that shipped in the prototype: a page that throws, or renders an empty card
 * where a figure should be. Behaviour is covered by the domain suites and the
 * end-to-end journeys.
 */

/** Aggregate 17. */
const RESULTS: StudentResults = {
  examYear: 2025,
  core: { english: 'B2', mathematics: 'B3', science: 'B3', social: 'C4' },
  electives: [
    { subject: 'Elective Mathematics', grade: 'B2' },
    { subject: 'Physics', grade: 'B3' },
    { subject: 'Chemistry', grade: 'C4' },
  ],
}

const LAZY = { timeout: 10_000 }

/** Programme names carry brackets and dots that would otherwise be a pattern. */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function renderWithResults(route: string) {
  return renderApp(route, {
    state: {
      results: RESULTS,
      profile: {
        name: 'Ama Mensah',
        email: 'ama@example.com',
        school: 'Wesley Girls',
        track: 'General Science',
      },
      savedProgrammeIds: [programmes[0]!.id, programmes[1]!.id],
      comparedProgrammeIds: [programmes[0]!.id, programmes[1]!.id],
    },
  })
}

describe('public pages render', () => {
  it('landing', async () => {
    renderApp('/')
    expect(
      await screen.findByRole('heading', { level: 1, name: /Find Every University Programme/ }),
    ).toBeInTheDocument()
    // Counts come from the catalogue, never hardcoded.
    expect(screen.getAllByText(String(catalogueStats.programmeCount)).length).toBeGreaterThan(0)
  })

  it('landing feature cards link somewhere', async () => {
    renderApp('/')
    const card = await screen.findByRole('link', { name: /What-if Simulator/ })
    expect(card).toHaveAttribute('href', '/simulator')
  })

  it('universities index', async () => {
    renderApp('/universities')
    expect(await screen.findByRole('heading', { level: 1, name: 'Universities' })).toBeInTheDocument()
    expect(screen.getByText(new RegExp(`${catalogueStats.universityCount} institutions`))).toBeInTheDocument()
  })

  it('a university page, with stats rather than blanks', async () => {
    renderApp('/university/knust')
    expect(await screen.findByRole('heading', { level: 1, name: /Kwame Nkrumah/ })).toBeInTheDocument()
    expect(screen.getByText('Programmes')).toBeInTheDocument()
    expect(screen.getByText('Cut-off range')).toBeInTheDocument()
    expect(screen.getByText('Official figures')).toBeInTheDocument()
  })

  it('an unknown university does not throw', async () => {
    renderApp('/university/nowhere')
    expect(await screen.findByText('University not found')).toBeInTheDocument()
  })

  it('privacy', async () => {
    renderApp('/privacy')
    expect(await screen.findByRole('heading', { level: 1, name: 'Privacy' })).toBeInTheDocument()
  })

  it('terms', async () => {
    renderApp('/terms')
    expect(await screen.findByRole('heading', { level: 1, name: 'Terms of use' })).toBeInTheDocument()
  })

  it('login, which explains that no account is needed when auth is off', async () => {
    renderApp('/login')
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(/No account needed/)
  })

  it('the old cut-off URL redirects into matches', async () => {
    renderApp('/cut-off-points')
    await waitFor(() => expect(screen.getByText(/programmes? found/)).toBeInTheDocument())
  })
})

describe('app pages render', () => {
  it('matches, with search and filters', async () => {
    renderApp('/dashboard')
    expect(
      await screen.findByLabelText('Search programmes, universities and careers'),
    ).toBeInTheDocument()
    expect(screen.getByText(/programmes? found/)).toBeInTheDocument()
    expect(screen.getByLabelText('Filter by admission track')).toBeInTheDocument()
  })

  it('matches shows the whole catalogue before grades are entered', async () => {
    renderApp('/dashboard')
    expect(
      await screen.findByText(`${catalogueStats.programmeCount} programmes found`),
    ).toBeInTheDocument()
  })

  it('saved, empty', async () => {
    renderApp('/saved')
    expect(await screen.findByRole('heading', { level: 1, name: 'Shortlist' })).toBeInTheDocument()
    expect(screen.getByText('Nothing saved yet')).toBeInTheDocument()
  })

  it('saved, populated', async () => {
    renderWithResults('/saved')
    expect(await screen.findByRole('heading', { level: 1, name: 'Shortlist' })).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText(/2 programmes on your shortlist/)).toBeInTheDocument())
  })

  it('compare, empty', async () => {
    renderApp('/compare')
    expect(await screen.findByText('Nothing to compare yet')).toBeInTheDocument()
  })

  it('compare, populated, with computed superlatives', async () => {
    renderWithResults('/compare')
    await waitFor(() => expect(screen.getByText('Aggregate')).toBeInTheDocument(), LAZY)
    expect(screen.getByText('Track')).toBeInTheDocument()
    expect(screen.getByText('Data Source')).toBeInTheDocument()
    // The row that keeps a cut-off from being read as an entry requirement.
    expect(screen.getByText('Aggregate is')).toBeInTheDocument()
  })

  it('simulator, grouped by university rather than one long list', async () => {
    renderApp('/simulator')
    expect(
      await screen.findByRole('heading', { level: 1, name: /What-if Grade Simulator/ }, LAZY),
    ).toBeInTheDocument()
    expect(screen.getByText('Simulated Aggregate')).toBeInTheDocument()
    expect(screen.getByText(/Grouped by university/)).toBeInTheDocument()
  })

  it('deadlines, counting down live', async () => {
    renderApp('/deadlines')
    expect(await screen.findByRole('heading', { level: 1, name: 'Deadline Tracker' })).toBeInTheDocument()
    expect(screen.getByText('Reminder Settings')).toBeInTheDocument()
    // The provider caveat the review asked to remove must stay removed.
    expect(screen.queryByText(/messaging provider, which isn/i)).not.toBeInTheDocument()
  })

  it('profile', async () => {
    renderApp('/profile')
    expect(await screen.findByRole('heading', { level: 1, name: 'Student Profile' })).toBeInTheDocument()
    expect(screen.getByText('Application Checklist')).toBeInTheDocument()
    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
  })

  it('profile, with results and a shortlist', async () => {
    renderWithResults('/profile')
    await waitFor(() => expect(screen.getByText('Agg. 17')).toBeInTheDocument())
    expect(screen.getByRole('link', { name: /Share on WhatsApp/ })).toBeInTheDocument()
  })

  /**
   * The checklist is built from the student's own shortlist rather than being
   * the same six lines for everyone, so a saved programme has to appear in it
   * with a way to reach the university's portal.
   */
  it('profile checklist grows a block per saved programme', async () => {
    renderWithResults('/profile')
    await waitFor(() => expect(screen.getByText('Application Checklist')).toBeInTheDocument())

    expect(screen.getByText('2 of 5 saved')).toBeInTheDocument()
    for (const programme of [programmes[0]!, programmes[1]!]) {
      expect(
        screen.getByRole('heading', { name: new RegExp(escapeRegExp(programme.name)) }),
      ).toBeInTheDocument()
    }
    expect(screen.getAllByRole('link', { name: /Open the portal/ }).length).toBeGreaterThan(0)
  })

  it('profile checklist does not tick "review" just for having grades', async () => {
    renderWithResults('/profile')
    await waitFor(() => expect(screen.getByText('Application Checklist')).toBeInTheDocument())

    // Entering grades ticks one step, not two: the review step stays a link
    // until a programme has actually been opened.
    expect(screen.getByRole('link', { name: 'Review eligible programmes' })).toBeInTheDocument()
  })

  it('advisor', async () => {
    renderApp('/advisor')
    expect(await screen.findByRole('heading', { level: 1, name: 'Career Advisor' })).toBeInTheDocument()
    expect(screen.getByRole('log')).toBeInTheDocument()
  })
})

describe('no hedging vocabulary reaches a student', () => {
  /**
   * A stat is either confirmed, published by a named source, or absent. Words
   * like "Indicative" ask a student to grade our confidence for us, and
   * "Not published" spends a tile saying nothing.
   */
  const BANNED = /indicative|unconfirmed|not published|not confirmed|estimated cut-?off/i

  it.each([
    '/',
    '/dashboard',
    '/universities',
    '/university/knust',
    '/deadlines',
    '/terms',
  ])('%s', async (route) => {
    renderApp(route)
    await waitFor(() => expect(document.body.textContent ?? '').not.toBe(''))
    expect(document.body.textContent ?? '').not.toMatch(BANNED)
  })

  it('a programme whose university publishes no cut-off list', async () => {
    // Ashesi admits holistically, so this is the page most tempted to hedge.
    renderApp('/programme/ashesi-computer-science')
    expect(await screen.findByText('Entry requirement', {}, LAZY)).toBeInTheDocument()
    expect(screen.getByText('Minimum to be eligible')).toBeInTheDocument()
    expect(document.body.textContent ?? '').not.toMatch(BANNED)
  })
})

describe('programme detail is complete, not a shell', () => {
  const target = 'knust-human-biology-medicine'

  it('renders every headline metric with a real value', async () => {
    renderApp(`/programme/${target}`)

    expect(
      await screen.findByRole('heading', { name: 'Human Biology (Medicine)' }, LAZY),
    ).toBeInTheDocument()

    expect(screen.getByText('Annual Fees')).toBeInTheDocument()
    expect(screen.getByText('Competitiveness')).toBeInTheDocument()
    // Fees are a published band, so a range rather than "Not published".
    expect(screen.getByText(/GH₵ [\d,]+ to [\d,]+\/yr/)).toBeInTheDocument()
  })

  it('shows computed standing instead of empty pros and cons', async () => {
    renderApp(`/programme/${target}`)
    expect(await screen.findByText('How competitive', {}, LAZY)).toBeInTheDocument()
    expect(screen.getByText(/Ranks \d+ of \d+ nationally/)).toBeInTheDocument()
    expect(screen.queryByText('Pros')).not.toBeInTheDocument()
    expect(screen.queryByText('Cons')).not.toBeInTheDocument()
  })

  it('populates careers and the overview', async () => {
    renderApp(`/programme/${target}`)
    expect(await screen.findByText('Career paths', {}, LAZY)).toBeInTheDocument()
    expect(screen.getByText('Medical Doctor')).toBeInTheDocument()
    expect(screen.getByText(/is a 6-year MBChB programme/)).toBeInTheDocument()
  })

  it('states the year the cut-off is confirmed for, never "unconfirmed"', async () => {
    renderApp('/programme/ug-medicine-and-surgery')
    await screen.findByRole('heading', { name: 'Medicine and Surgery' }, LAZY)
    expect(screen.getAllByText(/Confirmed 2025\/26/).length).toBeGreaterThan(0)
    expect(screen.queryByText('Unconfirmed')).not.toBeInTheDocument()
  })

  it('renders the other tabs', async () => {
    const { user } = renderApp(`/programme/${target}`)
    await screen.findByRole('heading', { name: 'Human Biology (Medicine)' }, LAZY)

    const tabs = screen.getByRole('tablist')
    await user.click(within(tabs).getByRole('tab', { name: 'requirements' }))
    expect(screen.getByText('WASSCE Requirements')).toBeInTheDocument()

    await user.click(within(tabs).getByRole('tab', { name: 'careers' }))
    expect(screen.getByText('Career Opportunities')).toBeInTheDocument()

    await user.click(within(tabs).getByRole('tab', { name: 'apply' }))
    expect(screen.getByText('Application Process')).toBeInTheDocument()
  })
})

describe('a programme admitted more than one way', () => {
  /**
   * Cape Coast runs Accounting on the regular track at 15 and by distance at
   * 24. A student who misses the first may well reach the second, and before
   * this the two pages had no connection at all.
   */
  it('links the other routes, loosest first', async () => {
    renderApp('/programme/ucc-accounting')
    expect(await screen.findByText('Other ways in', {}, LAZY)).toBeInTheDocument()

    const route = screen.getByRole('link', { name: /Distance/ })
    expect(route).toHaveAttribute('href', '/programme/ucc-accounting-distance')
    expect(within(route).getByText('Agg. 24')).toBeInTheDocument()
    expect(within(route).getByText('9 looser')).toBeInTheDocument()
  })

  it('says the cut-off is the first-choice figure, not a guarantee', async () => {
    const { user } = renderApp('/programme/ucc-accounting')
    await screen.findByRole('heading', { name: 'Accounting' }, LAZY)

    await user.click(within(screen.getByRole('tablist')).getByRole('tab', { name: 'requirements' }))
    expect(screen.getByText(/is the first-choice figure/)).toBeInTheDocument()
    expect(screen.getByText(/do not publish a separate figure for lower choices/)).toBeInTheDocument()
  })

  it('omits the section for a programme offered one way only', async () => {
    renderApp('/programme/knust-chemical-engineering')
    await screen.findByRole('heading', { name: 'Chemical Engineering' }, LAZY)
    expect(screen.queryByText('Other ways in')).not.toBeInTheDocument()
  })
})
