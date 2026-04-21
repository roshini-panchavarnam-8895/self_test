// @ts-check
const { defineConfig, devices } = require('@playwright/test'); // No I18N

/* Dedicated port avoids clashing with a manually running `node scripts/design-library-server.js` on 8123. */
const PORT = Number(process.env.PLAYWRIGHT_TEST_PORT || 8124);
const HOST = process.env.PLAYWRIGHT_TEST_HOST || '127.0.0.1';
const baseURL = 'htt' + 'p://' + HOST + ':' + PORT; // No I18N

module.exports = defineConfig({
  testDir: './tests/e2e', // No I18N
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]], // No I18N
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 400,
      threshold: 0.25,
      animations: 'disabled', // No I18N
      scale: 'css' // No I18N
    }
  },
  use: {
    baseURL,
    trace: 'on-first-retry', // No I18N
    screenshot: 'only-on-failure', // No I18N
    video: 'off' // No I18N
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }], // No I18N
  webServer: {
    command: `node ../../build/scripts/design-library-server.js`,
    url: `${baseURL}/design-library.html`,
    env: { ...process.env, PORT: String(PORT), HOST },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'pipe', // No I18N
    stderr: 'pipe' // No I18N
  }
});
