import { RequesterType } from '@gitbeaker/requester-utils';

export const mockRequesterFn = () =>
  ({
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType);
