import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  workers: 1,
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: 'https://demo5.cybersoft.edu.vn',
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15000,               // timeout cho mỗi action (click, fill...)
    navigationTimeout: 30000,           // timeout cho page.goto / waitForURL
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',      // chụp ảnh khi test fail
    video: 'on-first-retry',            // quay video khi retry
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})