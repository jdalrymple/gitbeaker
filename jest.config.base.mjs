export default {
  rootDir: '../../',
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
    '^@gitbeaker/core/map.json': '<rootDir>/packages/core/dist/map.json',
    '^@gitbeaker/(.*)$': '<rootDir>/packages/$1/src',
  },
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
