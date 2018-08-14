import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class ProjectImportExport extends BaseService {
  @api('<projectId>', { method: 'GET' })
  download(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/export/download`);
  }

  @api('<projectId>', { method: 'GET' })
  exportStatus(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/export`);
  }

  @api('<file>', '<path>', { options: true, method: 'POST' })
  import(file, path, options) {
    return RequestHelper.post(this, 'projects/import', { file, path, ...options });
  }

  @api('<projectId>', { method: 'GET' })
  importStatus(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/import`);
  }

  @api('<projectId>', { options: true, method: 'POST' })
  schedule(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/export`, options);
  }
}

export default ProjectImportExport;
