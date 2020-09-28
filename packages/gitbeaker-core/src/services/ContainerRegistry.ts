import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

export class ContainerRegistry extends BaseService {
  repositories(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/registry/repositories`, options);
  }

  tags(projectId: string | number, repositoryId: number, options?: PaginatedRequestOptions) {
    const [pId, rId] = [projectId, repositoryId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/registry/repositories/${rId}/tags`, options);
  }

  removeRepository(projectId: string | number, repositoryId: number, options?: Sudo) {
    const [pId, rId] = [projectId, repositoryId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/registry/repositories/${rId}`, options);
  }

  removeTag(projectId: string | number, repositoryId: number, tagName: string, options?: Sudo) {
    const [pId, rId, tId] = [projectId, repositoryId, tagName].map(encodeURIComponent);

    return RequestHelper.del(
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

    return RequestHelper.del(this, `projects/${pId}/registry/repositories/${rId}/tags`, {
      nameRegexDelete,
      ...options,
    });
  }

  showTag(projectId: string | number, repositoryId: number, tagName: string, options?: Sudo) {
    const [pId, rId, tId] = [projectId, repositoryId, tagName].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/registry/repositories/${rId}/tags/${tId}`,
      options,
    );
  }
}
