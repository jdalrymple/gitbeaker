const { defaults: tsPreset } = require('ts-jest/presets');

module.exports = {
  ...tsPreset,

  testEnvironment: 'node',
  testRegex: 'test\\/.*\\.ts$',
  testMatch: null,
  testURL: 'http://localhost/',
  testTimeout: 15000,

  coverageDirectory: 'coverage',
  collectCoverage: true,

  setupFilesAfterEnv: ['jest-extended'],

  moduleNameMapper: {
    '^ky$': require.resolve('ky').replace('index.js', 'umd.js'),
  },

  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [2339],
      },
    },
  },
};
