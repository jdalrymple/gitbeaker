import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GroupReleases } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupReleases;

beforeEach(() => {
  service = new GroupReleases({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GroupReleases.all', () => {
  it('should request GET /groups/1/releases', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/releases', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /groups/1/releases with options', async () => {
    await service.all(1, { simple: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/releases', {
      maxPages: undefined,
      searchParams: { simple: true },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
