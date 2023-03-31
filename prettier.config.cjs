module.exports = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: "all",
  tabWidth: 2,
  useTabs: false,
  overrides: [
    {
      files: "*.ts",
      options: {
        parser: "babel-ts"
      }
    }
  ]
}
