export default {
  '**/*.{ts,js,json,md,yml}': ['pnpm --filter=gitbeaker format:fix'],
  '**/*.{ts,js}': ['pnpm --filter=gitbeaker lint:fix'],
};
