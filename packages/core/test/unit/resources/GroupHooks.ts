import { GroupHooks } from '../../../src';
import { RequesterFn } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupHooks;

beforeEach(() => {
  service = new GroupHooks({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Instantiating GroupHooks service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(GroupHooks);
    expect(service.url).toBeDefined();
  });

  it('should call /groups prefix', () => {
    expect(service.url.includes('groups')).toBeTruthy();
  });
});

describe('GroupHooks.all', () => {
  it('should request GET /groups/:id/hooks without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/hooks', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /groups/:id/hooks with options', async () => {
    await service.all(1, { sudo: 'sudo' });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, '1/hooks', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: 'sudo',
    });
  });
});

describe('GroupHooks.add', () => {
  it('should request POST /groups/:id/hooks', async () => {
    await service.add(1, 'url');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, '1/hooks', {
      body: {
        url: 'url',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupHooks.edit', () => {
  it('should request PUT /groups/:id/hooks/:hook_id', async () => {
    await service.edit(1, 2, 'url');

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, '1/hooks/2', {
      body: { url: 'url' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupHooks.show', () => {
  it('should request GET /groups/:id/hooks/:hook_id without options', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, '1/hooks/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /groups/:id/hooks/:hook_id with options', async () => {
    await service.show(1, 2, { sudo: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/hooks/2', { sudo: 1 });
  });
});

describe('GroupHooks.remove', () => {
  it('should request DEL /groups/:id/hooks/:hook_id with options', async () => {
    await service.remove(1, 2, { sudo: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '1/hooks/2', { sudo: 1 });
  });

  it('should request DEL /groups/:id/hooks/:hook_id without options', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, '1/hooks/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
