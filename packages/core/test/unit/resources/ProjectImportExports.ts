import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProjectImportExports } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

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
    const expectedFile = new File([content], 'test.tar.gz', { type: content.type });

    await service.import({ content, filename: 'test.tar.gz' }, 'path', { name: 'test' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/import',
      expect.objectContaining({
        body: expect.any(FormData),
        showExpanded: undefined,
        sudo: undefined,
      }),
    );

    // Verify FormData contents
    const call = (RequestHelper.post() as any).mock.calls.slice(-1)[0];
    const formData = call[2].body as FormData;
    const formDataObj = Object.fromEntries(formData.entries());
    expect(formDataObj).toEqual({
      name: 'test',
      path: 'path',
      file: expect.objectContaining({
        type: expectedFile.type,
        size: expectedFile.size,
        name: expectedFile.name,
      }),
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

describe('ProjectImportExport.importRemote', () => {
  it('should request POST /projects/remote-import', async () => {
    await service.importRemote('https://example.com/p.tar.gz', 'path', { name: 'test' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/remote-import', {
      body: { name: 'test', path: 'path', url: 'https://example.com/p.tar.gz' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectImportExport.importRemoteS3', () => {
  it('should request POST /projects/remote-import-s3', async () => {
    await service.importRemoteS3('key', 'bucket', 'file', 'path', 'us-east-1', 'secret', {
      name: 'test',
    });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/remote-import-s3', {
      body: {
        name: 'test',
        accessKeyId: 'key',
        bucketName: 'bucket',
        fileKey: 'file',
        path: 'path',
        region: 'us-east-1',
        secretAccessKey: 'secret',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ProjectImportExport.importRelation', () => {
  it('should request POST /projects/import-relation', async () => {
    const content = new Blob(['content'], { type: 'text/plain' });

    await service.importRelation({ content, filename: 'issues.ndjson' }, 'path', 'issues');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/import-relation', {
      body: expect.any(FormData),
      showExpanded: undefined,
      sudo: undefined,
    });

    const call = (RequestHelper.post() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      path: 'path',
      relation: 'issues',
      file: expect.objectContaining({ name: 'issues.ndjson', size: content.size }),
    });
  });
});

describe('ProjectImportExport.showRelationImportStatus', () => {
  it('should request GET /projects/:id/relation-imports', async () => {
    await service.showRelationImportStatus(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/relation-imports', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
