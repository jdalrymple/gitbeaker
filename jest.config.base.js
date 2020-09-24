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
    ky: 'ky/umd',
  },

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
};
