import { vi } from 'vitest';

const mockHelperFn = vi.fn();

export default {
  RequestHelper: {
    post: () => mockHelperFn,
    get: () => mockHelperFn,
    put: () => mockHelperFn,
    del: () => mockHelperFn,
    patch: () => mockHelperFn,
  },
};
