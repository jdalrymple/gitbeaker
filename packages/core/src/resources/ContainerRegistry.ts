import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  Either,
  GitlabAPIResponse,
  PaginationRequestOptions,
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

export type CondensedRegistryRepositorySchema = Omit<
  RegistryRepositorySchema,
  'tags' | 'tags_count'
>;

export class ContainerRegistry<C extends boolean = false> extends BaseResource<C> {
  allRepositories<E extends boolean = false, P extends PaginationTypes = 'offset'>({
    groupId,
    projectId,
    ...options
  }: Either<{ projectId: string | number }, { groupId: string | number }> & {
    tags?: boolean;
    tagsCount?: boolean;
  } & PaginationRequestOptions<P> &
    Sudo &
    ShowExpanded<E>): Promise<GitlabAPIResponse<CondensedRegistryRepositorySchema[], C, E, P>> {
    let url: string;

    if (groupId) url = endpoint`groups/${groupId}/registry/repositories`;
    else if (projectId) url = endpoint`projects/${projectId}/registry/repositories`;
    else
      throw new Error(
        'Missing required argument. Please supply a groupId or a projectId in the options parameter.',
      );

    return RequestHelper.get<CondensedRegistryRepositorySchema[]>()(this, url, options);
  }

  allTags<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    repositoryId: number,
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CondensedRegistryRepositoryTagSchema[], C, E, P>> {
    return RequestHelper.get<CondensedRegistryRepositoryTagSchema[]>()(
      this,
      endpoint`projects/${projectId}/registry/repositories/${repositoryId}/tags`,
      options,
    );
  }

  editRegistryVisibility<E extends boolean = false>(
    projectId: string | number,
    options?: { containerRegistryAccessLevel: 'enabled' | 'private' | 'disabled' } & Sudo &
      ShowExpanded<E>,
  ) {
    return RequestHelper.get<CondensedRegistryRepositorySchema>()(
      this,
      endpoint`projects/${projectId}`,
      options,
    );
  }

  removeRepository<E extends boolean = false>(
    projectId: string | number,
    repositoryId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/registry/repositories/${repositoryId}`,
      options,
    );
  }

  removeTag<E extends boolean = false>(
    projectId: string | number,
    repositoryId: number,
    tagName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/registry/repositories/${repositoryId}/tags/${tagName}`,
      options,
    );
  }

  removeTags<E extends boolean = false>(
    projectId: string | number,
    repositoryId: number,
    nameRegexDelete: string,
    options?: Sudo & {
      nameRegex?: string;
      nameRegexKeep?: string;
      keepN?: string;
      olderThan?: string;
    } & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/registry/repositories/${repositoryId}/tags`,
      {
        nameRegexDelete,
        ...options,
      },
    );
  }

  showRepository<E extends boolean = false>(
    repositoryId: number,
    options?: { tags?: boolean; tagsCount?: boolean; size?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RegistryRepositorySchema, C, E, void>> {
    return RequestHelper.get<RegistryRepositorySchema>()(
      this,
      endpoint`registry/repositories/${repositoryId}`,
      options,
    );
  }

  showTag<E extends boolean = false>(
    projectId: string | number,
    repositoryId: number,
    tagName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RegistryRepositoryTagSchema, C, E, void>> {
    return RequestHelper.get<RegistryRepositoryTagSchema>()(
      this,
      endpoint`projects/${projectId}/registry/repositories/${repositoryId}/tags/${tagName}`,
      options,
    );
  }
}
