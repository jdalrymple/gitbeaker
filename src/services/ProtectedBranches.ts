import { BaseService, RequestHelper } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId } from '@typings';

class ProtectedBranches extends BaseService {
  all(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/protected_branches`, options);
  }

  protect(projectId: ProjectId, branchName: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/protected_branches`, {
      name: branchName,
      ...options,
    });
  }

  show(projectId: ProjectId, branchName: string, options?: Sudo) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/protected_branches/${bName}`, options);
  }

  unprotect(projectId: ProjectId, branchName: string, options?: Sudo) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/protected_branches/${bName}`, options);
  }
}

export default ProtectedBranches;
