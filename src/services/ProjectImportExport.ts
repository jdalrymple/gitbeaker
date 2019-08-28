import FormData from 'form-data';
import { BaseService, RequestHelper, Sudo, BaseRequestOptions } from '../infrastructure';
import { ProjectId, UploadMetadata } from '.';

class ProjectImportExport extends BaseService {
  download(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/export/download`, options);
  }

  exportStatus(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/export`, options);
  }

  import(content: string, path: string, options?: Sudo) {
    const form = new FormData();

    const defaultMetadata: UploadMetadata = {
      filename: Date.now().toString(),
      contentType: 'application/octet-stream',
    };

    form.append('file', content, defaultMetadata);
    form.append('path', path);

    return RequestHelper.post(this, 'projects/import', { ...options, form });
  }

  importStatus(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/import`, options);
  }

  schedule(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/export`, options);
  }
}

export default ProjectImportExport;
