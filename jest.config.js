module.exports = {
  preset: 'ts-jest',

  testEnvironment: 'node',
  testRegex: 'test\\/.*\\.ts$',
  testMatch: null,
  testURL: 'http://localhost/',
  testTimeout: 15000,

  coverageDirectory: 'coverage',
  collectCoverage: true,

  setupFilesAfterEnv: ['jest-extended'],

  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [2339],
      },
    },
  },
};
