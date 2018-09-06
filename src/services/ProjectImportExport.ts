import { BaseService, RequestHelper } from '../infrastructure';

class ProjectImportExport extends BaseService {
  download(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/export/download`);
  }

  exportStatus(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/export`);
  }

  import(file, path, options) {
    return RequestHelper.post(this, 'projects/import', { file, path, ...options });
  }

  importStatus(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/import`);
  }

  schedule(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/export`, options);
  }
}

export default ProjectImportExport;
