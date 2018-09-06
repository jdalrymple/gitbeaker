import { BaseService, RequestHelper } from '../infrastructure';

class ProtectedBranches extends BaseService {
  all(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/protected_branches`, options);
  }

  protect(projectId: ProjectId, branchName, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/protected_branches`, {
      name: branchName,
      ...options,
    });
  }

  show(projectId: ProjectId, branchName) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/protected_branches/${bName}`);
  }

  unprotect(projectId: ProjectId, branchName) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/protected_branches/${bName}`);
  }
}

export default ProtectedBranches;
