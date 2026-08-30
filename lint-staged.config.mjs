export default {
  '**/*.{mts,mjs,ts,js,json,md,yml}': ['pnpm --workspace-root format:fix'],
  '**/*.{mts,mjs,ts,js}': ['pnpm --workspace-root lint:fix'],
};
