import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo, BaseRequestOptions } from '../infrastructure';
import { ExportStatusSchema, ImportStatusSchema, UploadMetadata } from '../models';

export const defaultMetadata = {
  filename: `${Date.now().toString()}.tar.gz`,
  contentType: 'application/octet-stream',
};

export class ProjectImportExport<C extends boolean = false> extends BaseService<C> {
  download(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get()(this, `projects/${pId}/export/download`, options);
  }

  exportStatus(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<ExportStatusSchema>()(this, `projects/${pId}/export`, options);
  }

  import(
    content: string,
    path: string,
    { metadata, ...options }: { metadata?: UploadMetadata } & BaseRequestOptions = {},
  ) {
    return RequestHelper.post<ImportStatusSchema>()(this, 'projects/import', {
      isForm: true,
      ...options,
      file: [content, { ...defaultMetadata, ...metadata }],
      path,
    });
  }

  importStatus(projectId: string | number, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<ImportStatusSchema>()(this, `projects/${pId}/import`, options);
  }

  schedule(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<{ message: string }>()(this, `projects/${pId}/export`, options);
  }
}
