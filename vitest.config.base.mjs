import { defineConfig } from 'vitest/config';

export default defineConfig({
  projects: ['packages/*'],
  test: {
    environment: 'node',
    include: ['**/test/**/*.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    globals: false,
    // The JUnit report is uploaded to Codecov's test analytics in CI
    reporters: ['default', ['junit', { outputFile: 'reports/junit.xml' }]],
    coverage: {
      enabled: true,
      reporter: ['lcov', 'text', 'text-summary', 'cobertura'],
      reportsDirectory: 'coverage',
    },
  },
  resolve: {
    alias: [
      {
        find: /^@gitbeaker\/(.*)$/,
        replacement: new URL('./packages/$1/src', import.meta.url).pathname,
      },
    ],
  },
});
