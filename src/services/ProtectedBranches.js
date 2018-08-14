import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class ProtectedBranches extends BaseService {
  @api('<projectId>', { options: true, method: 'GET' })
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/protected_branches`, options);
  }

  @api('<projectId>', { options: true, method: 'POST' })
  protect(projectId, branchName, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/protected_branches`, {
      name: branchName,
      ...options,
    });
  }

  @api('<projectId>', '<branchName>', { options: true, method: 'GET' })
  show(projectId, branchName) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/protected_branches/${bName}`);
  }

  @api('<projectId>', '<branchName>', { options: true, method: 'DELETE' })
  unprotect(projectId, branchName) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/protected_branches/${bName}`);
  }
}

export default ProtectedBranches;
