import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MergeRequestContextCommits } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: MergeRequestContextCommits;

beforeEach(() => {
  service = new MergeRequestContextCommits({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('MergeRequestContextCommits.all', () => {
  it('should request GET /projects/:id/merge_requests/:iid/context_commits', async () => {
    await service.all(1, 2, { perPage: 4 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/context_commits',
      {
        maxPages: undefined,
        searchParams: { perPage: 4 },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('MergeRequestContextCommits.create', () => {
  it('should request POST /projects/:id/merge_requests/:iid/context_commits', async () => {
    await service.create(1, ['abc', 'def'], 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/context_commits',
      { body: { commits: ['abc', 'def'] }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('MergeRequestContextCommits.remove', () => {
  it('should request DELETE /projects/:id/merge_requests/:iid/context_commits', async () => {
    await service.remove(1, 2, ['abc']);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_requests/2/context_commits',
      { body: { commits: ['abc'] }, showExpanded: undefined, sudo: undefined },
    );
  });
});
