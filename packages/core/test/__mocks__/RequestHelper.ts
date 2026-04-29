/* eslint-disable vitest/require-mock-type-parameters */
import { vi } from 'vitest';

export const RequestHelper = {
  post: vi.fn(() => vi.fn()),
  get: vi.fn(() => vi.fn()),
  put: vi.fn(() => vi.fn()),
  del: vi.fn(() => vi.fn()),
  patch: vi.fn(() => vi.fn()),
};

export default {
  RequestHelper,
};
