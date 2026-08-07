import { expect, test, type Page } from '@playwright/test'

/**
 * Critical user journeys, run against the real production build.
 *
 * Aggregate 17: English B2 + Core Maths B3 + Integrated Science B3 (better
 * than Social Studies C4) + electives B2, B3, C4.
 */
async function enterGrades(page: Page) {
  await page.getByLabel('English Language').selectOption('B2')
  await page.getByLabel('Core Mathematics').selectOption('B3')
  await page.getByLabel('Integrated Science').selectOption('B3')
  await page.getByLabel('Social Studies').selectOption('C4')

  await page.getByLabel('Elective subject 1').selectOption('Elective Mathematics')
  await page.getByLabel('Elective 1 grade').selectOption('B2')
  await page.getByLabel('Elective subject 2').selectOption('Physics')
  await page.getByLabel('Elective 2 grade').selectOption('B3')
  await page.getByLabel('Elective subject 3').selectOption('Chemistry')
  await page.getByLabel('Elective 3 grade').selectOption('C4')
}

test.describe('landing', () => {
  test('leads to the grade form and makes no unverifiable claims', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Find Every University Programme',
    )

    // The prototype's fabricated marketing claims must not come back.
    await expect(page.getByText('50,000+')).toHaveCount(0)
    await expect(page.getByText('99%')).toHaveCount(0)

    await page.getByRole('link', { name: 'Check My Eligibility' }).first().click()
    await expect(page).toHaveURL(/\/eligibility$/)
  })
})

test.describe('eligibility', () => {
  test('computes the best-six aggregate and routes to matches', async ({ page }) => {
    await page.goto('/eligibility')
    await enterGrades(page)

    // Best six is 17. Summing all seven subjects, as the prototype did, is 21.
    await expect(page.getByText('Your aggregate so far')).toBeVisible()
    await expect(page.getByText('17', { exact: true })).toBeVisible()
    await expect(page.getByText('21', { exact: true })).toHaveCount(0)

    await page.getByRole('button', { name: 'Find Eligible Programmes' }).click()
    await expect(page).toHaveURL(/\/dashboard$/)
    await expect(page.getByText('Aggregate', { exact: true })).toBeVisible()
    await expect(page.getByText(/\d+ programmes found/)).toBeVisible()
  })

  test('blocks submission with a clear reason', async ({ page }) => {
    await page.goto('/eligibility')
    await page.getByRole('button', { name: 'Find Eligible Programmes' }).click()

    await expect(page.getByRole('alert')).toContainText('Enter all four core subjects')
    await expect(page).toHaveURL(/\/eligibility$/)
  })

  test('survives a reload', async ({ page }) => {
    await page.goto('/eligibility')
    await enterGrades(page)
    await page.getByRole('button', { name: 'Find Eligible Programmes' }).click()
    await expect(page).toHaveURL(/\/dashboard$/)

    await page.reload()
    await expect(page.getByText('Aggregate', { exact: true })).toBeVisible()
    await expect(page.getByText('17', { exact: true }).first()).toBeVisible()
  })
})

test.describe('dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/eligibility')
    await enterGrades(page)
    await page.getByRole('button', { name: 'Find Eligible Programmes' }).click()
    await expect(page).toHaveURL(/\/dashboard$/)
  })

  test('shows three-tier verdicts with reasons', async ({ page }) => {
    await expect(page.getByTitle('You meet the aggregate and every subject requirement').first()).toBeVisible()
    await expect(page.getByText(/you miss it by \d+ point/i).first()).toBeVisible()
  })

  test('saves a programme and it appears on the shortlist', async ({ page }) => {
    await page.getByRole('button', { name: 'Save' }).first().click()
    await expect(page.getByRole('button', { name: 'Saved' }).first()).toBeVisible()

    await page.goto('/saved')
    await expect(page.getByText('1 programme on your shortlist')).toBeVisible()
  })

  test('compares programmes with computed superlatives', async ({ page }) => {
    const compareButtons = page.getByRole('button', { name: 'Compare' })
    await compareButtons.nth(0).click()
    await compareButtons.nth(1).click()

    await page.getByRole('link', { name: 'Compare Now' }).click()
    await expect(page).toHaveURL(/\/compare$/)
    await expect(page.getByText('Cut-off Agg.')).toBeVisible()
    await expect(page.getByText('Most Competitive')).toBeVisible()
  })
})

test.describe('deep links', () => {
  test('a programme URL loads directly, with its data source', async ({ page }) => {
    await page.goto('/programme/ug-medicine')
    await expect(page.getByRole('heading', { name: 'Medicine & Surgery' })).toBeVisible()
    await expect(page.getByText('Official · 2025').first()).toBeVisible()
  })

  test('an unknown URL renders a 404, not a redirect', async ({ page }) => {
    await page.goto('/definitely-not-a-page')
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
  })
})

test.describe('advisor', () => {
  test('answers from the data rather than a canned string', async ({ page }) => {
    await page.goto('/advisor')
    await page.getByRole('button', { name: 'Which university is easiest to enter?' }).click()

    await expect(page.getByText(/average cut-off/i)).toBeVisible()
  })
})

test.describe('simulator', () => {
  test('recomputes eligibility when a grade changes', async ({ page }) => {
    await page.goto('/simulator')
    await expect(page.getByText('Simulated Aggregate')).toBeVisible()

    const before = await page.getByText('Simulated Aggregate').locator('..').textContent()

    // Drag the first slider towards A1.
    const slider = page.locator('input[type="range"]').first()
    await slider.fill('1')

    const after = await page.getByText('Simulated Aggregate').locator('..').textContent()
    expect(after).not.toBe(before)
  })
})
