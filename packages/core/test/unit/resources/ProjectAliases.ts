import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProjectAliases } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProjectAliases;

beforeEach(() => {
  service = new ProjectAliases({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ProjectAliases.all', () => {
  it('should request GET /project_aliases', async () => {
    await service.all({ perPage: 2, maxPages: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'project_aliases', {
      maxPages: 3,
      searchParams: { perPage: 2 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectAliases.create', () => {
  it('should request POST /project_aliases', async () => {
    await service.create(1, 'alias');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'project_aliases', {
      body: { name: 'alias', projectId: 1 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectAliases.show', () => {
  it('should request GET /project_aliases/:name', async () => {
    await service.show('alias');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'project_aliases/alias', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectAliases.remove', () => {
  it('should request DELETE /project_aliases/:name', async () => {
    await service.remove('alias');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'project_aliases/alias', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
