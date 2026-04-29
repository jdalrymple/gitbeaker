import { Deployments } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';
import { RequesterFn } from '@gitbeaker/requester-utils';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Deployments;

beforeEach(() => {
  service = new Deployments({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Deployments.all', () => {
  it('should request GET /projects/:id/deployments', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/deployments', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Deployments.show', () => {
  it('should request GET /projects/:id/deployments/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/deployments/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Deployments.allMergeRequests', () => {
  it('should request GET /projects/:id/deployments/:id/merge_requests', async () => {
    await service.allMergeRequests(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/deployments/2/merge_requests',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});
