module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  testURL: 'http://localhost/',
  setupTestFrameworkScriptFile: 'jest-extended',
  testRegex: '(/__tests__/.*|/tests/.*|(\\.|/)(test|spec))\\.jsx?$',
  reporters: ['jest-tap-reporter'],
};
