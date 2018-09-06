import { BaseService, RequestHelper } from '../infrastructure';

class Branches extends BaseService {
  all(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/branches`, options);
  }

  create(projectId: ProjectId, branchName: string, ref: string) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/branches`, {
      branch: branchName,
      ref,
    });
  }

  protect(projectId: ProjectId, branchName: string, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/protected_branches`, { name: branchName, ...options });
  }

  remove(projectId: ProjectId, branchName: string) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/repository/branches/${bName}`);
  }

  show(projectId: ProjectId, branchName: string) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/branches/${bName}`);
  }

  unprotect(projectId: ProjectId, branchName: string) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/repository/branches/${bName}/unprotect`);
  }
}

export default Branches;
