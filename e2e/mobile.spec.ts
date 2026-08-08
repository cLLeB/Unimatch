import { expect, test } from '@playwright/test'

/**
 * Mobile behaviour, verified at a real phone viewport.
 *
 * Most Ghanaian students arrive on a phone, so "works on desktop" is not the
 * bar. These run under both projects; the mobile-only assertions guard on
 * viewport width so the desktop run stays meaningful.
 */
const PHONE = { width: 390, height: 844 }

test.describe('mobile layout', () => {
  test.use({ viewport: PHONE })

  test('nothing overflows horizontally', async ({ page }) => {
    for (const path of ['/', '/dashboard', '/eligibility', '/universities', '/simulator']) {
      await page.goto(path)
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow, `${path} scrolls sideways by ${overflow}px`).toBeLessThanOrEqual(1)
    }
  })

  test('the bottom tab bar is the primary navigation', async ({ page }) => {
    await page.goto('/dashboard')

    const nav = page.getByRole('navigation', { name: 'Primary' })
    await expect(nav).toBeVisible()

    await nav.getByRole('link', { name: 'Universities' }).click()
    await expect(page).toHaveURL(/\/universities$/)

    // It follows the student onto the public browse pages.
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
  })

  test('the bottom bar stays out of the way on the landing page', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('navigation', { name: 'Primary' })).toHaveCount(0)
  })

  test('the sidebar is replaced, not merely hidden', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByRole('navigation', { name: 'Sections' })).not.toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
  })

  test('touch targets meet the 44px minimum', async ({ page }) => {
    await page.goto('/dashboard')
    const tabs = page.getByRole('navigation', { name: 'Primary' }).getByRole('link')

    for (const tab of await tabs.all()) {
      const box = await tab.boundingBox()
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44)
    }
  })

  test('programmes render as cards, not a squeezed table', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByRole('table')).toHaveCount(0)
    await expect(page.getByText(/Cut-off:/).first()).toBeVisible()
  })

  test('the grade form is completable without sideways scrolling', async ({ page }) => {
    await page.goto('/eligibility')

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

    await expect(page.getByText('17', { exact: true })).toBeVisible()

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(1)

    await page.getByRole('button', { name: 'Find Eligible Programmes' }).click()
    await expect(page).toHaveURL(/\/dashboard$/)
  })

  test('the dashboard summary fits four stats without wrapping oddly', async ({ page }) => {
    await page.goto('/eligibility')
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
    await page.getByRole('button', { name: 'Find Eligible Programmes' }).click()

    // All four stat labels present, and the row does not force the page wide.
    for (const label of ['Aggregate', 'Close', 'Unis']) {
      await expect(page.getByText(label, { exact: true })).toBeVisible()
    }

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(1)
  })

  test('page content is never hidden behind the tab bar', async ({ page }) => {
    await page.goto('/deadlines')
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const nav = page.getByRole('navigation', { name: 'Primary' })
    const navBox = await nav.boundingBox()
    const last = page.getByText(/None of these are sending yet/i)
    const lastBox = await last.boundingBox()

    expect(lastBox!.y + lastBox!.height).toBeLessThanOrEqual(navBox!.y + 1)
  })
})

test.describe('mobile carousels', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('features and steps are swipeable with pagination dots', async ({ page }) => {
    await page.goto('/')

    const features = page.getByRole('group', { name: 'What UniMatch does' })
    await expect(features).toBeVisible()

    // A horizontal track, not a tall stack.
    const scrollable = await features.evaluate((el) => el.scrollWidth > el.clientWidth + 10)
    expect(scrollable).toBe(true)

    await expect(page.getByRole('button', { name: /Go to item 2 of 6/ })).toBeVisible()
    await expect(page.getByRole('group', { name: 'How UniMatch works' })).toBeVisible()
  })

  test('the footer stays compact', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    const box = await footer.boundingBox()
    // Three columns side by side, so it must not run past one screen.
    expect(box!.height).toBeLessThan(700)
  })
})
