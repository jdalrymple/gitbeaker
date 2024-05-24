import { RequestHelper } from '../../../src/infrastructure';
import { Conan } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Conan;

beforeEach(() => {
  service = new Conan({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('Conan.authenticate', () => {
  it('should request GET /packages/conan/v1/users/authenticate without projectId', async () => {
    await service.authenticate();

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/users/authenticate',
      {},
    );
  });

  it('should request GET /projects/:id/packages/conan/v1/users/authenticate', async () => {
    await service.authenticate({ projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/users/authenticate',
      {},
    );
  });
});

describe('Conan.checkCredentials', () => {
  it('should request GET /packages/conan/v1/users/check_credentials', async () => {
    await service.checkCredentials();

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/users/check_credentials',
      {},
    );
  });

  it('should request GET /projects/:id/packages/conan/v1/users/check_credentials', async () => {
    await service.checkCredentials({ projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/users/check_credentials',
      {},
    );
  });
});

describe('Conan.downloadPackageFile', () => {
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
      {},
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
      {},
    );
  });
});

describe('Conan.downloadRecipeFile', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/:recrev/export/:filename', async () => {
    await service.downloadRecipeFile('name', 'v1', 'user', 'ch', 'recrev', 'filename');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/recrev/export/filename',
      {},
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/:recrev/export/:filename', async () => {
    await service.downloadRecipeFile('name', 'v1', 'user', 'ch', 'recrev', 'filename', {
      projectId: 3,
    });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/recrev/export/filename',
      {},
    );
  });
});

describe('Conan.showPackageUploadUrls', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/packages/:pkgref/upload_urls', async () => {
    await service.showPackageUploadUrls('name', 'v1', 'user', 'ch', 'pkgref');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/packages/pkgref/upload_urls',
      {},
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/packages/:pkgref/upload_urls', async () => {
    await service.showPackageUploadUrls('name', 'v1', 'user', 'ch', 'pkgref', { projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/packages/pkgref/upload_urls',
      {},
    );
  });
});

describe('Conan.showPackageDownloadUrls', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/packages/:pkgref/download_urls', async () => {
    await service.showPackageDownloadUrls('name', 'v1', 'user', 'ch', 'pkgref');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/packages/pkgref/download_urls',
      {},
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/packages/:pkgref/download_urls', async () => {
    await service.showPackageDownloadUrls('name', 'v1', 'user', 'ch', 'pkgref', { projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/packages/pkgref/download_urls',
      {},
    );
  });
});

describe('Conan.showPackageManifest', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/packages/:pkgref/digest', async () => {
    await service.showPackageManifest('name', 'v1', 'user', 'ch', 'pkgref');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/packages/pkgref/digest',
      {},
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/packages/:pkgref/digest', async () => {
    await service.showPackageManifest('name', 'v1', 'user', 'ch', 'pkgref', { projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/packages/pkgref/digest',
      {},
    );
  });
});

describe('Conan.showPackageSnapshot', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/packages/:pkgref', async () => {
    await service.showPackageSnapshot('name', 'v1', 'user', 'ch', 'pkgref');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/packages/pkgref',
      {},
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/packages/:pkgref', async () => {
    await service.showPackageSnapshot('name', 'v1', 'user', 'ch', 'pkgref', { projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/packages/pkgref',
      {},
    );
  });
});

describe('Conan.ping', () => {
  it('should request GET /packages/conan/v1/ping', async () => {
    await service.ping();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'packages/conan/v1/ping', {});
  });

  it('should request GET /project/:id/packages/conan/v1/ping', async () => {
    await service.ping({ projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/ping',
      {},
    );
  });
});

describe('Conan.showRecipeUploadUrls', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/upload_urls', async () => {
    await service.showRecipeUploadUrls('name', 'v1', 'user', 'ch');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/upload_urls',
      {},
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/upload_urls', async () => {
    await service.showRecipeUploadUrls('name', 'v1', 'user', 'ch', { projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/upload_urls',
      {},
    );
  });
});

describe('Conan.showRecipeDownloadUrls', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/download_urls', async () => {
    await service.showRecipeDownloadUrls('name', 'v1', 'user', 'ch');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/download_urls',
      {},
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch/download_urls', async () => {
    await service.showRecipeDownloadUrls('name', 'v1', 'user', 'ch', { projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/download_urls',
      {},
    );
  });
});

describe('Conan.showRecipeManifest', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgchdigest', async () => {
    await service.showRecipeManifest('name', 'v1', 'user', 'ch');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch/digest',
      {},
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgchdigest', async () => {
    await service.showRecipeManifest('name', 'v1', 'user', 'ch', { projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch/digest',
      {},
    );
  });
});

describe('Conan.showRecipeSnapshot', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch', async () => {
    await service.showRecipeSnapshot('name', 'v1', 'user', 'ch');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch',
      {},
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch', async () => {
    await service.showRecipeSnapshot('name', 'v1', 'user', 'ch', { projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch',
      {},
    );
  });
});

describe('Conan.removePackageFile', () => {
  it('should request GET /packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch', async () => {
    await service.removePackageFile('name', 'v1', 'user', 'ch');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/name/v1/user/ch',
      {},
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/:pkgname/:pkgversion/:pkgusername/:pkgch', async () => {
    await service.removePackageFile('name', 'v1', 'user', 'ch', { projectId: 3 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/name/v1/user/ch',
      {},
    );
  });
});

describe('Conan.search', () => {
  it('should request GET /packages/conan/v1/conans/search', async () => {
    await service.search();

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/conans/search',
      {},
    );
  });

  it('should request GET /project/:id/packages/conan/v1/conans/search', async () => {
    await service.search({ projectId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/3/packages/conan/v1/conans/search',
      {},
    );
  });
});

describe('Conan.uploadPackageFile', () => {
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

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/files/name/v1/user/ch/recrev/package/pkgref/pkgrev/filename',
      {
        isForm: true,
        file: [content, 'filename'],
      },
    );
  });
});

describe('Conan.uploadRecipeFile', () => {
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

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'packages/conan/v1/files/name/v1/user/ch/recrev/export/filename',
      {
        isForm: true,
        file: [content, 'filename'],
      },
    );
  });
});
