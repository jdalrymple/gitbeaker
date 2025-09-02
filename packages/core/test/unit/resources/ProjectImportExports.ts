import { ProjectImportExports } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: ProjectImportExports;

beforeEach(() => {
  service = new ProjectImportExports({
    requesterFn: jest.fn(),
    token: 'abcdefg',
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

  it('should request GET /projects/:id/export/download with stream flag', async () => {
    await service.download(1, { asStream: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/export/download', {
      asStream: true,
    });
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

    await service.import({ content, filename: 'test.tar.gz' }, 'path', { name: 'test' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/import', {
      isForm: true,
      file: [content, 'test.tar.gz'],
      name: 'test',
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
    await service.scheduleExport(1, { url: 'string' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/export', {
      upload: { url: 'string' },
    });
  });
});
