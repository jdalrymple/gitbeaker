import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

class RepositoryFiles extends BaseService {
  create(projectId: ProjectId, filePath: string, branch: string, options: RequestOptions) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/repository/files/${path}`, {
      branch,
      ...options,
    });
  }

  edit(projectId: ProjectId, filePath: string, branch: string, options: RequestOptions) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/repository/files/${path}`, {
      branch,
      ...options,
    });
  }

  remove(projectId: ProjectId, filePath: string, branch: string, options: RequestOptions) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/repository/files/${path}`, {
      branch,
      ...options,
    });
  }

  show(projectId: ProjectId, filePath: string, ref: string) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/files/${path}`, {
      ref,
    });
  }

  showRaw(projectId: ProjectId, filePath: string, ref: string) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/files/${path}/raw`, { ref });
  }
}

export default RepositoryFiles;
