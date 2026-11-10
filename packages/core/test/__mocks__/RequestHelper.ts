/* eslint-disable vitest/require-mock-type-parameters */
import { vi } from 'vitest';

const mockHelperFn = vi.fn();

type RequestHelperMock = {
  RequestHelper: Record<string, unknown>;
};

const mock: RequestHelperMock = {
  RequestHelper: {
    post: () => mockHelperFn,
    get: () => mockHelperFn,
    put: () => mockHelperFn,
    del: () => mockHelperFn,
    patch: () => mockHelperFn,
  },
};

export default mock;
