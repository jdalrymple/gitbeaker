import { BaseService, RequestHelper } from '../infrastructure';

export class RepositoryFiles extends BaseService {
  create(projectId, filePath, branch, options = {}) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);
    const extendedOptions = Object.assign({ branch }, options);

    return RequestHelper.post(
      this,
      `projects/${pId}/repository/files/${path}`,
      extendedOptions,
    );
  }

  edit(projectId, filePath, branch, options = {}) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);
    const extendedOptions = Object.assign({ branch }, options);

    return RequestHelper.put(
      this,
      `projects/${pId}/repository/files/${path}`,
      extendedOptions,
    );
  }

  remove(projectId, filePath, branch, options = {}) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);
    const extendedOptions = Object.assign({ branch }, options);

    return RequestHelper.delete(
      this,
      `projects/${pId}/repository/files/${path}`,
      extendedOptions,
    );
  }

  show(projectId, filePath, ref) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/files/${path}`, {
      ref,
    });
  }

  showRaw(projectId, filePath, ref) {
    const [pId, path] = [projectId, filePath].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/repository/files/${path}/raw`,
      { ref },
    );
  }
}

export default RepositoryFiles;
