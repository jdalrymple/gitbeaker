import { BaseService, RequestHelper } from '../infrastructure';

export class ProtectedBranches extends BaseService {
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/protected_branches`, options);
  }

  protect(projectId, branchName, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(
      this,
      `projects/${pId}/protected_branches`,
      Object.assign(options, { name: branchName }),
    );
  }

  show(projectId, branchName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(
      this,
      `projects/${pId}/protected_branches/${branchName}`,
    );
  }

  unprotect(projectId, branchName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(
      this,
      `projects/${pId}/protected_branches/${branchName}`,
    );
  }
}

export default ProtectedBranches;
