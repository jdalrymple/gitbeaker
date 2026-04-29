import { ProjectImportExports } from '../../../src';
import { RequesterFn } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProjectImportExports;

beforeEach(() => {
  service = new ProjectImportExports({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ProjectImportExport.download', () => {
  it('should request GET /projects/:id/export/download', async () => {
    await service.download(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/export/download', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/export/download with stream flag', async () => {
    await service.download(1, { asStream: true });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/export/download', {
      searchParams: { asStream: true },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectImportExport.showExportStatus', () => {
  it('should request GET /projects/:id/export', async () => {
    await service.showExportStatus(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/export', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectImportExport.import', () => {
  it('should request POST /projects/import', async () => {
    const content = new Blob(['content'], { type: 'text/plain' });

    await service.import({ content, filename: 'test.tar.gz' }, 'path', { name: 'test' });

    const expectedFormData = new FormData();
    expectedFormData.append('name', 'test');
    expectedFormData.append('file', new File([content], 'test.tar.gz', { type: content.type }));
    expectedFormData.append('path', 'path');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/import', {
      body: expectedFormData,
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectImportExport.showImportStatus', () => {
  it('should request GET /projects/:id/import', async () => {
    await service.showImportStatus(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/import', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectImportExport.scheduleExport', () => {
  it('should request POST /projects/:id/export', async () => {
    await service.scheduleExport(1, { url: 'string' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/export', {
      body: { upload: { url: 'string' } },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
