import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173/Nepali-codec/',
    // Mobile-first app: validate at phone size.
    ...devices['Pixel 7'],
    launchOptions: { executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' },
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'mobile-chromium' }],
});
