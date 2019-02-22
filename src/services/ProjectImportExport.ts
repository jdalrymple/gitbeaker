import FormData from 'form-data';
import { BaseService, RequestHelper } from '../infrastructure';
import { BaseRequestOptions, Sudo, ProjectId } from '../../types/types';

class ProjectImportExport extends BaseService {
  download(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/export/download`, options);
  }

  exportStatus(projectId: ProjectId, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/export`, options);
  }

  import(content: string, path: string) {
    const form = new FormData();

    form.append('file', content, {
      filename: path,
      contentType: 'application/octet-stream',
    });

    return RequestHelper.postData(this, 'projects/import', form);
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
