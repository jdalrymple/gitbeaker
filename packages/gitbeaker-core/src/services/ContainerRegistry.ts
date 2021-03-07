import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface TagSchema extends Record<string, unknown> {
  name: string;
  path: string;
  location: string;
  revision: string;
  short_revision: string;
  digest: string;
  created_at: string;
  total_size: number;
}

export interface RepositorySchema extends Record<string, unknown> {
  id: number;
  name: string;
  path: string;
  project_id: number;
  location: string;
  created_at: string;
  cleanup_policy_started_at: string;
  tags_count?: number;
  tags?: Pick<TagSchema, 'name' | 'path' | 'location'>[];
}

export class ContainerRegistry<C extends boolean = false> extends BaseService<C> {
  projectRepositories(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<Omit<RepositorySchema, 'tags' | 'tags_count'>[]>()(
      this,
      `projects/${pId}/registry/repositories`,
      options,
    );
  }

  groupRepositories(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<Omit<RepositorySchema, 'tags' | 'tags_count'>[]>()(
      this,
      `groups/${pId}/registry/repositories`,
      options,
    );
  }

  showRepository(projectId: string | number, repositoryId: number, options?: Sudo) {
    const [pId, rId] = [projectId, repositoryId].map(encodeURIComponent);

    return RequestHelper.get<RepositorySchema>()(
      this,
      `projects/${pId}/registry/repositories/${rId}`,
      options,
    );
  }

  tags(projectId: string | number, repositoryId: number, options?: PaginatedRequestOptions) {
    const [pId, rId] = [projectId, repositoryId].map(encodeURIComponent);

    return RequestHelper.get<Pick<TagSchema, 'name' | 'path' | 'location'>[]>()(
      this,
      `projects/${pId}/registry/repositories/${rId}/tags`,
      options,
    );
  }

  removeRepository(projectId: string | number, repositoryId: number, options?: Sudo) {
    const [pId, rId] = [projectId, repositoryId].map(encodeURIComponent);

    return RequestHelper.del<void>()(this, `projects/${pId}/registry/repositories/${rId}`, options);
  }

  removeTag(projectId: string | number, repositoryId: number, tagName: string, options?: Sudo) {
    const [pId, rId, tId] = [projectId, repositoryId, tagName].map(encodeURIComponent);

    return RequestHelper.del<void>()(
      this,
      `projects/${pId}/registry/repositories/${rId}/tags/${tId}`,
      options,
    );
  }

  removeTags(
    projectId: string | number,
    repositoryId: number,
    nameRegexDelete: string,
    options?: Sudo & { nameRegexKeep: string; keepN: string; olderThan: string },
  ) {
    const [pId, rId] = [projectId, repositoryId].map(encodeURIComponent);

    return RequestHelper.del<void>()(this, `projects/${pId}/registry/repositories/${rId}/tags`, {
      nameRegexDelete,
      ...options,
    });
  }

  showTag(projectId: string | number, repositoryId: number, tagName: string, options?: Sudo) {
    const [pId, rId, tId] = [projectId, repositoryId, tagName].map(encodeURIComponent);

    return RequestHelper.get<TagSchema>()(
      this,
      `projects/${pId}/registry/repositories/${rId}/tags/${tId}`,
      options,
    );
  }
}
