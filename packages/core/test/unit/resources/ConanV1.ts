import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ConanV1 } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ConanV1;

beforeEach(() => {
  service = new ConanV1({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ConanV1.authenticate', () => {
  it('should request GET /packages/conan/v1/users/authenticate without projectId', async () => {
    await service.authenticate();

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/users/authenticate',
      { showExpanded: undefined },
    );
  });

  it('should request GET /projects/:id/packages/conan/v1/users/authenticate', async () => {
    await service.authenticate({ projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/users/authenticate',
      { showExpanded: undefined },
    );
  });
});

describe('ConanV1.checkCredentials', () => {
  it('should request GET /packages/conan/v1/users/check_credentials', async () => {
    await service.checkCredentials();

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/users/check_credentials',
      { showExpanded: undefined },
    );
  });

  it('should request GET /projects/:id/packages/conan/v1/users/check_credentials', async () => {
    await service.checkCredentials({ projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/users/check_credentials',
      { showExpanded: undefined },
    );
  });
});

describe('ConanV1.downloadPackageFile', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/:recrev/package/:ref/:pkgrev/:filename', async () => {
    await service.downloadPackageFile(
      'name',
      'v1',
      'user',
      'ch',
      'pkgref',
      'recrev',
      'pkgrev',
      'filename',
    );

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/recrev/package/pkgref/pkgrev/filename',
      { showExpanded: undefined },
    );
  });

  it('should request GET /projects/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/:recrev/package/:ref/:pkgrev/:filename', async () => {
    await service.downloadPackageFile(
      'name',
      'v1',
      'user',
      'ch',
      'pkgref',
      'recrev',
      'pkgrev',
      'filename',
      { projectId: 3 },
    );

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/recrev/package/pkgref/pkgrev/filename',
      { showExpanded: undefined },
    );
  });
});

describe('ConanV1.downloadRecipeFile', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/:recrev/export/:filename', async () => {
    await service.downloadRecipeFile('name', 'v1', 'user', 'ch', 'recrev', 'filename');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/recrev/export/filename',
      { showExpanded: undefined },
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/:recrev/export/:filename', async () => {
    await service.downloadRecipeFile('name', 'v1', 'user', 'ch', 'recrev', 'filename', {
      projectId: 3,
    });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/recrev/export/filename',
      { showExpanded: undefined },
    );
  });
});

describe('ConanV1.showPackageUploadUrls', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/packages/:pkgref/upload_urls', async () => {
    await service.showPackageUploadUrls('name', 'v1', 'user', 'ch', 'pkgref', {
      'conan_package.tgz': 1234,
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/packages/pkgref/upload_urls',
      {
        body: { 'conan_package.tgz': 1234 },
        showExpanded: undefined,
      },
    );
  });

  it('should request POST /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/packages/:pkgref/upload_urls', async () => {
    await service.showPackageUploadUrls('name', 'v1', 'user', 'ch', 'pkgref', {}, { projectId: 3 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/packages/pkgref/upload_urls',
      {
        body: {},
        showExpanded: undefined,
      },
    );
  });
});

describe('ConanV1.showPackageDownloadUrls', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/packages/:pkgref/download_urls', async () => {
    await service.showPackageDownloadUrls('name', 'v1', 'user', 'ch', 'pkgref');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/packages/pkgref/download_urls',
      { showExpanded: undefined },
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/packages/:pkgref/download_urls', async () => {
    await service.showPackageDownloadUrls('name', 'v1', 'user', 'ch', 'pkgref', { projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/packages/pkgref/download_urls',
      { showExpanded: undefined },
    );
  });
});

describe('ConanV1.showPackageManifest', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/packages/:pkgref/digest', async () => {
    await service.showPackageManifest('name', 'v1', 'user', 'ch', 'pkgref');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/packages/pkgref/digest',
      { showExpanded: undefined },
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/packages/:pkgref/digest', async () => {
    await service.showPackageManifest('name', 'v1', 'user', 'ch', 'pkgref', { projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/packages/pkgref/digest',
      { showExpanded: undefined },
    );
  });
});

describe('ConanV1.showPackageSnapshot', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/packages/:pkgref', async () => {
    await service.showPackageSnapshot('name', 'v1', 'user', 'ch', 'pkgref');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/packages/pkgref',
      { showExpanded: undefined },
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/packages/:pkgref', async () => {
    await service.showPackageSnapshot('name', 'v1', 'user', 'ch', 'pkgref', { projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/packages/pkgref',
      { showExpanded: undefined },
    );
  });
});

