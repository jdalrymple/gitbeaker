import { GroupImportExports } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: GroupImportExports;

beforeEach(() => {
  service = new GroupImportExports({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('GroupImportExport.download', () => {
  it('should request GET /groups/:id/export/download', async () => {
    await service.download(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/1/export/download',
      undefined,
    );
  });

  it('should request GET /groups/:id/export/download with stream flag', async () => {
    await service.download(1, { asStream: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/export/download', {
      asStream: true,
    });
  });
});

describe('GroupImportExport.import', () => {
  it('should request POST /groups/import', async () => {
    const content = new Blob(['content'], { type: 'text/plain' });

    await service.import({ content, filename: 'test.tar.gz' }, 'path', { name: 'test' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/import', {
      isForm: true,
      file: [content, 'test.tar.gz'],
      name: 'test',
      path: 'path',
    });
  });
});

describe('GroupImportExport.scheduleExport', () => {
  it('should request POST /groups/:id/export', async () => {
    await service.scheduleExport(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/export', undefined);
  });
});
