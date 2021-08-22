import { RequestHelper } from '../../../src/infrastructure';
import { PackageRegistry } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: PackageRegistry;

beforeEach(() => {
  service = new PackageRegistry({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating PackageRegistry service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(PackageRegistry);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('PackageRegistry.publish', () => {
  it('should request PUT projects/:projectId/packages/generic/:packageName/:packageVersion/:filename', async () => {
    await service.publish(1, 'name', 'v1.0', 'filename.txt', 'content');

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      `projects/1/packages/generic/name/v1.0/filename.txt`,
      {
        isForm: true,
        file: [
          'content',
          {
            contentType: 'text/plain',
            filename: 'filename.txt',
          },
        ],
      },
    );
  });
});

describe('PackageRegistry.download', () => {
  it('should request GET projects/:projectId/packages/generic/:packageName/:packageVersion/:filename', async () => {
    await service.download(1, 'name', 'v1.0', 'filename.txt');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      `projects/1/packages/generic/name/v1.0/filename.txt`,
      undefined,
    );
  });
});
