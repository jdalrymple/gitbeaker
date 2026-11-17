import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DataManagement } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: DataManagement;

beforeEach(() => {
  service = new DataManagement({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('DataManagement.allRecords', () => {
  it('should request GET /admin/data_management/:model without options', async () => {
    await service.allRecords('projects');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'admin/data_management/projects', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should pass options as search params', async () => {
    await service.allRecords('uploads', {
      checksumState: 'failed',
      identifiers: [1, 'a'],
      sort: 'asc',
      maxPages: 2,
      sudo: 'u',
    });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'admin/data_management/uploads', {
      maxPages: 2,
      searchParams: { checksumState: 'failed', identifiers: [1, 'a'], sort: 'asc' },
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});

describe('DataManagement.recalculateChecksums', () => {
  it('should request PUT /admin/data_management/:model/checksum', async () => {
    await service.recalculateChecksums('lfs_objects');

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'admin/data_management/lfs_objects/checksum',
      { body: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should pass body options', async () => {
    await service.recalculateChecksums('lfs_objects', {
      checksumState: 'pending',
      identifiers: [1, 2],
      showExpanded: true,
    });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'admin/data_management/lfs_objects/checksum',
      {
        body: { checksumState: 'pending', identifiers: [1, 2] },
        showExpanded: true,
        sudo: undefined,
      },
    );
  });
});

describe('DataManagement.showRecord', () => {
  it('should request GET /admin/data_management/:model/:id', async () => {
    await service.showRecord('projects', 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'admin/data_management/projects/3', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should encode string identifiers', async () => {
    await service.showRecord('projects', 'a/b');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'admin/data_management/projects/a%2Fb',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('DataManagement.recalculateRecordChecksum', () => {
  it('should request PUT /admin/data_management/:model/:id/checksum', async () => {
    await service.recalculateRecordChecksum('projects', 3, { sudo: 'u' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'admin/data_management/projects/3/checksum',
      { showExpanded: undefined, sudo: 'u' },
    );
  });
});
