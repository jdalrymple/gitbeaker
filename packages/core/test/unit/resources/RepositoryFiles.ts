import { RequestHelper } from '../../../src/infrastructure';
import { RepositoryFiles } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: RepositoryFiles;

beforeEach(() => {
  service = new RepositoryFiles({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('RepositoryFiles.create', () => {
  it('should request POST /projects/:id/repository/files/:path', async () => {
    await service.create(1, 'path', 'main', 'content', 'message');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/repository/files/path', {
      branch: 'main',
      content: 'content',
      commitMessage: 'message',
    });
  });
});

describe('RepositoryFiles.edit', () => {
  it('should request PUT /projects/:id/repository/files/:path', async () => {
    await service.edit(1, 'path', 'main', 'content', 'message');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/repository/files/path', {
      branch: 'main',
      content: 'content',
      commitMessage: 'message',
    });
  });
});

describe('RepositoryFiles.remove', () => {
  it('should request DELETE /projects/:id/repository/files/:path', async () => {
    await service.remove(1, 'path', 'main', 'message');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/repository/files/path', {
      branch: 'main',
      commitMessage: 'message',
    });
  });
});

describe('RepositoryFiles.show', () => {
  it('should request GET /projects/:id/repository/files/:path', async () => {
    await service.show(1, 'path', 'main');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/repository/files/path', {
      ref: 'main',
    });
  });
});

describe('RepositoryFiles.allFileBlames', () => {
  it('should request GET /projects/:id/repository/files/:path/blame?ref=main', async () => {
    await service.allFileBlames(1, 'path', 'main');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/files/path/blame',
      {
        ref: 'main',
      },
    );
  });

  it('should request GET /projects/:id/repository/files/:path/blame?ref=main&range[start]=1&range[end]=2', async () => {
    await service.allFileBlames(1, 'path', 'main', { range: { start: 1, end: 2 } });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/files/path/blame',
      {
        ref: 'main',
        range: {
          start: 1,
          end: 2,
        },
      },
    );
  });
});

describe('RepositoryFiles.showRaw', () => {
  it('should request GET /projects/:id/repository/files/:path', async () => {
    await service.showRaw(1, 'path', 'main');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/files/path/raw',
      { ref: 'main' },
    );
  });
});
