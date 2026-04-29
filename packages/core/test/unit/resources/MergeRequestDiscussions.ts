import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MergeRequestDiscussions } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: MergeRequestDiscussions;

beforeEach(() => {
  service = new MergeRequestDiscussions({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Instantiating MergeRequestDiscussions service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(MergeRequestDiscussions);
    expect(service.url).toBeDefined();
  });
});

describe('MergeRequestDiscussions.resolve', () => {
  it('should resolve the merge discussion thread', async () => {
    await service.resolve(1, 2, 'id', true);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      '1/merge_requests/2/discussions/id',
      {
        searchParams: { resolved: true },
      },
    );
  });

  it('should unresolve the merge discussion thread', async () => {
    await service.resolve(1, 2, 'id', false);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      '1/merge_requests/2/discussions/id',
      {
        searchParams: { resolved: false },
      },
    );
  });
});
