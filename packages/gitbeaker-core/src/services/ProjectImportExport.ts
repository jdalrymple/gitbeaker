import { BaseService, RequestHelper, Sudo, BaseRequestOptions } from '../infrastructure';

export interface UploadMetadata {
  filename?: string;
  contentType?: string;
}

export const defaultMetadata: UploadMetadata = {
  filename: `${Date.now().toString()}.tar.gz`,
  contentType: 'application/octet-stream',
};

export class ProjectImportExport extends BaseService {
  download(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/export/download`, options);
  }

  exportStatus(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/export`, options);
  }

  import(content: string, path: string, options?: BaseRequestOptions) {
    return RequestHelper.post(this, 'projects/import', {
      isForm: true,
      ...options,
      file: { content, metadata: defaultMetadata },
      path,
    });
  }

  importStatus(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/import`, options);
  }

  schedule(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/export`, options);
  }
}
