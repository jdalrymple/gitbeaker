import FormData from 'form-data';
import { BaseService, RequestHelper } from '../infrastructure';
import { BaseRequestOptions, Sudo, ProjectId } from '@src/types';

class ProjectImportExport extends BaseService {
  download(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/export/download`, options);
  }

  exportStatus(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/export`, options);
  }

  import(content: string, path: string, options?: BaseRequestOptions) {
    const form = new FormData();

    form.append(path, {
      file: {
        value: content,
        options: {
          filename: path,
          contentType: 'application/octet-stream',
        },
      },
    });

    return RequestHelper.post(this, 'projects/import', { ...form, ...options });
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
