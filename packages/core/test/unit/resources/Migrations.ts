import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Migrations } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Migrations;

beforeEach(() => {
  service = new Migrations({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Migrations.all', () => {
  it('should request GET /bulk_imports', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'bulk_imports', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should pass status as a search param', async () => {
    await service.all({ status: 'failed', maxPages: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'bulk_imports', {
      maxPages: 1,
      searchParams: { status: 'failed' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Migrations.create', () => {
  it('should request POST /bulk_imports', async () => {
    const configuration = { url: 'https://gl', access_token: 'tok' };
    const entities = [
      {
        sourceType: 'group_entity',
        sourceFullPath: 'a',
        destinationSlug: 'b',
        destinationNamespace: 'c',
      },
    ];

    await service.create(configuration, entities, { sudo: 'u' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'bulk_imports', {
      body: { configuration, entities },
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});

describe('Migrations.allEntities', () => {
  it('should request GET /bulk_imports/entities without arguments', async () => {
    await service.allEntities();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'bulk_imports/entities', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /bulk_imports/:id/entities with bulkImportId', async () => {
    await service.allEntities({ bulkImportId: 4, status: 'started', maxPages: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'bulk_imports/4/entities', {
      maxPages: 2,
      searchParams: { status: 'started' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Migrations.show', () => {
  it('should request GET /bulk_imports/:id', async () => {
    await service.show(4);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'bulk_imports/4', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Migrations.showEntity', () => {
  it('should request GET /bulk_imports/:id/entities/:entityId', async () => {
    await service.showEntity(4, 5);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'bulk_imports/4/entities/5', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
