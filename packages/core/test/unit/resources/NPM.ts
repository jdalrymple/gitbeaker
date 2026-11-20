import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { NPM } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: NPM;

beforeEach(() => {
  service = new NPM({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('NPM.downloadPackageFile', () => {
  it('should request GET with encoded package name', async () => {
    await service.downloadPackageFile(1, '@scope/pkg', 'pkg-1.0.0.tgz');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/npm/%40scope%2Fpkg/-/pkg-1.0.0.tgz',
      { showExpanded: undefined },
    );
  });
});

describe('NPM.removeDistTag', () => {
  it('should request DELETE without a prefix id', async () => {
    await service.removeDistTag('pkg', 'latest');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'packages/npm/-/package/pkg/dist-tags/latest',
      { showExpanded: undefined },
    );
  });

  it('should request DELETE with projectId', async () => {
    await service.removeDistTag('pkg', 'latest', { projectId: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/npm/-/package/pkg/dist-tags/latest',
      { showExpanded: undefined },
    );
  });

  it('should request DELETE with groupId', async () => {
    await service.removeDistTag('pkg', 'latest', { groupId: 2 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'groups/2/-/packages/npm/-/package/pkg/dist-tags/latest',
      { showExpanded: undefined },
    );
  });
});

describe('NPM.setDistTag', () => {
  it('should request PUT without a prefix id', async () => {
    await service.setDistTag('pkg', 'beta');

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'packages/npm/-/package/pkg/dist-tags/beta',
      { showExpanded: undefined },
    );
  });

  it('should request PUT with projectId', async () => {
    await service.setDistTag('pkg', 'beta', { projectId: 1 });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/npm/-/package/pkg/dist-tags/beta',
      { showExpanded: undefined },
    );
  });

  it('should request PUT with groupId', async () => {
    await service.setDistTag('pkg', 'beta', { groupId: 2 });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'groups/2/-/packages/npm/-/package/pkg/dist-tags/beta',
      { showExpanded: undefined },
    );
  });
});

describe('NPM.showDistTags', () => {
  it('should request GET without a prefix id', async () => {
    await service.showDistTags('pkg');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'packages/npm/-/package/pkg/dist-tags',
      { showExpanded: undefined },
    );
  });

  it('should request GET with projectId', async () => {
    await service.showDistTags('pkg', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/packages/npm/-/package/pkg/dist-tags',
      { showExpanded: undefined },
    );
  });

  it('should request GET with groupId', async () => {
    await service.showDistTags('pkg', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/2/-/packages/npm/-/package/pkg/dist-tags',
      { showExpanded: undefined },
    );
  });
});

describe('NPM.showMetadata', () => {
  it('should request GET without a prefix id', async () => {
    await service.showMetadata('pkg');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'packages/npm/pkg', {
      showExpanded: undefined,
    });
  });

  it('should request GET with projectId', async () => {
    await service.showMetadata('pkg', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/packages/npm/pkg', {
      showExpanded: undefined,
    });
  });

  it('should request GET with groupId', async () => {
    await service.showMetadata('pkg', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/2/-/packages/npm/pkg', {
      showExpanded: undefined,
    });
  });
});

describe('NPM.uploadPackageFile', () => {
  it('should request PUT /projects/:id/packages/npm/:name', async () => {
    await service.uploadPackageFile(1, 'pkg', '1.0.0', { name: 'pkg' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/packages/npm/pkg', {
      body: { name: 'pkg', versions: '1.0.0' },
      showExpanded: undefined,
    });
  });
});
