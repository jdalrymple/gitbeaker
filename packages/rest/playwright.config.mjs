import { defineConfig } from '@playwright/test';

const launchOptions = {
  args: ['--disable-web-security', '--allow-file-access-from-files'],
};

export default defineConfig({
  testMatch: /.*.ts/,
  testMatch: /.*.ts/,
  reporter: [['line'], ['junit', { outputFile: './reports/browser_junit.xml' }]],
  projects: [
    {
      name: 'e2e',
      use: {
        browserName: 'chromium',
        launchOptions,
      },
      testDir: './test/e2e/browser',
    },
    {
      name: 'integration',
      use: {
        browserName: 'chromium',
        launchOptions,
      },
      testDir: './test/integration/browser',
    },
  ],
});
