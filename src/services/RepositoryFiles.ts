import { BaseService, RequestHelper } from '../infrastructure';

class RepositoryFiles extends BaseService {
  create(projectId: ProjectId, filePath, branch, options) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/repository/files/${path}`, {
      branch,
      ...options,
    });
  }

  edit(projectId: ProjectId, filePath, branch, options) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/repository/files/${path}`, {
      branch,
      ...options,
    });
  }

  remove(projectId: ProjectId, filePath, branch, options) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/repository/files/${path}`, {
      branch,
      ...options,
    });
  }

  show(projectId: ProjectId, filePath, ref) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/files/${path}`, {
      ref,
    });
  }

  showRaw(projectId: ProjectId, filePath, ref) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/files/${path}/raw`, { ref });
  }
}

export default RepositoryFiles;
