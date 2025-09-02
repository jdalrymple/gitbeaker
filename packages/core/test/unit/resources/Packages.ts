import { RequestHelper } from '../../../src/infrastructure';
import { Packages } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: Packages;

beforeEach(() => {
  service = new Packages({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('Packages.all', () => {
  it('should request GET /projects/:id/packages', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/packages', {});
  });

  it('should request GET /groups/:id/packages', async () => {
    await service.all({ groupId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/packages', {});
  });

  it('should throw an error is neither groupId or projectId is passed', () => {
    expect(() => service.all()).toThrow(
      'Missing required argument. Please supply a projectId or a groupId in the options parameter.',
    );
  });
});

describe('Packages.remove', () => {
  it('should request DEL /projects/:id/packages/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/packages/2', undefined);
  });
});

describe('Packages.removeFile', () => {
  it('should request DEL /projects/:id/packages/:id/package_files', async () => {
    await service.removeFile(1, 2, 3);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/2/package_files/3',
      undefined,
    );
  });
});

describe('Packages.show', () => {
  it('should request GET /projects/:id/packages/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/packages/2', undefined);
  });
});

describe('Packages.allFiles', () => {
  it('should request GET /projects/:id/packages/:id/package_files', async () => {
    await service.allFiles(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/2/package_files',
      undefined,
    );
  });
});
