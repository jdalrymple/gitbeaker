module.exports = {
  verbose: true,
  coverageDirectory: './coverage/',
  collectCoverage: true,
  setupTestFrameworkScriptFile: 'jest-extended',
  testRegex: '(/__tests__/.*|/tests/.*|(\\.|/)(test|spec))\\.jsx?$',
  reporters: ['jest-tap-reporter'],
};
