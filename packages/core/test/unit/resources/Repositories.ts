import { Repositories } from '../../../src';
import { RequesterFn } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Repositories;

beforeEach(() => {
  service = new Repositories({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Repositorys.allContributors', () => {
  it('should request GET /projects/:id/repository/contributors', async () => {
    await service.allContributors(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/contributors',
      { searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request GET /projects/:id/repository/contributors with options', async () => {
    await service.allContributors(1, { sort: 'asc' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/contributors',
      { searchParams: { sort: 'asc' }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('Repositorys.allRepositoryTrees', () => {
  it('should request GET /projects/:id/repository/tree', async () => {
    await service.allRepositoryTrees(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/repository/tree', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Repositorys.compare', () => {
  it('should request GET /projects/:id/repository/compare', async () => {
    await service.compare(1, 'from', 'to');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/repository/compare', {
      searchParams: { from: 'from', to: 'to' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Repositorys.editChangelog', () => {
  it('should request GET /projects/:id/repository/changelog', async () => {
    await service.editChangelog(1, '1.1.0');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/repository/changelog', {
      body: { version: '1.1.0' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Repositorys.mergeBase', () => {
  it('should request GET /projects/:id/repository/merge_base', async () => {
    await service.mergeBase(1, ['ref1', 'ref2']);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/repository/merge_base', {
      searchParams: { refs: ['ref1', 'ref2'] },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Repositorys.showArchive', () => {
  it('should request GET /projects/:id/repository/archive.:filetype with default fileType tar.gz', async () => {
    await service.showArchive(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/archive.tar.gz',
      { searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request GET /projects/:id/repository/archive.zip (one of the allowed filetypes)', async () => {
    await service.showArchive(1, { fileType: 'zip' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/repository/archive.zip', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/repository/archive.tar.gz with sha', async () => {
    await service.showArchive(1, { sha: 'sha1' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/archive.tar.gz',
      {
        searchParams: { sha: 'sha1' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('Repositorys.showBlob', () => {
  it('should request GET /projects/:id/repository/blobs/:sha', async () => {
    await service.showBlob(1, 'sha1');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/repository/blobs/sha1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Repositorys.showBlobRaw', () => {
  it('should request GET /projects/:id/repository/blobs/:sha/raw', async () => {
    await service.showBlobRaw(1, 'sha1');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/repository/blobs/sha1/raw',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('Repositorys.showChangelog', () => {
  it('should request GET /projects/:id/repository/repository/changelog', async () => {
    await service.showChangelog(1, '1.0.0');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/repository/changelog', {
      searchParams: { version: '1.0.0' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
