const tsPreset = require('ts-jest/jest-preset');

module.exports = {
  ...tsPreset,

  testEnvironment: 'node',
  testRegex: 'test\\/.*\\.ts$',
  testMatch: null,
  testURL: 'http://localhost/',
  testTimeout: 120000,

  coverageDirectory: 'coverage',
  collectCoverage: true,

  setupFilesAfterEnv: ['jest-extended'],

  transformIgnorePatterns: ['/node_modules/(?!(ky))'],

  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [2339],
      },
    },
  },
};
