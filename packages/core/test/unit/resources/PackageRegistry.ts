import { RequestHelper } from '../../../src/infrastructure';
import { PackageRegistry } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: PackageRegistry;

beforeEach(() => {
  service = new PackageRegistry({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('PackageRegistry.publish', () => {
  it('should request PUT projects/:projectId/packages/generic/:packageName/:packageVersion/:filename', async () => {
    const content = new Blob(['content'], { type: 'text/plain' });

    await service.publish(1, 'name', 'v1.0', { content, filename: 'filename.txt' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      `projects/1/packages/generic/name/v1.0/filename.txt`,
      {
        body: content,
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('PackageRegistry.download', () => {
  it('should request GET projects/:projectId/packages/generic/:packageName/:packageVersion/:filename', async () => {
    await service.download(1, 'name', 'v1.0', 'filename.txt');

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(
      service,
      `projects/1/packages/generic/name/v1.0/filename.txt`,
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
