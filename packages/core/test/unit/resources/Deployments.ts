import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Deployments } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

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

describe('Deployments.create', () => {
  it('should request POST /projects/:id/deployments', async () => {
    await service.create(1, 'production', 'abc123', 'main', false, 'running');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/deployments', {
      body: {
        environment: 'production',
        sha: 'abc123',
        ref: 'main',
        tag: false,
        status: 'running',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Deployments.edit', () => {
  it('should request PUT /projects/:id/deployments/:id', async () => {
    await service.edit(1, 2, 'success');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/deployments/2', {
      body: { status: 'success' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Deployments.remove', () => {
  it('should request DEL /projects/:id/deployments/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/deployments/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Deployments.setApproval', () => {
  it('should request POST /projects/:id/deployments/:id/approval', async () => {
    await service.setApproval(1, 2, 'approved');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/deployments/2/approval',
      {
        body: { status: 'approved' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });

  it('should include comment and representedAs in the body', async () => {
    await service.setApproval(1, 2, 'rejected', { comment: 'no', representedAs: 'group' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/1/deployments/2/approval',
      {
        body: { comment: 'no', representedAs: 'group', status: 'rejected' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});
