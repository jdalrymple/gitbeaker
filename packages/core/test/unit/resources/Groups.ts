import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Groups } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Groups;

beforeEach(() => {
  service = new Groups({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Groups.all', () => {
  it('should request GET /groups', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Groups.create', () => {
  it('should request POST /groups', async () => {
    await service.create('test group', 'test-group');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups', {
      body: { name: 'test group', path: 'test-group' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Groups.edit', () => {
  it('should request PUT /groups', async () => {
    await service.edit(12, { name: 'test group 2' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'groups/12', {
      body: { name: 'test group 2' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Groups.allProjects', () => {
  it('should request GET /groups/:id/projects', async () => {
    await service.allProjects(12);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/12/projects', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Groups.show', () => {
  it('should request GET /groups/:id', async () => {
    await service.show(12);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/12', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Groups.remove', () => {
  it('should request DEL /groups/:id', async () => {
    await service.remove(12);

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'groups/12', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Groups.search', () => {
  it('should request GET /groups', async () => {
    await service.search('keywords');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups', {
      maxPages: undefined,
      searchParams: {
        search: 'keywords',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
