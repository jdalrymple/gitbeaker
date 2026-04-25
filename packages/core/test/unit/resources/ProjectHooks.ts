import { ProjectHooks } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProjectHooks;

beforeEach(() => {
  service = new ProjectHooks({
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

describe('Instantiating ProjectHooks service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ProjectHooks);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('projects');
  });
});

describe('ProjectHooks.all', () => {
  it('should request GET /projects/:id/hooks without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/hooks', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/hooks with options', async () => {
    await service.all(1, { perPage: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, '1/hooks', {
      maxPages: undefined,
      searchParams: { perPage: 1 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectHooks.add', () => {
  it('should request POST /projects/:id/hooks', async () => {
    await service.add(1, 'url');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, '1/hooks', {
      body: { url: 'url' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectHooks.edit', () => {
  it('should request PUT /projects/:id/hooks/:hook_id', async () => {
    await service.edit(1, 2, 'url');

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, '1/hooks/2', {
      body: { url: 'url' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectHooks.show', () => {
  it('should request GET /projects/:id/hooks/:hook_id without options', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/hooks/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/hooks/:hook_id with options', async () => {
    await service.show(1, 2, { sudo: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, '1/hooks/2', {
      showExpanded: undefined,
      sudo: 1,
    });
  });
});

describe('ProjectHooks.remove', () => {
  it('should request DEL /projects/:id/hooks/:hook_id with options', async () => {
    await service.remove(1, 2, { sudo: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '1/hooks/2', {
      showExpanded: undefined,
      sudo: 1,
    });
  });

  it('should request DEL /projects/:id/hooks/:hook_id without options', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, '1/hooks/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
