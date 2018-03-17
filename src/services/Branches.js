import { BaseService, RequestHelper } from '../infrastructure';

class Branches extends BaseService {
  all(projectId, options = {}) {
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

  protect(projectId, branchName, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(
      this,
      `projects/${pId}/repository/branches/${branchName}/protect`,
      options,
    );
  }

  remove(projectId, branchName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(
      this,
      `projects/${pId}/repository/branches/${branchName}`,
    );
  }

  show(projectId, branchName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(
      this,
      `projects/${pId}/repository/branches/${branchName}`,
    );
  }

  unprotect(projectId, branchName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(
      this,
      `projects/${pId}/repository/branches/${branchName}/unprotect`,
    );
  }
}

export default Branches;
