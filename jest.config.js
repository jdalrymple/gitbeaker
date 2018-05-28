module.exports = {
  verbose: true,
  coverageDirectory: './coverage/',
  collectCoverage: true,
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
