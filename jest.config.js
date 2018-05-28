module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  testURL: 'http://localhost/',
  setupTestFrameworkScriptFile: 'jest-extended',
  reporters: ['jest-tap-reporter'],
  testRegex: '(/__tests__/.*|/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json"
  ]
};
