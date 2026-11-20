import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ContainerVirtualRegistry } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ContainerVirtualRegistry;

beforeEach(() => {
  service = new ContainerVirtualRegistry({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ContainerVirtualRegistry.all', () => {
  it('should request GET /groups/1/-/virtual_registries/container/registries', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/1/-/virtual_registries/container/registries',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request GET /groups/1/-/virtual_registries/container/registries with options', async () => {
    await service.all(1, { perPage: 5, maxPages: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/1/-/virtual_registries/container/registries',
      { maxPages: 2, searchParams: { perPage: 5 }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerVirtualRegistry.create', () => {
  it('should request POST /groups/1/-/virtual_registries/container/registries', async () => {
    await service.create(1, 'reg');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'groups/1/-/virtual_registries/container/registries',
      { body: { name: 'reg' }, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request POST /groups/1/-/virtual_registries/container/registries with options', async () => {
    await service.create(1, 'reg', { description: 'd' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'groups/1/-/virtual_registries/container/registries',
      { body: { description: 'd', name: 'reg' }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerVirtualRegistry.show', () => {
  it('should request GET /virtual_registries/container/registries/2', async () => {
    await service.show(2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/registries/2',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerVirtualRegistry.edit', () => {
  it('should request PATCH /virtual_registries/container/registries/2', async () => {
    await service.edit(2);

    expect(RequestHelper.patch()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/registries/2',
      { body: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request PATCH /virtual_registries/container/registries/2 with options', async () => {
    await service.edit(2, { name: 'n', description: 'd' });

    expect(RequestHelper.patch()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/registries/2',
      { body: { name: 'n', description: 'd' }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerVirtualRegistry.remove', () => {
  it('should request DEL /virtual_registries/container/registries/2', async () => {
    await service.remove(2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/registries/2',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerVirtualRegistry.clearCache', () => {
  it('should request DEL /virtual_registries/container/registries/2/cache', async () => {
    await service.clearCache(2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/registries/2/cache',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerVirtualRegistry.allUpstreams', () => {
  it('should request GET /groups/1/-/virtual_registries/container/upstreams', async () => {
    await service.allUpstreams(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/1/-/virtual_registries/container/upstreams',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request GET /groups/1/-/virtual_registries/container/upstreams with options', async () => {
    await service.allUpstreams(1, { upstreamName: 'x' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/1/-/virtual_registries/container/upstreams',
      {
        maxPages: undefined,
        searchParams: { upstreamName: 'x' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('ContainerVirtualRegistry.testUpstreamConnection', () => {
  it('should request POST /groups/1/-/virtual_registries/container/upstreams/test', async () => {
    await service.testUpstreamConnection(1, 'http://u');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'groups/1/-/virtual_registries/container/upstreams/test',
      { body: { url: 'http://u' }, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request POST /groups/1/-/virtual_registries/container/upstreams/test with options', async () => {
    await service.testUpstreamConnection(1, 'http://u', { username: 'a', password: 'b' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'groups/1/-/virtual_registries/container/upstreams/test',
      {
        body: { username: 'a', password: 'b', url: 'http://u' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('ContainerVirtualRegistry.allRegistryUpstreams', () => {
  it('should request GET /virtual_registries/container/registries/2/upstreams', async () => {
    await service.allRegistryUpstreams(2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/registries/2/upstreams',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerVirtualRegistry.createUpstream', () => {
  it('should request POST /virtual_registries/container/registries/2/upstreams', async () => {
    await service.createUpstream(2, 'http://u', 'up');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/registries/2/upstreams',
      { body: { url: 'http://u', name: 'up' }, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request POST /virtual_registries/container/registries/2/upstreams with options', async () => {
    await service.createUpstream(2, 'http://u', 'up', { description: 'd', cacheValidityHours: 4 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/registries/2/upstreams',
      {
        body: { description: 'd', cacheValidityHours: 4, url: 'http://u', name: 'up' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('ContainerVirtualRegistry.showUpstream', () => {
  it('should request GET /virtual_registries/container/upstreams/3', async () => {
    await service.showUpstream(3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/upstreams/3',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerVirtualRegistry.editUpstream', () => {
  it('should request PATCH /virtual_registries/container/upstreams/3', async () => {
    await service.editUpstream(3);

    expect(RequestHelper.patch()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/upstreams/3',
      { body: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request PATCH /virtual_registries/container/upstreams/3 with options', async () => {
    await service.editUpstream(3, { name: 'n', cacheValidityHours: 2 });

    expect(RequestHelper.patch()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/upstreams/3',
      { body: { name: 'n', cacheValidityHours: 2 }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerVirtualRegistry.updateUpstreamPosition', () => {
  it('should request PATCH /virtual_registries/container/registry_upstreams/4', async () => {
    await service.updateUpstreamPosition(4, 2);

    expect(RequestHelper.patch()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/registry_upstreams/4',
      { body: { position: 2 }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerVirtualRegistry.removeUpstream', () => {
  it('should request DEL /virtual_registries/container/upstreams/3', async () => {
    await service.removeUpstream(3);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/upstreams/3',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerVirtualRegistry.associateUpstream', () => {
  it('should request POST /virtual_registries/container/registry_upstreams', async () => {
    await service.associateUpstream(2, 3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/registry_upstreams',
      { body: { registryId: 2, upstreamId: 3 }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerVirtualRegistry.disassociateUpstream', () => {
  it('should request DEL /virtual_registries/container/registry_upstreams/4', async () => {
    await service.disassociateUpstream(4);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/registry_upstreams/4',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerVirtualRegistry.clearUpstreamCache', () => {
  it('should request DEL /virtual_registries/container/upstreams/3/cache', async () => {
    await service.clearUpstreamCache(3);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/upstreams/3/cache',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerVirtualRegistry.testUpstream', () => {
  it('should request POST /virtual_registries/container/upstreams/3/test', async () => {
    await service.testUpstream(3);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/upstreams/3/test',
      { body: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request POST /virtual_registries/container/upstreams/3/test with options', async () => {
    await service.testUpstream(3, { url: 'http://u', username: 'a' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/upstreams/3/test',
      { body: { url: 'http://u', username: 'a' }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerVirtualRegistry.allCacheEntries', () => {
  it('should request GET /virtual_registries/container/upstreams/3/cache_entries', async () => {
    await service.allCacheEntries(3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/upstreams/3/cache_entries',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request GET /virtual_registries/container/upstreams/3/cache_entries with options', async () => {
    await service.allCacheEntries(3, { search: 'x' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/upstreams/3/cache_entries',
      {
        maxPages: undefined,
        searchParams: { search: 'x' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('ContainerVirtualRegistry.removeCacheEntry', () => {
  it('should request DEL /virtual_registries/container/cache_entries/a%2Fb', async () => {
    await service.removeCacheEntry('a/b');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'virtual_registries/container/cache_entries/a%2Fb',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
