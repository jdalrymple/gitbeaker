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

describe('PackageRegistry.publish', () => {
  it('should request PUT projects/:projectId/packages/generic/:packageName/:packageVersion/:filename', async () => {
    const content = new Blob(['content'], { type: 'text/plain' });

    await service.publish(1, 'name', 'v1.0', 'filename.txt', content);

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      `projects/1/packages/generic/name/v1.0/filename.txt`,
      {
        isForm: true,
        file: [content, 'filename.txt'],
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
