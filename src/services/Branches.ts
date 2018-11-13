import { BaseService, RequestHelper } from '../infrastructure';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo, ProjectId } from '@src/types';

class Branches extends BaseService {
  all(projectId: ProjectId, options: { search: string } & PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/branches`, options);
  }

  create(projectId: ProjectId, branchName: string, ref: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/branches`, {
      branch: branchName,
      ref,
      ...options
    });
  }

  protect(projectId: ProjectId, branchName: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/protected_branches`, { name: branchName, ...options });
  }

  remove(projectId: ProjectId, branchName: string, options?: Sudo) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/repository/branches/${bName}`, options);
  }

  show(projectId: ProjectId, branchName: string, options?: Sudo) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/branches/${bName}`, options);
  }

  unprotect(projectId: ProjectId, branchName: string, options?: Sudo) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/repository/branches/${bName}/unprotect`, options);
  }
}

export default Branches;
