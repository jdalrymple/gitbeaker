import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Debian } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Debian;

beforeEach(() => {
  service = new Debian({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Debian.downloadBinaryFileIndex', () => {
  it('should request GET with projectId', async () => {
    await service.downloadBinaryFileIndex('bullseye', 'main', 'amd64', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/dists/bullseye/main/binary-amd64/Packages',
      { showExpanded: undefined },
    );
  });

  it('should request with groupId', async () => {
    await service.downloadBinaryFileIndex('bullseye', 'main', 'amd64', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/2/-/dists/bullseye/main/binary-amd64/Packages',
      { showExpanded: undefined },
    );
  });

  it('should throw without projectId or groupId', () => {
    expect(() => service.downloadBinaryFileIndex('bullseye', 'main', 'amd64', {} as any)).toThrow(
      'Missing required argument',
    );
  });
});

describe('Debian.downloadDistributionReleaseFile', () => {
  it('should request GET with projectId', async () => {
    await service.downloadDistributionReleaseFile('bullseye', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/debian/dists/bullseye/Release',
      { showExpanded: undefined },
    );
  });

  it('should request with groupId', async () => {
    await service.downloadDistributionReleaseFile('bullseye', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/2/-/packages/debian/dists/bullseye/Release',
      { showExpanded: undefined },
    );
  });

  it('should throw without projectId or groupId', () => {
    expect(() => service.downloadDistributionReleaseFile('bullseye', {} as any)).toThrow(
      'Missing required argument',
    );
  });
});

describe('Debian.downloadSignedDistributionReleaseFile', () => {
  it('should request GET with projectId', async () => {
    await service.downloadSignedDistributionReleaseFile('bullseye', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/debian/dists/bullseye/InRelease',
      { showExpanded: undefined },
    );
  });

  it('should request with groupId', async () => {
    await service.downloadSignedDistributionReleaseFile('bullseye', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/2/-/packages/debian/dists/bullseye/InRelease',
      { showExpanded: undefined },
    );
  });

  it('should throw without projectId or groupId', () => {
    expect(() => service.downloadSignedDistributionReleaseFile('bullseye', {} as any)).toThrow(
      'Missing required argument',
    );
  });
});

describe('Debian.downloadReleaseFileSignature', () => {
  it('should request GET with projectId', async () => {
    await service.downloadReleaseFileSignature('bullseye', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/debian/dists/bullseye/Release.gpg',
      { showExpanded: undefined },
    );
  });

  it('should request with groupId', async () => {
    await service.downloadReleaseFileSignature('bullseye', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/2/-/packages/debian/dists/bullseye/Release.gpg',
      { showExpanded: undefined },
    );
  });

  it('should throw without projectId or groupId', () => {
    expect(() => service.downloadReleaseFileSignature('bullseye', {} as any)).toThrow(
      'Missing required argument',
    );
  });
});

describe('Debian.showDistributionKey', () => {
  it('should request GET with projectId', async () => {
    await service.showDistributionKey('bullseye', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/debian_distributions/bullseye/key.asc',
      { searchParams: {}, showExpanded: undefined },
    );
  });

  it('should request with groupId', async () => {
    await service.showDistributionKey('bullseye', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/2/-/debian_distributions/bullseye/key.asc',
      { searchParams: {}, showExpanded: undefined },
    );
  });

  it('should throw without projectId or groupId', () => {
    expect(() => service.showDistributionKey('bullseye', {} as any)).toThrow(
      'Missing required argument',
    );
  });
});

describe('Debian.downloadBinaryFileIndexByHash', () => {
  it('should request GET with projectId', async () => {
    await service.downloadBinaryFileIndexByHash('bullseye', 'main', 'amd64', 'abc', {
      projectId: 1,
    });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/dists/bullseye/main/binary-amd64/by-hash/SHA256/abc',
      { searchParams: {}, showExpanded: undefined },
    );
  });

  it('should request with groupId', async () => {
    await service.downloadBinaryFileIndexByHash('bullseye', 'main', 'amd64', 'abc', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/2/-/dists/bullseye/main/binary-amd64/by-hash/SHA256/abc',
      { searchParams: {}, showExpanded: undefined },
    );
  });

  it('should throw without projectId or groupId', () => {
    expect(() =>
      service.downloadBinaryFileIndexByHash('bullseye', 'main', 'amd64', 'abc', {} as any),
    ).toThrow('Missing required argument');
  });
});

describe('Debian.downloadDebianInstallerIndex', () => {
  it('should request GET with projectId', async () => {
    await service.downloadDebianInstallerIndex('bullseye', 'main', 'amd64', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/dists/bullseye/main/debian-installer/binary-amd64/Packages',
      { searchParams: {}, showExpanded: undefined },
    );
  });

  it('should request with groupId', async () => {
    await service.downloadDebianInstallerIndex('bullseye', 'main', 'amd64', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/2/-/dists/bullseye/main/debian-installer/binary-amd64/Packages',
      { searchParams: {}, showExpanded: undefined },
    );
  });

  it('should throw without projectId or groupId', () => {
    expect(() =>
      service.downloadDebianInstallerIndex('bullseye', 'main', 'amd64', {} as any),
    ).toThrow('Missing required argument');
  });
});

describe('Debian.downloadDebianInstallerIndexByHash', () => {
  it('should request GET with projectId', async () => {
    await service.downloadDebianInstallerIndexByHash('bullseye', 'main', 'amd64', 'abc', {
      projectId: 1,
    });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/dists/bullseye/main/debian-installer/binary-amd64/by-hash/SHA256/abc',
      { searchParams: {}, showExpanded: undefined },
    );
  });

  it('should request with groupId', async () => {
    await service.downloadDebianInstallerIndexByHash('bullseye', 'main', 'amd64', 'abc', {
      groupId: 2,
    });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/2/-/dists/bullseye/main/debian-installer/binary-amd64/by-hash/SHA256/abc',
      { searchParams: {}, showExpanded: undefined },
    );
  });

  it('should throw without projectId or groupId', () => {
    expect(() =>
      service.downloadDebianInstallerIndexByHash('bullseye', 'main', 'amd64', 'abc', {} as any),
    ).toThrow('Missing required argument');
  });
});

