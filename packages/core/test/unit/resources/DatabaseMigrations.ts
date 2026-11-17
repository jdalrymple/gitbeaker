import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DatabaseMigrations } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: DatabaseMigrations;

beforeEach(() => {
  service = new DatabaseMigrations({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('DatabaseMigrations.markAsSuccessful', () => {
  it('should request POST /admin/migrations/:version/mark', async () => {
    await service.markAsSuccessful(20240101, { database: 'main', sudo: 'u', showExpanded: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'admin/migrations/20240101/mark', {
      sudo: 'u',
      showExpanded: true,
      searchParams: { database: 'main' },
    });
  });

  it('should work without options', async () => {
    await service.markAsSuccessful(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'admin/migrations/1/mark', {
      sudo: undefined,
      showExpanded: undefined,
      searchParams: {},
    });
  });
});

describe('DatabaseMigrations.showPending', () => {
  it('should request GET /admin/migrations/pending', async () => {
    await service.showPending({ database: 'ci', sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'admin/migrations/pending', {
      sudo: 'u',
      showExpanded: true,
      searchParams: { database: 'ci' },
    });
  });

  it('should work without options', async () => {
    await service.showPending();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'admin/migrations/pending', {
      sudo: undefined,
      showExpanded: undefined,
      searchParams: {},
    });
  });
});
