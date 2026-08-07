import { expect, test } from '@playwright/test'

/**
 * Browsing the catalogue without grades and without an account.
 *
 * Cut-offs used to be its own page; it is now merged into Matches, which
 * browses all 448 programmes and narrows to your grades once you have entered
 * them.
 */
test.describe('programme browser', () => {
  test('is usable with no grades and no account', async ({ page }) => {
    await page.goto('/dashboard')

    await expect(page.getByText(/\d+ programmes? found/)).toBeVisible()
    await expect(page.getByLabel('Search programmes and universities')).toBeVisible()
    await expect(page.getByRole('link', { name: /enter my grades/i })).toBeVisible()
  })

  test('the old cut-off URL still works', async ({ page }) => {
    await page.goto('/cut-off-points')
    await expect(page).toHaveURL(/\/dashboard$/)
  })

  test('search narrows the list', async ({ page }) => {
    await page.goto('/dashboard')
    const count = page.getByText(/^\d+ programmes? found$/)
    const before = await count.textContent()

    await page.getByLabel('Search programmes and universities').fill('nursing')

    await expect(count).not.toHaveText(before ?? '')
    await expect(page.getByRole('heading', { name: 'Nursing', exact: true }).first()).toBeVisible()
  })

  test('tells the visitor when nothing matches', async ({ page }) => {
    await page.goto('/dashboard')
    await page.getByLabel('Search programmes and universities').fill('zzzzzz')
    await expect(page.getByText(/no programmes match/i)).toBeVisible()
  })

  test('every cut-off states the year it is confirmed for', async ({ page }) => {
    await page.goto('/dashboard')
    // Positive labelling: never "Unconfirmed", always the year it holds for.
    await expect(
      page.getByText(/Confirmed 20\d\d\/\d\d|Published 20\d\d\/\d\d/).first(),
    ).toBeVisible()
    await expect(page.getByText('Unconfirmed')).toHaveCount(0)
  })

  test('loads more on demand rather than painting every row', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByRole('button', { name: /show \d+ more/i })).toBeVisible()
    await expect(page.getByText(/showing \d+ of \d+/i)).toBeVisible()
  })
})

test.describe('universities', () => {
  test('index lists every institution with its cut-off range', async ({ page }) => {
    await page.goto('/universities')
    await expect(page.getByRole('heading', { level: 1, name: 'Universities' })).toBeVisible()
    await expect(page.getByRole('link', { name: /KNUST/ }).first()).toBeVisible()
    await expect(page.getByText(/Cut-offs/).first()).toBeVisible()
  })

  test('includes private universities', async ({ page }) => {
    await page.goto('/universities')
    await expect(page.getByRole('link', { name: /Ashesi/ }).first()).toBeVisible()
  })

  test('a university page lists its programmes and links to them', async ({ page }) => {
    await page.goto('/university/ug')

    await expect(page.getByRole('heading', { level: 1 })).toContainText('University of Ghana')
    await expect(page.getByText('Programmes at University of Ghana')).toBeVisible()

    await page.getByText('Medicine and Surgery').first().click()
    await expect(page).toHaveURL(/\/programme\/ug-medicine-and-surgery$/)
  })

  test('an unknown university does not 500', async ({ page }) => {
    await page.goto('/university/not-a-real-university')
    await expect(page.getByText('University not found')).toBeVisible()
  })
})

test.describe('programme detail is complete', () => {
  test('shows fees, competitiveness, careers and an overview', async ({ page }) => {
    await page.goto('/programme/knust-human-biology-medicine')

    await expect(page.getByRole('heading', { name: 'Human Biology (Medicine)' })).toBeVisible()

    // No empty cards, and no "Not published" in the headline metrics.
    await expect(page.getByText('Annual Fees')).toBeVisible()
    await expect(page.getByText(/GH₵ [\d,]+ to [\d,]+\/yr/)).toBeVisible()
    await expect(page.getByText('Competitiveness')).toBeVisible()

    await expect(page.getByText('How competitive')).toBeVisible()
    await expect(page.getByText(/Ranks \d+ of \d+ nationally/)).toBeVisible()

    await expect(page.getByText('Career paths')).toBeVisible()
    await expect(page.getByText('Medical Doctor')).toBeVisible()

    // The overview is populated rather than an empty card.
    await expect(page.getByText(/is a 6-year MBChB programme/)).toBeVisible()
  })
})

test.describe('SEO', () => {
  test('each route carries its own title and description', async ({ page }) => {
    await page.goto('/universities')
    await expect(page).toHaveTitle(/Universities in Ghana.*UniMatch Ghana/)
    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute('content', /Cut-off points/i)

    await page.goto('/university/knust')
    await expect(page).toHaveTitle(/KNUST Cut-Off Points/)
  })

  test('serves a sitemap and robots.txt', async ({ request }) => {
    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.status()).toBe(200)
    const body = await sitemap.text()
    expect(body).toContain('/universities')
    expect(body).toContain('/programme/ug-medicine-and-surgery')

    const robots = await request.get('/robots.txt')
    expect(robots.status()).toBe(200)
    expect(await robots.text()).toContain('Sitemap:')
  })
})
