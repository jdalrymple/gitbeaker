import { mergeConfig } from 'vitest/config';
import base from '../../vitest.config.base.mjs';

export default mergeConfig(base, {
  test: {
    name: 'Gitbeaker Requester Utils',
  },
});
