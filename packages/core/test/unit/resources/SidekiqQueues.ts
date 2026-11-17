import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SidekiqQueues } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: SidekiqQueues;

beforeEach(() => {
  service = new SidekiqQueues({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('SidekiqQueues.remove', () => {
  it('should request DELETE /admin/sidekiq/queues/:name', async () => {
    await service.remove('default');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'admin/sidekiq/queues/default', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should pass filters as search params', async () => {
    await service.remove('default', { user: 'bob', workerClass: 'W', sudo: 'u' });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'admin/sidekiq/queues/default', {
      searchParams: { user: 'bob', workerClass: 'W' },
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});
