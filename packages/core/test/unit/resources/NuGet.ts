import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { NuGet } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: NuGet;

beforeEach(() => {
  service = new NuGet({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('NuGet.downloadPackageFile', () => {
  it('should request GET /projects/:id/packages/nuget/download/:name/:version/:file', async () => {
    await service.downloadPackageFile(1, 'pkg', '1.0.0', 'file.nupkg');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/nuget/download/pkg/1.0.0/file.nupkg',
      { showExpanded: undefined },
    );
  });
});

describe('NuGet.showPackageIndex', () => {
  it('should request GET /projects/:id/packages/nuget/download/:name/index', async () => {
    await service.showPackageIndex(1, 'pkg');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/nuget/download/pkg/index',
      { showExpanded: undefined },
    );
  });
});

describe('NuGet.removePackage', () => {
  it('should request DELETE /projects/:id/packages/nuget/:name/:version', async () => {
    await service.removePackage(1, 'pkg', '1.0.0');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/nuget/pkg/1.0.0',
      { showExpanded: undefined },
    );
  });
});

describe('NuGet.search', () => {
  it('should request GET /projects/:id/packages/nuget/query', async () => {
    await service.search('foo', { projectId: 1, take: 5 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/packages/nuget/query', {
      showExpanded: undefined,
      searchParams: { take: 5, q: 'foo' },
    });
  });

  it('should request GET /groups/:id/-/packages/nuget/query', async () => {
    await service.search('foo', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/2/-/packages/nuget/query', {
      showExpanded: undefined,
      searchParams: { q: 'foo' },
    });
  });

  it('should throw when neither projectId nor groupId is given', () => {
    expect(() => service.search('foo', {} as any)).toThrow(/Missing required argument/);
  });
});

describe('NuGet.showMetadata', () => {
  it('should request GET with project prefix', async () => {
    await service.showMetadata('pkg', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/nuget/metadata/pkg/index',
      {
        showExpanded: undefined,
      },
    );
  });

  it('should request GET with group prefix', async () => {
    await service.showMetadata('pkg', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/2/-/packages/nuget/metadata/pkg/index',
      {
        showExpanded: undefined,
      },
    );
  });

  it('should throw when neither projectId nor groupId is given', () => {
    expect(() => service.showMetadata('pkg', {} as any)).toThrow(/Missing required argument/);
  });
});

describe('NuGet.showServiceIndex', () => {
  it('should request GET with project prefix', async () => {
    await service.showServiceIndex({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/packages/nuget/index', {
      showExpanded: undefined,
    });
  });

  it('should request GET with group prefix', async () => {
    await service.showServiceIndex({ groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/2/-/packages/nuget/index', {
      showExpanded: undefined,
    });
  });

  it('should throw when neither projectId nor groupId is given', () => {
    expect(() => service.showServiceIndex({} as any)).toThrow(/Missing required argument/);
  });
});

describe('NuGet.showVersionMetadata', () => {
  it('should request GET with project prefix', async () => {
    await service.showVersionMetadata('pkg', '1.0.0', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/nuget/metadata/pkg/1.0.0',
      {
        showExpanded: undefined,
      },
    );
  });

  it('should request GET with group prefix', async () => {
    await service.showVersionMetadata('pkg', '1.0.0', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/2/-/packages/nuget/metadata/pkg/1.0.0',
      {
        showExpanded: undefined,
      },
    );
  });

  it('should throw when neither projectId nor groupId is given', () => {
    expect(() => service.showVersionMetadata('pkg', '1.0.0', {} as any)).toThrow(
      /Missing required argument/,
    );
  });
});

describe('NuGet.showServiceIndexV2', () => {
  it('should request GET with project prefix', async () => {
    await service.showServiceIndexV2({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/packages/nuget/v2', {
      showExpanded: undefined,
    });
  });

  it('should request GET with group prefix', async () => {
    await service.showServiceIndexV2({ groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/2/-/packages/nuget/v2', {
      showExpanded: undefined,
    });
  });

  it('should throw when neither projectId nor groupId is given', () => {
    expect(() => service.showServiceIndexV2({} as any)).toThrow(/Missing required argument/);
  });
});

describe('NuGet.showV2Metadata', () => {
  it('should request GET with project prefix', async () => {
    await service.showV2Metadata({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/nuget/v2/$metadata',
      {
        showExpanded: undefined,
      },
    );
  });

  it('should request GET with group prefix', async () => {
    await service.showV2Metadata({ groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/2/-/packages/nuget/v2/$metadata',
      {
        showExpanded: undefined,
      },
    );
  });

  it('should throw when neither projectId nor groupId is given', () => {
    expect(() => service.showV2Metadata({} as any)).toThrow(/Missing required argument/);
  });
});

describe('NuGet.uploadPackageFile', () => {
  it('should request PUT /projects/:id/packages/nuget with form data', async () => {
    const content = new Blob(['data'], { type: 'application/octet-stream' });

    await service.uploadPackageFile(1, 'pkg', '1.0.0', { content, filename: 'pkg.nupkg' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/packages/nuget', {
      showExpanded: undefined,
      body: expect.any(FormData),
    });

    const call = (RequestHelper.put() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      package_name: 'pkg',
      package_version: '1.0.0',
      file: expect.objectContaining({ size: content.size }),
    });
  });
});

describe('NuGet.uploadSymbolPackage', () => {
  it('should request PUT /projects/:id/packages/nuget/symbolpackage with form data', async () => {
    const content = new Blob(['data'], { type: 'application/octet-stream' });

    await service.uploadSymbolPackage(1, 'pkg', '1.0.0', { content, filename: 'pkg.nupkg' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/nuget/symbolpackage',
      {
        showExpanded: undefined,
        body: expect.any(FormData),
      },
    );

    const call = (RequestHelper.put() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      package_name: 'pkg',
      package_version: '1.0.0',
      file: expect.objectContaining({ size: content.size }),
    });
  });
});

describe('NuGet.uploadPackageFileV2', () => {
  it('should request PUT /projects/:id/packages/nuget/v2 with form data', async () => {
    const content = new Blob(['data'], { type: 'application/octet-stream' });

    await service.uploadPackageFileV2(1, 'pkg', '1.0.0', { content, filename: 'pkg.nupkg' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/packages/nuget/v2', {
      showExpanded: undefined,
      body: expect.any(FormData),
    });

    const call = (RequestHelper.put() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      package_name: 'pkg',
      package_version: '1.0.0',
      file: expect.objectContaining({ size: content.size }),
    });
  });
});

describe('NuGet.downloadSymbolFile', () => {
  it('should request GET symbolfiles with Symbolchecksum header (project)', async () => {
    await service.downloadSymbolFile('a.pdb', 'sig', { projectId: 1, symbolChecksum: 'sum' });

    expect((service as any).headers).not.toHaveProperty('Symbolchecksum');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      expect.objectContaining({ headers: expect.objectContaining({ Symbolchecksum: 'sum' }) }),
      'projects/1/packages/nuget/symbolfiles/a.pdb/sig/a.pdb',
      { showExpanded: undefined },
    );
  });

  it('should request GET symbolfiles with group prefix', async () => {
    await service.downloadSymbolFile('a.pdb', 'sig', { groupId: 2, symbolChecksum: 'sum' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      expect.anything(),
      'groups/2/-/packages/nuget/symbolfiles/a.pdb/sig/a.pdb',
      { showExpanded: undefined },
    );
  });

  it('should throw when neither projectId nor groupId is given', () => {
    expect(() => service.downloadSymbolFile('a', 'b', { symbolChecksum: 's' } as any)).toThrow(
      /Missing required argument/,
    );
  });
});
