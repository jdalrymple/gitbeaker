import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SearchAdmin } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: SearchAdmin;

beforeEach(() => {
  service = new SearchAdmin({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('SearchAdmin.all', () => {
  it('should request GET /admin/search/migrations', async () => {
    await service.all({ perPage: 2, maxPages: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'admin/search/migrations', {
      maxPages: 1,
      searchParams: { perPage: 2 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('SearchAdmin.show', () => {
  it('should request GET /admin/search/migrations/:versionOrName', async () => {
    await service.show('20230101');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'admin/search/migrations/20230101', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
