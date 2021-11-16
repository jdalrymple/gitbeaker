const { jsWithTs: tsjPreset } = require('ts-jest/presets');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  ...tsjPreset,

  testEnvironment: 'node',
  testRegex: 'test\\/.*\\.ts$',
  testMatch: null,
  testURL: 'http://localhost/',
  testTimeout: 120000,

  coverageDirectory: 'coverage',
  collectCoverage: true,

  setupFilesAfterEnv: ['jest-extended/all'],

  transformIgnorePatterns: ['node_modules/(?!(ky))'],

  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/../../' }),
  },
};
