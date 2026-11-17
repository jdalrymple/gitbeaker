import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BulkImports } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: BulkImports;

beforeEach(() => {
  service = new BulkImports({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('BulkImports.create', () => {
  it('should request POST /bulk_imports', async () => {
    await service.create({ url: 'u', accessToken: 't' }, [
      {
        sourceType: 'group_entity',
        sourceFullPath: 'a',
        destinationSlug: 'b',
        destinationNamespace: 'c',
      },
    ]);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'bulk_imports', {
      sudo: undefined,
      showExpanded: undefined,
      body: {
        configuration: { url: 'u', accessToken: 't' },
        entities: [
          {
            sourceType: 'group_entity',
            sourceFullPath: 'a',
            destinationSlug: 'b',
            destinationNamespace: 'c',
          },
        ],
      },
    });
  });
});

describe('BulkImports.all', () => {
  it('should request GET /bulk_imports', async () => {
    await service.all({ status: 'started' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'bulk_imports', {
      sudo: undefined,
      showExpanded: undefined,
      maxPages: undefined,
      searchParams: { status: 'started' },
    });
  });
});

describe('BulkImports.allEntities', () => {
  it('should request GET /bulk_imports/entities', async () => {
    await service.allEntities({ status: 'failed' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'bulk_imports/entities', {
      sudo: undefined,
      showExpanded: undefined,
      maxPages: undefined,
      searchParams: { status: 'failed' },
    });
  });
});

describe('BulkImports.show', () => {
  it('should request GET /bulk_imports/1', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'bulk_imports/1', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('BulkImports.showEntity', () => {
  it('should request GET /bulk_imports/1/entities/2', async () => {
    await service.showEntity(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'bulk_imports/1/entities/2', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('BulkImports.showEntityFailures', () => {
  it('should request GET /bulk_imports/1/entities/2/failures', async () => {
    await service.showEntityFailures(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'bulk_imports/1/entities/2/failures',
      {
        sudo: undefined,
        showExpanded: undefined,
      },
    );
  });
});

describe('BulkImports.cancel', () => {
  it('should request POST /bulk_imports/1/cancel', async () => {
    await service.cancel(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'bulk_imports/1/cancel', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('BulkImports.allEntities with bulkImportId', () => {
  it('should request GET /bulk_imports/:id/entities', async () => {
    await service.allEntities({ bulkImportId: 4 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'bulk_imports/4/entities', {
      sudo: undefined,
      showExpanded: undefined,
      maxPages: undefined,
      searchParams: {},
    });
  });
});
