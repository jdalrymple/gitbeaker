import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GroupRelationExports } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupRelationExports;

beforeEach(() => {
  service = new GroupRelationExports({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GroupRelationExports.download', () => {
  it('should request GET /groups/1/export_relations/download', async () => {
    await service.download(1, 'issues', { batched: true, batchNumber: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/1/export_relations/download',
      {
        sudo: undefined,
        showExpanded: undefined,
        searchParams: { batched: true, batchNumber: 2, relation: 'issues' },
      },
    );
  });
});

describe('GroupRelationExports.exportStatus', () => {
  it('should request GET /groups/1/export_relations/status', async () => {
    await service.exportStatus(1, { relation: 'issues' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/export_relations/status', {
      sudo: undefined,
      showExpanded: undefined,
      searchParams: { relation: 'issues' },
    });
  });
});

describe('GroupRelationExports.scheduleExport', () => {
  it('should request POST /groups/1/export_relations', async () => {
    await service.scheduleExport(1, { batched: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/export_relations', {
      sudo: undefined,
      showExpanded: undefined,
      body: { batched: true },
    });
  });
});
