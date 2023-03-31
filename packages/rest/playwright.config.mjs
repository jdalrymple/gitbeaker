import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    browserName: 'chromium',
    launchOptions: {
      args: [
        '--disable-web-security',
        '--allow-file-access-from-files'
      ],
    }
  },
  testDir: './test/e2e/browser',
  testMatch: /.*.ts/,
  reporter: [
    ['line'],
    ['junit', { outputFile: './reports/browser_junit.xml' }],
  ],
});
