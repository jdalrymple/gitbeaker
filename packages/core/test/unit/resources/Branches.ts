import { Branches } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';
import { RequesterFn } from '@gitbeaker/requester-utils';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Branches;

beforeEach(() => {
  service = new Branches({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Branches.all', () => {
  it('should request GET /projects/:id/repository/branches', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/repository/branches', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Branches.create', () => {
  it('should request POST /projects/:id/repository/branches in v4', async () => {
    await service.create(1, 'name', 'ref');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/repository/branches', {
      body: {
        branch: 'name',
        ref: 'ref',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Branches.remove', () => {
  it('should request DEL /projects/:id/repository/branches/:name', async () => {
    await service.remove(1, 'name');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/branches/name',
      undefined,
    );
  });
});

describe('Branches.show', () => {
  it('should request GET /projects/:id/repository/branches/:name', async () => {
    await service.show(1, 'name');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/branches/name',
      undefined,
    );
  });
});
