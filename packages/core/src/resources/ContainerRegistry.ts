import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';
import type {
  GitlabAPIResponse,
  MappedOmit,
  OneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface RegistryRepositoryTagSchema extends Record<string, unknown> {
  name: string;
  path: string;
  location: string;
  revision: string;
  short_revision: string;
  digest: string;
  created_at: string;
  total_size: number;
}

export type CondensedRegistryRepositoryTagSchema = Pick<
  RegistryRepositoryTagSchema,
  'name' | 'path' | 'location'
>;

export interface RegistryRepositorySchema extends Record<string, unknown> {
  id: number;
  name: string;
  path: string;
  project_id: number;
  location: string;
  created_at: string;
  cleanup_policy_started_at: string;
  tags_count?: number;
  tags?: Pick<RegistryRepositoryTagSchema, 'name' | 'path' | 'location'>[];
}

export type CondensedRegistryRepositorySchema = MappedOmit<
  RegistryRepositorySchema,
  'tags' | 'tags_count'
>;

export class ContainerRegistry<C extends boolean = false> extends BaseResource<C> {
  allRepositories<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: OneOf<{ projectId: string | number; groupId: string | number }> & {
      tags?: boolean;
      tagsCount?: boolean;
    } & PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CondensedRegistryRepositorySchema[], C, E, P>> {
    const { projectId, groupId, sudo, showExpanded, maxPages, ...searchParams } = options || {};

    ensureRequiredParams({ projectId, groupId });

    const url = getPrefixedUrl('registry/repositories', { projects: projectId, groups: groupId });

    return RequestHelper.get<CondensedRegistryRepositorySchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & {
        tags?: boolean;
        tagsCount?: boolean;
      },
    });
  }

  allTags<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    repositoryId: number,
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CondensedRegistryRepositoryTagSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<CondensedRegistryRepositoryTagSchema[]>()(
      this,
      endpoint`projects/${projectId}/registry/repositories/${repositoryId}/tags`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<P>,
      },
    );
  }

  editRegistryVisibility<E extends boolean = false>(
    projectId: string | number,
    options?: { containerRegistryAccessLevel: 'enabled' | 'private' | 'disabled' } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CondensedRegistryRepositorySchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<CondensedRegistryRepositorySchema>()(
      this,
      endpoint`projects/${projectId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  removeRepository<E extends boolean = false>(
    projectId: string | number,
    repositoryId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/registry/repositories/${repositoryId}`,
      { sudo, showExpanded },
    );
  }

  removeTag<E extends boolean = false>(
    projectId: string | number,
    repositoryId: number,
    tagName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/registry/repositories/${repositoryId}/tags/${tagName}`,
      { sudo, showExpanded },
    );
  }

  removeTags<E extends boolean = false>(
    projectId: string | number,
    repositoryId: number,
    nameRegexDelete: string,
    options?: {
      nameRegex?: string;
      nameRegexKeep?: string;
      keepN?: string;
      olderThan?: string;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/registry/repositories/${repositoryId}/tags`,
      {
        sudo,
        showExpanded,
        body: {
          nameRegexDelete,
          ...body,
        },
      },
    );
  }

  showRepository<E extends boolean = false>(
    repositoryId: number,
    options?: { tags?: boolean; tagsCount?: boolean; size?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RegistryRepositorySchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<RegistryRepositorySchema>()(
      this,
      endpoint`registry/repositories/${repositoryId}`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  showTag<E extends boolean = false>(
    projectId: string | number,
    repositoryId: number,
    tagName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RegistryRepositoryTagSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<RegistryRepositoryTagSchema>()(
      this,
      endpoint`projects/${projectId}/registry/repositories/${repositoryId}/tags/${tagName}`,
      { sudo, showExpanded },
    );
  }
}
