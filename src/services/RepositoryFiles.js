import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class RepositoryFiles extends BaseService {
  @api('<projectId>', '<filePath>', '<branch>', { options: true, method: 'POST' })
  create(projectId, filePath, branch, options) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/repository/files/${path}`, {
      branch,
      ...options,
    });
  }

  @api('<projectId>', '<filePath>', '<branch>', { options: true, method: 'PUT' })
  edit(projectId, filePath, branch, options) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/repository/files/${path}`, {
      branch,
      ...options,
    });
  }

  @api('<projectId>', '<filePath>', '<branch>', { options: true, method: 'DELETE' })
  remove(projectId, filePath, branch, options) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/repository/files/${path}`, {
      branch,
      ...options,
    });
  }

  @api('<projectId>', '<filePath>', '<ref>', { method: 'GET' })
  show(projectId, filePath, ref) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/files/${path}`, {
      ref,
    });
  }

  @api('<projectId>', '<filePath>', '<ref>', { method: 'GET' })
  showRaw(projectId, filePath, ref) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/files/${path}/raw`, { ref });
  }
}

export default RepositoryFiles;
