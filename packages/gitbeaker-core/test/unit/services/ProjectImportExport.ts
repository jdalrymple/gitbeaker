import { ProjectImportExport } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: ProjectImportExport;

beforeEach(() => {
  service = new ProjectImportExport({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating ProjectImportExport service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(ProjectImportExport);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('ProjectImportExport.download', () => {
  it('should request GET /projects/:id/export/download', async () => {
    await service.download(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/1/export/download',
      undefined,
    );
  });
});

describe('ProjectImportExport.exportStatus', () => {
  it('should request GET /projects/:id/export', async () => {
    await service.exportStatus(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/export', undefined);
  });
});

describe('ProjectImportExport.import', () => {
  it('should request POST /projects/import', async () => {
    await service.import('content', 'path');

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/import', {
      isForm: true,
      file: [
        'content',
        { filename: expect.stringContaining('.tar.gz'), contentType: 'application/octet-stream' },
      ],
      path: 'path',
    });
  });

  it('should request POST /projects/import with metadata', async () => {
    await service.import('content', 'path', { metadata: { filename: 'filename' } });

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/import', {
      isForm: true,
      file: ['content', { filename: 'filename', contentType: 'application/octet-stream' }],
      path: 'path',
    });
  });
});

describe('ProjectImportExport.importStatus', () => {
  it('should request GET /projects/:id/import', async () => {
    await service.importStatus(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/import', undefined);
  });
});

describe('ProjectImportExport.schedule', () => {
  it('should request POST /projects/:id/export', async () => {
    await service.schedule(1);

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'projects/1/export', undefined);
  });
});
