import { mergeConfig } from 'vitest/config';
import base from '../../vitest.config.base.mjs';

export default mergeConfig(base, {
  test: {
    name: 'Gitbeaker CLI',
    testTimeout: 10000,
    server: {
      deps: {
        inline: ['@gitbeaker/core'],
      },
    },
  },
});
