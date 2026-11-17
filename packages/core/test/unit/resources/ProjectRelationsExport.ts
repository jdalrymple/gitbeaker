import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProjectRelationsExport } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProjectRelationsExport;

beforeEach(() => {
  service = new ProjectRelationsExport({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ProjectRelationsExport.download', () => {
  it('should request GET /projects/:id/export_relations/download', async () => {
    await service.download(1, 'labels');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/export_relations/download',
      { searchParams: { relation: 'labels' }, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should include batch options', async () => {
    await service.download(1, 'labels', { batched: true, batchNumber: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/export_relations/download',
      {
        searchParams: { batched: true, batchNumber: 2, relation: 'labels' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('ProjectRelationsExport.showExportStatus', () => {
  it('should request GET /projects/:id/export_relations/status', async () => {
    await service.showExportStatus(1, { relation: 'labels' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/export_relations/status',
      { searchParams: { relation: 'labels' }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ProjectRelationsExport.scheduleExport', () => {
  it('should request POST /projects/:id/export_relations', async () => {
    await service.scheduleExport(1, { batched: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/export_relations', {
      body: { batched: true },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
