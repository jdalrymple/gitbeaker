export default {
  '**/*.{ts,js,json,md,yml}': ['pnpm --workspace-root format:fix'],
  '**/*.{ts,js}': ['pnpm --workspace-root lint:fix'],
};
