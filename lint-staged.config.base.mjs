export default {
  '**/*.{ts,js,json,md,yml}': ['yarn format:fix'],
  '**/*.{ts,js}': ['yarn lint:fix'],
};
