import { BaseResource } from '@gitbeaker/requester-utils';
import { lookup as mimeLookup } from 'mime-types';
import { RequestHelper, Sudo, BaseRequestOptions, endpoint } from '../infrastructure';

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
};

export class ProjectImportExport<C extends boolean = false> extends BaseResource<C> {
  download(projectId: string | number, options?: Sudo) {
    return RequestHelper.get()(this, endpoint`projects/${projectId}/export/download`, options);
  }

  exportStatus(projectId: string | number, options?: Sudo) {
    return RequestHelper.get<ExportStatusSchema>()(
      this,
      endpoint`projects/${projectId}/export`,
      options,
    );
  }

  import(
    content: string,
    path: string,
    { metadata, ...options }: { metadata?: UploadMetadata } & BaseRequestOptions = {},
  ) {
    const meta = { ...defaultMetadata, ...metadata };

    if (!meta.contentType) meta.contentType = mimeLookup(meta.filename);

    return RequestHelper.post<ImportStatusSchema>()(this, 'projects/import', {
      isForm: true,
      ...options,
      file: [content, meta],
      path,
    });
  }

  importStatus(projectId: string | number, options?: Sudo) {
    return RequestHelper.get<ImportStatusSchema>()(
      this,
      endpoint`projects/${projectId}/import`,
      options,
    );
  }

  schedule(projectId: string | number, options?: BaseRequestOptions) {
    return RequestHelper.post<{ message: string }>()(
      this,
      endpoint`projects/${projectId}/export`,
      options,
    );
  }
}
