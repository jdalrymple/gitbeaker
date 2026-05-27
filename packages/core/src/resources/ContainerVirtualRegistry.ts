import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface VirtualRegistrySchema extends Record<string, unknown> {
  id: number;
  group_id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  registry_upstreams?: RegistryUpstreamAssociationSchema[];
}

export interface UpstreamRegistrySchema extends Record<string, unknown> {
  id: number;
  group_id: number;
  url: string;
  name: string;
  description?: string;
  cache_validity_hours: number;
  username?: string;
  created_at: string;
  updated_at: string;
  registry_upstreams?: RegistryUpstreamAssociationSchema[];
  registry_upstream?: RegistryUpstreamAssociationSchema;
}

export interface RegistryUpstreamAssociationSchema extends Record<string, unknown> {
  id: number;
  registry_id: number;
  upstream_id: number;
  position: number;
}

export interface CacheEntrySchema extends Record<string, unknown> {
  id: string;
  group_id: number;
  upstream_id: number;
  upstream_checked_at: string;
  file_md5: string;
  file_sha1: string;
  size: number;
  relative_path: string;
  content_type: string;
  upstream_etag: string;
  created_at: string;
  updated_at: string;
  downloads_count: number;
  downloaded_at: string;
}

export interface ConnectionTestResultSchema extends Record<string, unknown> {
  success: boolean;
  result?: string;
}

export class ContainerVirtualRegistry<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<VirtualRegistrySchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<VirtualRegistrySchema[]>()(
      this,
      endpoint`groups/${groupId}/-/virtual_registries/container/registries`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  create<E extends boolean = false>(
    groupId: string | number,
    name: string,
    options?: {
      description?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<VirtualRegistrySchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<VirtualRegistrySchema>()(
      this,
      endpoint`groups/${groupId}/-/virtual_registries/container/registries`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          name,
        },
      },
    );
  }

  show<E extends boolean = false>(
    registryId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<VirtualRegistrySchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<VirtualRegistrySchema>()(
      this,
      endpoint`virtual_registries/container/registries/${registryId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  edit<E extends boolean = false>(
    registryId: number,
    options?: {
      name?: string;
      description?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.patch<void>()(
      this,
      endpoint`virtual_registries/container/registries/${registryId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    registryId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`virtual_registries/container/registries/${registryId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  clearCache<E extends boolean = false>(
    registryId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`virtual_registries/container/registries/${registryId}/cache`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  allUpstreams<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: {
      upstreamName?: string;
    } & PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<UpstreamRegistrySchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<UpstreamRegistrySchema[]>()(
      this,
      endpoint`groups/${groupId}/-/virtual_registries/container/upstreams`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  testUpstreamConnection<E extends boolean = false>(
    groupId: string | number,
    url: string,
    options?: {
      username?: string;
      password?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ConnectionTestResultSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ConnectionTestResultSchema>()(
      this,
      endpoint`groups/${groupId}/-/virtual_registries/container/upstreams/test`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          url,
        },
      },
    );
  }

  allRegistryUpstreams<E extends boolean = false>(
    registryId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<UpstreamRegistrySchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<UpstreamRegistrySchema[]>()(
      this,
      endpoint`virtual_registries/container/registries/${registryId}/upstreams`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  createUpstream<E extends boolean = false>(
    registryId: number,
    url: string,
    name: string,
    options?: {
      description?: string;
      username?: string;
      password?: string;
      cacheValidityHours?: number;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<UpstreamRegistrySchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<UpstreamRegistrySchema>()(
      this,
      endpoint`virtual_registries/container/registries/${registryId}/upstreams`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          url,
          name,
        },
      },
    );
  }

  showUpstream<E extends boolean = false>(
    upstreamId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<UpstreamRegistrySchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<UpstreamRegistrySchema>()(
      this,
      endpoint`virtual_registries/container/upstreams/${upstreamId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  editUpstream<E extends boolean = false>(
    upstreamId: number,
    options?: {
      url?: string;
      name?: string;
      description?: string;
      username?: string;
      password?: string;
      cacheValidityHours?: number;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.patch<void>()(
      this,
      endpoint`virtual_registries/container/upstreams/${upstreamId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  updateUpstreamPosition<E extends boolean = false>(
    registryUpstreamId: number,
    position: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.patch<void>()(
      this,
      endpoint`virtual_registries/container/registry_upstreams/${registryUpstreamId}`,
      {
        sudo,
        showExpanded,
        body: { position },
      },
    );
  }

  removeUpstream<E extends boolean = false>(
    upstreamId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`virtual_registries/container/upstreams/${upstreamId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  associateUpstream<E extends boolean = false>(
    registryId: number,
    upstreamId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RegistryUpstreamAssociationSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<RegistryUpstreamAssociationSchema>()(
      this,
      'virtual_registries/container/registry_upstreams',
      {
        sudo,
        showExpanded,
        body: {
          registryId,
          upstreamId,
        },
      },
    );
  }

  disassociateUpstream<E extends boolean = false>(
    registryUpstreamId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`virtual_registries/container/registry_upstreams/${registryUpstreamId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  clearUpstreamCache<E extends boolean = false>(
    upstreamId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`virtual_registries/container/upstreams/${upstreamId}/cache`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  testUpstream<E extends boolean = false>(
    upstreamId: number,
    options?: {
      url?: string;
      username?: string;
      password?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ConnectionTestResultSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ConnectionTestResultSchema>()(
      this,
      endpoint`virtual_registries/container/upstreams/${upstreamId}/test`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  allCacheEntries<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    upstreamId: number,
    options?: {
      search?: string;
    } & PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<CacheEntrySchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<CacheEntrySchema[]>()(
      this,
      endpoint`virtual_registries/container/upstreams/${upstreamId}/cache_entries`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  removeCacheEntry<E extends boolean = false>(
    cacheEntryId: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`virtual_registries/container/cache_entries/${cacheEntryId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}