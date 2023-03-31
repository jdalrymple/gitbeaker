import { ProjectImportExport } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ProjectImportExport;

beforeEach(() => {
  service = new ProjectImportExport({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('ProjectImportExport.download', () => {
  it('should request GET /projects/:id/export/download', async () => {
    await service.download(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/export/download',
      undefined,
    );
  });
});

describe('ProjectImportExport.showExportStatus', () => {
  it('should request GET /projects/:id/export', async () => {
    await service.showExportStatus(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/export', undefined);
  });
});

describe('ProjectImportExport.import', () => {
  it('should request POST /projects/import', async () => {
    const content = new Blob(['content'], { type: 'text/plain' });

    await service.import(content, 'name', 'path');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/import', {
      isForm: true,
      file: [content, expect.stringContaining('.tar.gz')],
      name: 'name',
      parentId: undefined,
      path: 'path',
    });
  });

  it('should request POST /projects/import with metadata', async () => {
    const content = new Blob(['content'], { type: 'text/plain' });

    await service.import(content, 'name', 'path', { filename: 'filename.txt' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/import', {
      isForm: true,
      file: [content, 'filename.txt'],
      name: 'name',
      parentId: undefined,
      path: 'path',
    });
  });
});

describe('ProjectImportExport.showImportStatus', () => {
  it('should request GET /projects/:id/import', async () => {
    await service.showImportStatus(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/import', undefined);
  });
});

describe('ProjectImportExport.scheduleExport', () => {
  it('should request POST /projects/:id/export', async () => {
    await service.scheduleExport(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/export', undefined);
  });
});
