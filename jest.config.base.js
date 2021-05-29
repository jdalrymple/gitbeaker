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

  moduleNameMapper: {
    '^ky$': require.resolve('ky').replace('index.js', 'umd.js'),
    '@gitbeaker/(.+)$': '<rootDir>packages/$1/src',
  },

  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [2339],
      },
    },
  },
};
