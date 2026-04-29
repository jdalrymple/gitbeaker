import { Runners } from '../../../src';
import { RequesterFn } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Runners;

beforeEach(() => {
  service = new Runners({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Runners.all', () => {
  it('should request GET /runners/all', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'runners/all', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/runners', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/runners', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /groups/:id/runners', async () => {
    await service.all({ groupId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'groups/1/runners', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /runners', async () => {
    await service.all({ owned: true });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'runners', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Runners.edit', () => {
  it('should request PUT /runners/:id', async () => {
    await service.edit(2);

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'runners/2', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Runners.enable', () => {
  it('should request POST /projects/:id/runners', async () => {
    await service.enable(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/runners', {
      body: {
        runnerId: 2,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Runners.disable', () => {
  it('should request DELETE /projects/:id/runners/:id', async () => {
    await service.disable(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/runners/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Runners.allJobs', () => {
  it('should request GET /runners/:id/jobs', async () => {
    await service.allJobs(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'runners/1/jobs', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Runners.remove', () => {
  it('should request DEL /runners/:id', async () => {
    await service.remove({ runnerId: 2 });

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'runners/2', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request DEL /runners with token', async () => {
    await service.remove({ token: 'token' });

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'runners', {
      searchParams: { token: 'token' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Runners.show', () => {
  it('should request GET /runners/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'runners/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
