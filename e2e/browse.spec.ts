import { expect, test } from '@playwright/test'

test.describe('cut-off points browser', () => {
  test('is usable with no grades and no account', async ({ page }) => {
    await page.goto('/cut-off-points')

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Cut-Off Points')
    await expect(page.getByText(/\d+ programmes?$/)).toBeVisible()
    await expect(page.getByRole('link', { name: /check what i qualify for/i })).toBeVisible()
  })

  test('tells the visitor when nothing matches', async ({ page }) => {
    await page.goto('/cut-off-points')
    await page.getByLabel('Search programmes and universities').fill('zzzzzz')
    await expect(page.getByText(/nothing matches/i)).toBeVisible()
  })

  // The table is the desktop rendering; phones get a card list instead, which
  // e2e/mobile.spec.ts covers. Pinned wide so these run under both projects.
  test.describe('desktop table', () => {
    test.use({ viewport: { width: 1280, height: 800 } })

    test('search narrows the list', async ({ page }) => {
      await page.goto('/cut-off-points')
      const table = page.getByRole('table')
      const rowsBefore = await table.locator('tbody tr').count()

      await page.getByLabel('Search programmes and universities').fill('medicine')

      await expect(table.locator('tbody tr')).not.toHaveCount(rowsBefore)
      await expect(table.getByText('Medicine & Surgery')).toBeVisible()
    })

    test('every cut-off shows where it came from', async ({ page }) => {
      await page.goto('/cut-off-points')
      await expect(page.getByRole('table').getByText(/Official · 2025/).first()).toBeVisible()
    })
  })
})

test.describe('universities', () => {
  test('index lists every institution with its cut-off range', async ({ page }) => {
    await page.goto('/universities')
    await expect(page.getByRole('heading', { level: 1, name: 'Universities' })).toBeVisible()
    await expect(page.getByRole('link', { name: /KNUST/ }).first()).toBeVisible()
    await expect(page.getByText(/Cut-offs/).first()).toBeVisible()
  })

  test('a university page lists its programmes and links to them', async ({ page }) => {
    await page.goto('/university/ug')

    await expect(page.getByRole('heading', { level: 1 })).toContainText('University of Ghana')
    await expect(page.getByText('Programmes at University of Ghana')).toBeVisible()

    await page.getByText('Medicine & Surgery').first().click()
    await expect(page).toHaveURL(/\/programme\/ug-medicine$/)
  })

  test('an unknown university does not 500', async ({ page }) => {
    await page.goto('/university/not-a-real-university')
    await expect(page.getByText('University not found')).toBeVisible()
  })
})

test.describe('SEO', () => {
  test('each route carries its own title and description', async ({ page }) => {
    await page.goto('/cut-off-points')
    await expect(page).toHaveTitle(/Cut-Off Points .* \| UniMatch Ghana/)
    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute('content', /cut-off points for \d+ programmes/i)

    await page.goto('/university/knust')
    await expect(page).toHaveTitle(/KNUST Cut-Off Points/)
  })

  test('serves a sitemap and robots.txt', async ({ request }) => {
    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.status()).toBe(200)
    const body = await sitemap.text()
    expect(body).toContain('/cut-off-points')
    expect(body).toContain('/programme/ug-medicine')

    const robots = await request.get('/robots.txt')
    expect(robots.status()).toBe(200)
    expect(await robots.text()).toContain('Sitemap:')
  })
})
