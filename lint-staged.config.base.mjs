export default {
  '**/*.{mts,mjs,ts,js,json,md,yml}': ['oxfmt --write'],
  '**/*.{mts,mjs,ts,js}': ['oxlint --fix'],
};