describe('Debian.downloadSourceIndex', () => {
  it('should request GET with projectId', async () => {
    await service.downloadSourceIndex('bullseye', 'main', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/dists/bullseye/main/source/Sources',
      { showExpanded: undefined },
    );
  });

  it('should request with groupId', async () => {
    await service.downloadSourceIndex('bullseye', 'main', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/2/-/dists/bullseye/main/source/Sources',
      { showExpanded: undefined },
    );
  });

  it('should throw without projectId or groupId', () => {
    expect(() => service.downloadSourceIndex('bullseye', 'main', {} as any)).toThrow(
      'Missing required argument',
    );
  });
});

describe('Debian.downloadSourceIndexByHash', () => {
  it('should request GET with projectId', async () => {
    await service.downloadSourceIndexByHash('bullseye', 'main', 'abc', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/dists/bullseye/main/source/by-hash/SHA256/abc',
      { showExpanded: undefined },
    );
  });

  it('should request with groupId', async () => {
    await service.downloadSourceIndexByHash('bullseye', 'main', 'abc', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/2/-/dists/bullseye/main/source/by-hash/SHA256/abc',
      { showExpanded: undefined },
    );
  });

  it('should throw without projectId or groupId', () => {
    expect(() => service.downloadSourceIndexByHash('bullseye', 'main', 'abc', {} as any)).toThrow(
      'Missing required argument',
    );
  });
});

describe('Debian.showDistribution', () => {
  it('should request GET with projectId', async () => {
    await service.showDistribution('bullseye', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/debian_distributions/bullseye',
      { searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request with groupId', async () => {
    await service.showDistribution('bullseye', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/2/-/debian_distributions/bullseye',
      { searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should throw without projectId or groupId', () => {
    expect(() => service.showDistribution('bullseye', {} as any)).toThrow(
      'Missing required argument',
    );
  });
});

describe('Debian.removeDistribution', () => {
  it('should request DELETE with projectId', async () => {
    await service.removeDistribution('bullseye', { projectId: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/debian_distributions/bullseye',
      { searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request with groupId', async () => {
    await service.removeDistribution('bullseye', { groupId: 2 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'groups/2/-/debian_distributions/bullseye',
      { searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should throw without projectId or groupId', () => {
    expect(() => service.removeDistribution('bullseye', {} as any)).toThrow(
      'Missing required argument',
    );
  });
});

describe('Debian.downloadPackageFile', () => {
  it('should request GET /projects/:id/packages/debian/pool/...', async () => {
    await service.downloadPackageFile(1, 'bullseye', 'a', 'pkg', '1.0', 'pkg.deb');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/debian/pool/bullseye/a/pkg/1.0/pkg.deb',
      { showExpanded: undefined },
    );
  });
});

describe('Debian.uploadPackageFile', () => {
  it('should request PUT /projects/:id/packages/debian/:filename with form data', async () => {
    const content = new Blob(['text'], { type: 'text/plain' });

    await service.uploadPackageFile(1, { content, filename: 'pkg.deb' });

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(
      service,
      'projects/1/packages/debian/pkg.deb',
      expect.objectContaining({ body: expect.any(FormData), showExpanded: undefined }),
    );

    const call = (RequestHelper.put() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      file: expect.objectContaining({ type: content.type, size: content.size }),
    });
  });
});

describe('Debian.allDistributions', () => {
  it('should request GET /projects/:id/debian_distributions', async () => {
    await service.allDistributions({ projectId: 1, codename: 'x' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/debian_distributions', {
      searchParams: { codename: 'x' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request with groupId', async () => {
    await service.allDistributions({ groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/2/-/debian_distributions', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should throw without projectId or groupId', () => {
    expect(() => service.allDistributions({} as any)).toThrow('Missing required argument');
  });
});

describe('Debian.createDistribution', () => {
  it('should request POST /projects/:id/debian_distributions', async () => {
    await service.createDistribution({ projectId: 1, codename: 'x' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/debian_distributions', {
      body: { codename: 'x' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request with groupId', async () => {
    await service.createDistribution({ groupId: 2, codename: 'x' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/2/-/debian_distributions', {
      body: { codename: 'x' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Debian.editDistribution', () => {
  it('should request PUT /projects/:id/debian_distributions/:codename', async () => {
    await service.editDistribution('bullseye', { projectId: 1, suite: 's' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/debian_distributions/bullseye',
      { body: { suite: 's' }, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request with groupId', async () => {
    await service.editDistribution('bullseye', { groupId: 2, suite: 's' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'groups/2/-/debian_distributions/bullseye',
      { body: { suite: 's' }, showExpanded: undefined, sudo: undefined },
    );
  });
});
