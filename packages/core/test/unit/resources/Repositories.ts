import { RequestHelper } from '../../../src/infrastructure';
import { Repositories } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Repositories;

beforeEach(() => {
  service = new Repositories({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Repositorys.allContributors', () => {
  it('should request GET /projects/:id/repository/contributors', async () => {
    await service.allContributors(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/contributors',
      undefined,
    );
  });

  it('should request GET /projects/:id/repository/contributors with options', async () => {
    await service.allContributors(1, { sort: 'asc' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/contributors',
      { sort: 'asc' },
    );
  });
});

describe('Repositorys.allRepositoryTrees', () => {
  it('should request GET /projects/:id/repository/tree', async () => {
    await service.allRepositoryTrees(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/tree',
      undefined,
    );
  });
});

describe('Repositorys.compare', () => {
  it('should request GET /projects/:id/repository/compare', async () => {
    await service.compare(1, 'from', 'to');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/repository/compare', {
      from: 'from',
      to: 'to',
    });
  });
});

describe('Repositorys.editChangelog', () => {
  it('should request GET /projects/:id/repository/changelog', async () => {
    await service.editChangelog(1, '1.1.0');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/repository/changelog', {
      version: '1.1.0',
    });
  });
});

describe('Repositorys.mergeBase', () => {
  it('should request GET /projects/:id/repository/merge_base', async () => {
    await service.mergeBase(1, ['ref1', 'ref2']);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/repository/merge_base', {
      refs: ['ref1', 'ref2'],
    });
  });
});

describe('Repositorys.showArchive', () => {
  it('should request GET /projects/:id/repository/archive.:filetype with default fileType tar.gz', async () => {
    await service.showArchive(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/archive.tar.gz',
      {},
    );
  });

  it('should request GET /projects/:id/repository/archive.zip (one of the allowed filetypes)', async () => {
    await service.showArchive(1, { fileType: 'zip' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/archive.zip',
      {},
    );
  });

  it('should request GET /projects/:id/repository/archive.tar.gz with sha', async () => {
    await service.showArchive(1, { sha: 'sha1' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/archive.tar.gz',
      {
        sha: 'sha1',
      },
    );
  });
});

describe('Repositorys.showBlob', () => {
  it('should request GET /projects/:id/repository/blobs/:sha', async () => {
    await service.showBlob(1, 'sha1');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/blobs/sha1',
      undefined,
    );
  });
});

describe('Repositorys.showBlobRaw', () => {
  it('should request GET /projects/:id/repository/blobs/:sha/raw', async () => {
    await service.showBlobRaw(1, 'sha1');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/blobs/sha1/raw',
      undefined,
    );
  });
});

describe('Repositorys.showChangelog', () => {
  it('should request GET /projects/:id/repository/repository/changelog', async () => {
    await service.showChangelog(1, '1.0.0');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/repository/changelog', {
      version: '1.0.0',
    });
  });
});
