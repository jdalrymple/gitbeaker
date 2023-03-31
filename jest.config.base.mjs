export default {
  testEnvironment: 'node',
  testRegex: 'test\\/.*\\.ts$',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  reporters: ['default', ['jest-junit', { outputFile: 'reports/nodejs_junit.xml' }]],
  moduleNameMapper: {
    "@gitbeaker/core/map.json": '<rootDir>/../core/dist/map.json',
    '^@gitbeaker/(.*)$': '<rootDir>/../$1/src'
  },
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  setupFilesAfterEnv: ['jest-extended/all'],
};
