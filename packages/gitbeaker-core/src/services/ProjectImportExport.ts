import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, Sudo, BaseRequestOptions } from '../infrastructure';

export interface ExportStatusSchema extends Record<string, unknown> {
  id: number;
  description: string;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  created_at: string;
  export_status: string;
  _links: {
    api_url: string;
    web_url: string;
  };
}

export interface FailedRelationSchema {
  id: number;
  created_at: string;
  exception_class: string;
  exception_message: string;
  source: string;
  relation_name: string;
}

export interface ImportStatusSchema extends Record<string, unknown> {
  id: number;
  description: string;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  created_at: string;
  import_status: string;
  correlation_id: string;
  failed_relations?: FailedRelationSchema[];
}

export interface UploadMetadata {
  filename?: string;
  contentType?: string;
}

export const defaultMetadata = {
  filename: `${Date.now().toString()}.tar.gz`,
  contentType: 'application/octet-stream',
};

export class ProjectImportExport extends BaseService {
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
