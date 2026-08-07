import { defineConfig, devices } from '@playwright/test'

const PORT = 4173

/**
 * Point at a deployment to smoke-test it:
 *   PLAYWRIGHT_BASE_URL=https://… npm run test:e2e
 * With no override, a local preview server is built and started.
 */
const DEPLOYED_URL = process.env.PLAYWRIGHT_BASE_URL
const BASE_URL = DEPLOYED_URL ?? `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  timeout: 30_000,

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // Most Ghanaian students will arrive on a phone, so the critical flows are
    // verified at mobile width too.
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],

  // Only spin up a local server when we aren't testing a real deployment.
  webServer: DEPLOYED_URL
    ? undefined
    : {
        command: `npm run build && npm run preview -- --port ${PORT} --strictPort`,
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
})
