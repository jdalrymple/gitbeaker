export default {
  testEnvironment: 'node',
  testRegex: 'test\\/.*\\.ts$',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'text-summary', 'cobertura'],
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'reports', outputName: 'nodejs_junit.xml' }],
  ],
  moduleNameMapper: {
    '^@gitbeaker/(.*)$': '<rootDir>/../$1/src',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!chalk).+\\.js$', // Needed for chalkv5
  ],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  setupFilesAfterEnv: ['jest-extended/all'],
};
