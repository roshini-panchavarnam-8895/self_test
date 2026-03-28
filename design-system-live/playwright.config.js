// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/* Dedicated port avoids clashing with a manually running `node scripts/design-library-server.js` on 8123. */
const PORT = Number(process.env.PLAYWRIGHT_TEST_PORT || 8124);
const HOST = process.env.PLAYWRIGHT_TEST_HOST || '127.0.0.1';
const baseURL = `http://${HOST}:${PORT}`;

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 400,
      threshold: 0.25,
      animations: 'disabled',
      scale: 'css'
    }
  },
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off'
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `node scripts/design-library-server.js`,
    url: `${baseURL}/design-library.html`,
    env: { ...process.env, PORT: String(PORT), HOST },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'pipe',
    stderr: 'pipe'
  }
});
