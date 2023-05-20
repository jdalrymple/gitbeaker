import { RequestHelper } from '../../../src/infrastructure';
import { PyPI } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: PyPI;

beforeEach(() => {
  service = new PyPI({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('PyPI.downloadPackageFile', () => {
  it('should request GET /projects/1/packages/pypi/files/:sha/:fileIdentifier', async () => {
    await service.downloadPackageFile('sha', 'id', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/pypi/files/sha/id',
      {},
    );
  });

  it('should request GET /groups/1/packages/pypi/files/:sha/:fileIdentifier', async () => {
    await service.downloadPackageFile('sha', 'id', { groupId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/1/packages/pypi/files/sha/id',
      {},
    );
  });

  it('should throw an error if groupId or projectId is not passed', () => {
    /* eslint-disable-next-line */
    expect(() => service.downloadPackageFile('sha', 'id', {} as any)).toThrow();
  });
});

describe('PyPI.showPackageDescriptor', () => {
  it('should request GET /projects/1/packages/pypi/simple/:name', async () => {
    await service.showPackageDescriptor('name', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/pypi/simple/name',
      {},
    );
  });

  it('should request GET /groups/1/packages/pypi/simple/:name', async () => {
    await service.showPackageDescriptor('name', { groupId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/1/packages/pypi/simple/name',
      {},
    );
  });

  it('should throw an error if groupId or projectId is not passed', () => {
    /* eslint-disable-next-line */
    expect(() => service.showPackageDescriptor('name', {} as any)).toThrow();
  });
});

describe('PyPI.uploadPackageFile', () => {
  it('should request POST /projects/1/packages/pypi', async () => {
    const content = new Blob(['text'], { type: 'text/plain' });
    const file = { content, filename: 'pkg.txt' };

    await service.uploadPackageFile(1, file);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/packages/pypi', {
      isForm: true,
      file: [file.content, file.filename],
    });
  });
});
