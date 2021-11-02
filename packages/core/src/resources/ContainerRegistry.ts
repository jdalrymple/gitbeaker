import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo, endpoint } from '../infrastructure';

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

export class ContainerRegistry<C extends boolean = false> extends BaseResource<C> {
  projectRepositories(projectId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<Omit<RegistryRepositorySchema, 'tags' | 'tags_count'>[]>()(
      this,
      endpoint`projects/${projectId}/registry/repositories`,
      options,
    );
  }

  groupRepositories(projectId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<Omit<RegistryRepositorySchema, 'tags' | 'tags_count'>[]>()(
      this,
      endpoint`groups/${projectId}/registry/repositories`,
      options,
    );
  }

  showRepository(projectId: string | number, repositoryId: number, options?: Sudo) {
    return RequestHelper.get<RegistryRepositorySchema>()(
      this,
      endpoint`projects/${projectId}/registry/repositories/${repositoryId}`,
      options,
    );
  }

  tags(projectId: string | number, repositoryId: number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<Pick<RegistryRepositoryTagSchema, 'name' | 'path' | 'location'>[]>()(
      this,
      endpoint`projects/${projectId}/registry/repositories/${repositoryId}/tags`,
      options,
    );
  }

  removeRepository(projectId: string | number, repositoryId: number, options?: Sudo) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/registry/repositories/${repositoryId}`,
      options,
    );
  }

  removeTag(projectId: string | number, repositoryId: number, tagName: string, options?: Sudo) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/registry/repositories/${repositoryId}/tags/${tagName}`,
      options,
    );
  }

  removeTags(
    projectId: string | number,
    repositoryId: number,
    nameRegexDelete: string,
    options?: Sudo & { nameRegexKeep: string; keepN: string; olderThan: string },
  ) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/registry/repositories/${repositoryId}/tags`,
      {
        nameRegexDelete,
        ...options,
      },
    );
  }

  showTag(projectId: string | number, repositoryId: number, tagName: string, options?: Sudo) {
    return RequestHelper.get<RegistryRepositoryTagSchema>()(
      this,
      endpoint`projects/${projectId}/registry/repositories/${repositoryId}/tags/${tagName}`,
      options,
    );
  }
}
