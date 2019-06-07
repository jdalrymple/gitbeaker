import { BaseService, RequestHelper } from '../infrastructure';

class ContainerRegistry extends BaseService {
  repositories(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/registry/repositories`, options);
  }

  tags(projectId: ProjectId, repositoryId: number, options?: PaginatedRequestOptions) {
    const [pId, rId] = [projectId, repositoryId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/registry/repositories/${rId}/tags`, options);
  }

  removeRepository(projectId: ProjectId, repositoryId: number, options?: Sudo) {
    const [pId, rId] = [projectId, repositoryId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/registry/repositories/${rId}`, options);
  }

  removeTag(projectId: ProjectId, repositoryId: number, tagName: string, options?: Sudo) {
    const [pId, rId, tId] = [projectId, repositoryId, tagName].map(encodeURIComponent);

    return RequestHelper.del(
      this,
      `projects/${pId}/registry/repositories/${rId}/tags/${tId}`,
      options,
    );
  }

  removeTags(
    projectId: ProjectId,
    repositoryId: number,
    tagNameRegex: string,
    options?: Sudo & { keepN: string; olderThan: string },
  ) {
    const [pId, rId] = [projectId, repositoryId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/registry/repositories/${rId}/tags`, {
      tagNameRegex,
      ...options,
    });
  }

  showTag(projectId: ProjectId, repositoryId: number, tagName: string, options?: Sudo) {
    const [pId, rId, tId] = [projectId, repositoryId, tagName].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/registry/repositories/${rId}/tags/${tId}`,
      options,
    );
  }
}

export default ContainerRegistry;
