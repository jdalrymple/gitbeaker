export default {
  "**/*.{ts,js,json,md,yml}": [
    "prettier --write"
  ],
  "**/*.{ts,js}": [
    "eslint --fix"
  ]
}
