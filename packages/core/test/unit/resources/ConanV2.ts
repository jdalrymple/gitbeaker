import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ConanV2 } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ConanV2;

beforeEach(() => {
  service = new ConanV2({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

const RECIPE = ['n', '1.0', 'u', 'c'] as const;
const FILE = { content: new Blob(['text'], { type: 'text/plain' }), filename: 'f.txt' };
const OPTS = { showExpanded: undefined };

function expectFormData(verb: 'put') {
  const call = (RequestHelper[verb]() as any).mock.calls.slice(-1)[0];
  const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
  expect(formDataObj).toEqual({
    file: expect.objectContaining({ type: FILE.content.type, size: FILE.content.size }),
  });
}

describe('ConanV2.authenticate', () => {
  it('should request GET /users/authenticate', async () => {
    await service.authenticate(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/conan/v2/users/authenticate',
      OPTS,
    );
  });
});

describe('ConanV2.checkCredentials', () => {
  it('should request GET /users/check_credentials', async () => {
    await service.checkCredentials(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/conan/v2/users/check_credentials',
      OPTS,
    );
  });
});

describe('ConanV2.showLatestRecipeRevision', () => {
  it('should request GET /conans/n/1.0/u/c/latest', async () => {
    await service.showLatestRecipeRevision(1, ...RECIPE);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/conan/v2/conans/n/1.0/u/c/latest',
      OPTS,
    );
  });
});

describe('ConanV2.allRecipeRevisions', () => {
  it('should request GET /conans/n/1.0/u/c/revisions', async () => {
    await service.allRecipeRevisions(1, ...RECIPE);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/conan/v2/conans/n/1.0/u/c/revisions',
      OPTS,
    );
  });
});

describe('ConanV2.removeRecipeRevision', () => {
  it('should request DELETE /conans/n/1.0/u/c/revisions/rr', async () => {
    await service.removeRecipeRevision(1, ...RECIPE, 'rr');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/conan/v2/conans/n/1.0/u/c/revisions/rr',
      OPTS,
    );
  });
});

describe('ConanV2.allRecipeFiles', () => {
  it('should request GET /conans/n/1.0/u/c/revisions/rr/files', async () => {
    await service.allRecipeFiles(1, ...RECIPE, 'rr');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/conan/v2/conans/n/1.0/u/c/revisions/rr/files',
      OPTS,
    );
  });
});

describe('ConanV2.downloadRecipeFile', () => {
  it('should request GET /conans/n/1.0/u/c/revisions/rr/files/f.txt', async () => {
    await service.downloadRecipeFile(1, ...RECIPE, 'rr', 'f.txt');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/conan/v2/conans/n/1.0/u/c/revisions/rr/files/f.txt',
      OPTS,
    );
  });
});

describe('ConanV2.allPackageRevisions', () => {
  it('should request GET /conans/n/1.0/u/c/revisions/rr/packages/pr/revisions', async () => {
    await service.allPackageRevisions(1, ...RECIPE, 'rr', 'pr');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/conan/v2/conans/n/1.0/u/c/revisions/rr/packages/pr/revisions',
      OPTS,
    );
  });
});

describe('ConanV2.showLatestPackageRevision', () => {
  it('should request GET /conans/n/1.0/u/c/revisions/rr/packages/pr/latest', async () => {
    await service.showLatestPackageRevision(1, ...RECIPE, 'rr', 'pr');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/conan/v2/conans/n/1.0/u/c/revisions/rr/packages/pr/latest',
      OPTS,
    );
  });
});

describe('ConanV2.removePackageRevision', () => {
  it('should request DELETE /conans/n/1.0/u/c/revisions/rr/packages/pr/revisions/pv', async () => {
    await service.removePackageRevision(1, ...RECIPE, 'rr', 'pr', 'pv');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/conan/v2/conans/n/1.0/u/c/revisions/rr/packages/pr/revisions/pv',
      OPTS,
    );
  });
});

describe('ConanV2.downloadPackageFile', () => {
  it('should request GET /conans/n/1.0/u/c/revisions/rr/packages/pr/revisions/pv/files/f.txt', async () => {
    await service.downloadPackageFile(1, ...RECIPE, 'rr', 'pr', 'pv', 'f.txt');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/conan/v2/conans/n/1.0/u/c/revisions/rr/packages/pr/revisions/pv/files/f.txt',
      OPTS,
    );
  });
});

describe('ConanV2.showPackageReferencesMetadata', () => {
  it('should request GET /conans/n/1.0/u/c/search', async () => {
    await service.showPackageReferencesMetadata(1, ...RECIPE);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/conan/v2/conans/n/1.0/u/c/search',
      OPTS,
    );
  });
});

describe('ConanV2.showPackageReferencesMetadataByRevision', () => {
  it('should request GET /conans/n/1.0/u/c/revisions/rr/search', async () => {
    await service.showPackageReferencesMetadataByRevision(1, ...RECIPE, 'rr');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/conan/v2/conans/n/1.0/u/c/revisions/rr/search',
      OPTS,
    );
  });
});

describe('ConanV2.search', () => {
  it('should request GET /conans/search with q', async () => {
    await service.search(1, 'pkg*');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/conan/v2/conans/search',
      {
        searchParams: { q: 'pkg*' },
        showExpanded: undefined,
      },
    );
  });
});

describe('ConanV2.uploadRecipeFile', () => {
  it('should request PUT with form data', async () => {
    await service.uploadRecipeFile(1, ...RECIPE, 'rr', FILE);

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(
      service,
      'projects/1/packages/conan/v2/conans/n/1.0/u/c/revisions/rr/files/f.txt',
      expect.objectContaining({ body: expect.any(FormData), showExpanded: undefined }),
    );
    expectFormData('put');
  });
});

describe('ConanV2.uploadPackageFile', () => {
  it('should request PUT with form data', async () => {
    await service.uploadPackageFile(1, ...RECIPE, 'rr', 'pr', 'pv', FILE);

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(
      service,
      'projects/1/packages/conan/v2/conans/n/1.0/u/c/revisions/rr/packages/pr/revisions/pv/files/f.txt',
      expect.objectContaining({ body: expect.any(FormData), showExpanded: undefined }),
    );
    expectFormData('put');
  });
});
