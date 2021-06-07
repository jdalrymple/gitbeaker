import { RequestHelper } from '../../../src/infrastructure';
import { Packages } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Packages;

beforeEach(() => {
  service = new Packages({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Packages service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(Packages);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
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
    expect(() => service.all()).toThrow('projectId or groupId must be passed');
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

describe('Packages.showFiles', () => {
  it('should request GET /projects/:id/packages/:id/package_files', async () => {
    await service.showFiles(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/2/package_files',
      undefined,
    );
  });
});
