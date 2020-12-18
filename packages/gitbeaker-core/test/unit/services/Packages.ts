import { RequestHelper } from '../../../src/infrastructure';
import { Packages } from '../../../src';
import { mockRequesterFn } from '../../mocks/requesterFn';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: Packages;

beforeEach(() => {
  service = new Packages({
    requesterFn: mockRequesterFn,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Packages service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(Packages);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Packages.all', () => {
  it('should request GET /projects/:id/packages', async () => {
    await service.all(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/packages', undefined);
  });
});

describe('Packages.remove', () => {
  it('should request DEL /projects/:id/packages/:id', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del).toHaveBeenCalledWith(service, 'projects/1/packages/2', undefined);
  });
});

describe('Packages.show', () => {
  it('should request GET /projects/:id/packages/:id', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/packages/2', undefined);
  });
});

describe('Packages.showFiles', () => {
  it('should request GET /projects/:id/packages/:id/package_files', async () => {
    await service.showFiles(1, 2);

    expect(RequestHelper.get).toHaveBeenCalledWith(
      service,
      'projects/1/packages/2/package_files',
      undefined,
    );
  });
});