describe('ConanV1.ping', () => {
  it('should request GET /packages/conan/v1/ping', async () => {
    await service.ping();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'packages/conan/v1/ping', {
      showExpanded: undefined,
    });
  });

  it('should request GET /project/:id/packages/conan/v1/ping', async () => {
    await service.ping({ projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/3/packages/conan/v1/ping', {
      showExpanded: undefined,
    });
  });
});

describe('ConanV1.showRecipeUploadUrls', () => {
  it('should request POST /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/upload_urls', async () => {
    await service.showRecipeUploadUrls('name', 'v1', 'user', 'ch', { 'conanfile.py': 410 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/upload_urls',
      {
        body: { 'conanfile.py': 410 },
        showExpanded: undefined,
      },
    );
  });

  it('should request POST /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/upload_urls', async () => {
    await service.showRecipeUploadUrls('name', 'v1', 'user', 'ch', {}, { projectId: 3 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/upload_urls',
      {
        body: {},
        showExpanded: undefined,
      },
    );
  });
});

describe('ConanV1.showRecipeDownloadUrls', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/download_urls', async () => {
    await service.showRecipeDownloadUrls('name', 'v1', 'user', 'ch');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/download_urls',
      { showExpanded: undefined },
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/download_urls', async () => {
    await service.showRecipeDownloadUrls('name', 'v1', 'user', 'ch', { projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/download_urls',
      { showExpanded: undefined },
    );
  });
});

describe('ConanV1.showRecipeManifest', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgchdigest', async () => {
    await service.showRecipeManifest('name', 'v1', 'user', 'ch');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/digest',
      { showExpanded: undefined },
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgchdigest', async () => {
    await service.showRecipeManifest('name', 'v1', 'user', 'ch', { projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/digest',
      { showExpanded: undefined },
    );
  });
});

describe('ConanV1.showRecipeSnapshot', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch', async () => {
    await service.showRecipeSnapshot('name', 'v1', 'user', 'ch');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch',
      { showExpanded: undefined },
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch', async () => {
    await service.showRecipeSnapshot('name', 'v1', 'user', 'ch', { projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch',
      { showExpanded: undefined },
    );
  });
});

describe('ConanV1.removePackageFile', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch', async () => {
    await service.removePackageFile('name', 'v1', 'user', 'ch');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch',
      { showExpanded: undefined },
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch', async () => {
    await service.removePackageFile('name', 'v1', 'user', 'ch', { projectId: 3 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch',
      { showExpanded: undefined },
    );
  });
});

describe('ConanV1.search', () => {
  it('should request GET /packages/conan/v1/conans/search', async () => {
    await service.search({ q: '*' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'packages/conan/v1/conans/search', {
      searchParams: { q: '*' },
      showExpanded: undefined,
    });
  });

  it('should request GET /project/:id/packages/conan/v1/conans/search', async () => {
    await service.search({ projectId: 3, q: '*' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/search',
      {
        searchParams: { q: '*' },
        showExpanded: undefined,
      },
    );
  });
});

describe('ConanV1.uploadPackageFile', () => {
  it('should request GET /packages/conan/v1/files/:pkgname/:pkgversion/:pkgusername/:pkgch/:recrev/package/:pkgrev/:filename', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });

    await service.uploadPackageFile(
      { content, filename: 'filename' },
      'name',
      'v1',
      'user',
      'ch',
      'pkgref',
      'recrev',
      'pkgrev',
    );

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(
      service,
      'packages/conan/v1/files/name/v1/user/ch/recrev/package/pkgref/pkgrev/filename',
      expect.objectContaining({
        body: expect.any(FormData),
      }),
    );

    // Verify FormData contents
    const call = (RequestHelper.put() as any).mock.calls.slice(-1)[0];
    const formData = call[2].body as FormData;
    const formDataObj = Object.fromEntries(formData.entries());
    expect(formDataObj).toEqual({
      file: expect.objectContaining({
        type: content.type,
        size: content.size,
      }),
    });
  });
});

describe('ConanV1.uploadRecipeFile', () => {
  it('should request GET /packages/conan/v1/files/:pkgname/:pkgversion/:pkgusername/:pkgch/:recrev/export/:filename', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });

    await service.uploadRecipeFile(
      { content, filename: 'filename' },
      'name',
      'v1',
      'user',
      'ch',
      'recrev',
    );

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'packages/conan/v1/files/name/v1/user/ch/recrev/export/filename',
      expect.objectContaining({
        body: expect.any(FormData),
      }),
    );

    // Verify FormData contents
    const call = (RequestHelper.post() as any).mock.calls.slice(-1)[0];
    const formData = call[2].body as FormData;
    const formDataObj = Object.fromEntries(formData.entries());
    expect(formDataObj).toEqual({
      file: expect.objectContaining({
        type: content.type,
        size: content.size,
      }),
    });
  });
});
