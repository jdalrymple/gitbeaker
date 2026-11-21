import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Environments } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Environments;

beforeEach(() => {
  service = new Environments({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Environments.all', () => {
  it('should request GET /projects/:id/environments', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/environments', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Environments.create', () => {
  it('should request POST /projects/:id/environments', async () => {
    await service.create(1, 'name', { tier: 'production' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/environments', {
      body: {
        name: 'name',
        tier: 'production',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Environments.edit', () => {
  it('should request PUT /projects/:id/environments', async () => {
    await service.edit(1, 2);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/environments/2', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Environments.show', () => {
  it('should request GET /projects/:id/environments/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/environments/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Environments.remove', () => {
  it('should request DEL /projects/:id/environments/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/environments/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Environments.stop', () => {
  it('should request POST /projects/:id/environments/:id/stop', async () => {
    await service.stop(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/environments/2/stop', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Environments.removeReviewApps', () => {
  it('should request DEL /projects/:id/environments/review_apps', async () => {
    await service.removeReviewApps(1);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/environments/review_apps',
      { body: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should pass options in body', async () => {
    await service.removeReviewApps(1, { before: '2030-01-01', limit: 5, dryRun: false });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/environments/review_apps',
      {
        body: { before: '2030-01-01', limit: 5, dryRun: false },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('Environments.stop with options', () => {
  it('should pass force in body', async () => {
    await service.stop(1, 2, { force: 'true' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/environments/2/stop', {
      body: { force: 'true' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Environments.stopStale', () => {
  it('should request POST /projects/:id/environments/stop_stale', async () => {
    await service.stopStale(1, '2030-01-01');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/environments/stop_stale',
      { searchParams: { before: '2030-01-01' }, showExpanded: undefined, sudo: undefined },
    );
  });
});
