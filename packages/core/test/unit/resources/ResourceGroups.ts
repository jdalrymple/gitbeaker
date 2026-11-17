import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ResourceGroups } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ResourceGroups;

beforeEach(() => {
  service = new ResourceGroups({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ResourceGroups.all', () => {
  it('should request GET /projects/:id/resource_groups', async () => {
    await service.all(1, { perPage: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/resource_groups', {
      maxPages: undefined,
      searchParams: { perPage: 2 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceGroups.edit', () => {
  it('should request PUT /projects/:id/resource_groups/:key', async () => {
    await service.edit(1, 'prod', { processMode: 'newest_first' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/resource_groups/prod', {
      body: { processMode: 'newest_first' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceGroups.show', () => {
  it('should request GET /projects/:id/resource_groups/:key', async () => {
    await service.show(1, 'prod');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/resource_groups/prod', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceGroups.allUpcomingJobs', () => {
  it('should request GET /projects/:id/resource_groups/:key/upcoming_jobs', async () => {
    await service.allUpcomingJobs(1, 'prod');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/resource_groups/prod/upcoming_jobs',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ResourceGroups.showCurrentJob', () => {
  it('should request GET /projects/:id/resource_groups/:key/current_job', async () => {
    await service.showCurrentJob(1, 'prod');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/resource_groups/prod/current_job',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
