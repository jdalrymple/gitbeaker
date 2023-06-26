import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { AsStream, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

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
  import_error?: string;
}

export class ProjectImportExports<C extends boolean = false> extends BaseResource<C> {
  download<E extends boolean = false>(
    projectId: string | number,
    options: { asStream: true } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ReadableStream, void, E, void>>;

  download<E extends boolean = false>(
    projectId: string | number,
    options?: { asStream?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>>;

  download<E extends boolean = false>(
    projectId: string | number,
    options?: AsStream & ShowExpanded<E> & Sudo,
  ): Promise<any> {
    return RequestHelper.get<Blob | ReadableStream>()(
      this,
      endpoint`projects/${projectId}/export/download`,
      options,
    );
  }

  import<E extends boolean = false>(
    file: { content: Blob; filename: string },
    path: string,
    options?: {
      name?: string;
      namespace?: number | string;
      overrideParams?: Record<string, unknown>;
      overwrite?: boolean;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ImportStatusSchema, C, E, void>> {
    return RequestHelper.post<ImportStatusSchema>()(this, 'projects/import', {
      isForm: true,
      ...options,
      file: [file.content, file.filename],
      path,
    });
  }

  importRemote<E extends boolean = false>(
    url: string,
    path: string,
    options?: {
      name?: number;
      namespace?: number | string;
      overrideParams?: Record<string, unknown>;
      overwrite?: boolean;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ImportStatusSchema, C, E, void>> {
    return RequestHelper.post<ImportStatusSchema>()(this, 'projects/remote-import', {
      ...options,
      path,
      url,
    });
  }

  importRemoteS3<E extends boolean = false>(
    accessKeyId: string,
    bucketName: string,
    fileKey: string,
    path: string,
    region: string,
    secretAccessKey: string,
    options?: { name?: number; namespace?: number | string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ImportStatusSchema, C, E, void>> {
    return RequestHelper.post<ImportStatusSchema>()(this, 'projects/remote-import', {
      ...options,
      accessKeyId,
      bucketName,
      fileKey,
      path,
      region,
      secretAccessKey,
    });
  }

  showExportStatus<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    return RequestHelper.get<ExportStatusSchema>()(
      this,
      endpoint`projects/${projectId}/export`,
      options,
    );
  }

  showImportStatus<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    return RequestHelper.get<ImportStatusSchema>()(
      this,
      endpoint`projects/${projectId}/import`,
      options,
    );
  }

  scheduleExport<E extends boolean = false>(
    projectId: string | number,
    uploadConfig: {
      url: string;
      http_method?: string;
    },
    options?: { description?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    return RequestHelper.post<{ message: string }>()(this, endpoint`projects/${projectId}/export`, {
      ...options,
      upload: uploadConfig,
    });
  }
}
