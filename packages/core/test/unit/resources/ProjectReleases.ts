import { ProjectReleases } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProjectReleases;

beforeEach(() => {
  service = new ProjectReleases({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('ProjectReleases.all', () => {
  it('should request GET /projects/:id/releases', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/releases', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectReleases.create', () => {
  it('should request POST /projects/:id/releases', async () => {
    await service.create(1, { prop: 1 });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/1/releases', {
      body: { prop: 1 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectReleases.edit', () => {
  it('should request PUT /projects/:id/releases', async () => {
    await service.edit(1, '2');

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'projects/1/releases/2', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectReleases.show', () => {
  it('should request GET /projects/:id/releases/:id', async () => {
    await service.show(1, '2');

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/releases/2', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectReleases.remove', () => {
  it('should request DEL /projects/:id/releases/:id', async () => {
    await service.remove(1, '2');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/releases/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
