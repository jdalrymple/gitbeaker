const puppeteerPreset = require('jest-puppeteer/jest-preset');
const base = require('../../jest.config.base');

module.exports = {
  ...puppeteerPreset,
  ...base,
  globalSetup: 'jest-environment-puppeteer/setup',
  globalTeardown: 'jest-environment-puppeteer/teardown',
  testEnvironment: 'jest-environment-puppeteer',
};
