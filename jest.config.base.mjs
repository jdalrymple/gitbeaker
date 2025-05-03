export default {
  testEnvironment: 'node',
  testRegex: 'test\\/.*\\.ts$',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageReporters: ['text', 'text-summary', ['lcov', { projectRoot: '../../' }]],
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
