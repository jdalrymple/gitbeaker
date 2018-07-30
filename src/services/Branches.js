import { BaseService, RequestHelper } from '../infrastructure';

class Branches extends BaseService {
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/branches`, options);
  }

  create(projectId, branchName, ref) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/branches`, {
      branch: branchName,
      ref,
    });
  }

  protect(projectId, branchName, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/protected_branches`, { branchName, ...options });
  }

  remove(projectId, branchName) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/repository/branches/${bName}`);
  }

  show(projectId, branchName) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/branches/${bName}`);
  }

  unprotect(projectId, branchName) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/repository/branches/${bName}/unprotect`);
  }
}

export default Branches;
