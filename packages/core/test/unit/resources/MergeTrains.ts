import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MergeTrains } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: MergeTrains;

beforeEach(() => {
  service = new MergeTrains({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('MergeTrains.all', () => {
  it('should request GET /projects/1/merge_trains', async () => {
    await service.all(1, { scope: 'active' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/merge_trains', {
      sudo: undefined,
      showExpanded: undefined,
      maxPages: undefined,
      searchParams: { scope: 'active' },
    });
  });
});

describe('MergeTrains.showStatus', () => {
  it('should request GET /projects/1/merge_trains/merge_requests/2', async () => {
    await service.showStatus(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_trains/merge_requests/2',
      {
        sudo: undefined,
        showExpanded: undefined,
      },
    );
  });
});

describe('MergeTrains.addMergeRequest', () => {
  it('should request POST /projects/1/merge_trains/merge_requests/2', async () => {
    await service.addMergeRequest(1, 2, { squash: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/merge_trains/merge_requests/2',
      {
        sudo: undefined,
        showExpanded: undefined,
        body: { squash: true },
      },
    );
  });
});

describe('MergeTrains.all with targetBranch', () => {
  it('should request GET /projects/:id/merge_trains/:branch', async () => {
    await service.all(1, { targetBranch: 'main' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/merge_trains/main', {
      sudo: undefined,
      showExpanded: undefined,
      maxPages: undefined,
      searchParams: {},
    });
  });
});
