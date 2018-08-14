import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Branches extends BaseService {
  @api('<projectId>', { options: true, method: 'GET' })
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/branches`, options);
  }

  @api('<projectId>', '<branchName>', '<ref>', { method: 'POST' })
  create(projectId, branchName, ref) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/branches`, {
      branch: branchName,
      ref,
    });
  }

  @api('<projectId>', '<branchName>', { options: true, method: 'POST' })
  protect(projectId, branchName, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/protected_branches`, { name: branchName, ...options });
  }

  @api('<projectId>', '<branchName>', { method: 'DELETE' })
  remove(projectId, branchName) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/repository/branches/${bName}`);
  }

  @api('<projectId>', '<branchName>', { method: 'GET' })
  show(projectId, branchName) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/branches/${bName}`);
  }

  @api('<projectId>', '<branchName>', { method: 'PUT' })
  unprotect(projectId, branchName) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/repository/branches/${bName}/unprotect`);
  }
}

export default Branches;
