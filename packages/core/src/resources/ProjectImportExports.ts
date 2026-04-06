import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, createFormData, endpoint } from '../infrastructure';
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
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<Blob | ReadableStream>()(
      this,
      endpoint`projects/${projectId}/export/download`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
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
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ImportStatusSchema>()(this, 'projects/import', {
      sudo,
      showExpanded,
      body: createFormData({
        ...body,
        file: [file.content, file.filename],
        path,
      }),
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
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ImportStatusSchema>()(this, 'projects/remote-import', {
      sudo,
      showExpanded,
      body: {
        ...body,
        path,
        url,
      },
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
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ImportStatusSchema>()(this, 'projects/remote-import', {
      sudo,
      showExpanded,
      body: {
        ...body,
        accessKeyId,
        bucketName,
        fileKey,
        path,
        region,
        secretAccessKey,
      },
    });
  }

  showExportStatus<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ExportStatusSchema>()(this, endpoint`projects/${projectId}/export`, {
      sudo,
      showExpanded,
    });
  }

  showImportStatus<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ImportStatusSchema>()(this, endpoint`projects/${projectId}/import`, {
      sudo,
      showExpanded,
    });
  }

  scheduleExport<E extends boolean = false>(
    projectId: string | number,
    uploadConfig: {
      url: string;
      http_method?: string;
    },
    options?: { description?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<{ message: string }>()(this, endpoint`projects/${projectId}/export`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        upload: uploadConfig,
      },
    });
  }
}
