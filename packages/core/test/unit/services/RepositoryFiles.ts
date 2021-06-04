import { RequestHelper } from '../../../src/infrastructure';
import { RepositoryFiles } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: RepositoryFiles;

beforeEach(() => {
  service = new RepositoryFiles({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating RepositoryFiles service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(RepositoryFiles);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('RepositoryFiles.create', () => {
  it('should request POST /projects/:id/repository/files/:path', async () => {
    await service.create(1, 'path', 'master', 'content', 'message');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/repository/files/path', {
      branch: 'master',
      content: 'content',
      commitMessage: 'message',
    });
  });
});

describe('RepositoryFiles.edit', () => {
  it('should request PUT /projects/:id/repository/files/:path', async () => {
    await service.edit(1, 'path', 'master', 'content', 'message');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/repository/files/path', {
      branch: 'master',
      content: 'content',
      commitMessage: 'message',
    });
  });
});

describe('RepositoryFiles.remove', () => {
  it('should request DELETE /projects/:id/repository/files/:path', async () => {
    await service.remove(1, 'path', 'master', 'message');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/repository/files/path', {
      branch: 'master',
      commitMessage: 'message',
    });
  });
});

describe('RepositoryFiles.show', () => {
  it('should request GET /projects/:id/repository/files/:path', async () => {
    await service.show(1, 'path', 'master');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/repository/files/path', {
      ref: 'master',
    });
  });
});

describe('RepositoryFiles.showBlame', () => {
  it('should request GET /projects/:id/repository/files/:path', async () => {
    await service.showBlame(1, 'path');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/files/path/blame',
      undefined,
    );
  });
});

describe('RepositoryFiles.showRaw', () => {
  it('should request GET /projects/:id/repository/files/:path', async () => {
    await service.showRaw(1, 'path', 'ref');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/files/path/raw',
      { ref: 'ref' },
    );
  });
});
