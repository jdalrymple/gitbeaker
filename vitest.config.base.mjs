import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/test/**/*.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    globals: false,
    coverage: {
      enabled: true,
      reporter: ['lcov', 'text', 'text-summary', 'cobertura'],
      reportsDirectory: 'coverage',
    },
    setupFiles: [new URL('./vitest.setup.ts', import.meta.url).pathname],
  },
  resolve: {
    alias: {
      '@gitbeaker/core': new URL('../core/src', import.meta.url).pathname,
      '@gitbeaker/rest': new URL('../rest/src', import.meta.url).pathname,
      '@gitbeaker/cli': new URL('../cli/src', import.meta.url).pathname,
      '@gitbeaker/requester-utils': new URL('../requester-utils/src', import.meta.url).pathname,
    },
  },
});
