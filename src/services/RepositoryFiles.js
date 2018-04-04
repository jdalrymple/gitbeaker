import { BaseService, RequestHelper } from '../infrastructure';

class RepositoryFiles extends BaseService {
  create(projectId, filePath, branch, options) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/repository/files/${path}`, {
      branch,
      ...options,
    });
  }

  edit(projectId, filePath, branch, options) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/repository/files/${path}`, {
      branch,
      ...options,
    });
  }

  remove(projectId, filePath, branch, options) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/repository/files/${path}`, {
      branch,
      ...options,
    });
  }

  show(projectId, filePath, ref) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/files/${path}`, {
      ref,
    });
  }

  showRaw(projectId, filePath, ref) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/files/${path}/raw`, { ref });
  }
}

export default RepositoryFiles;
