import { BaseResource } from '@gitbeaker/requester-utils';

import type { AsStream, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, createFormData, endpoint, normalizeFormData } from '../infrastructure';

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
  line_number: number;
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
  import_type?: string;
  stats?: {
    fetched: Record<string, number>;
    imported: Record<string, number>;
  };
}

export interface RelationImportSchema extends Record<string, unknown> {
  id: number;
  project_path: string;
  relation: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export class ProjectImportExports<C extends boolean = false> extends BaseResource<C> {
  download<E extends boolean = false>(
    projectId: string | number,
    options: { asStream: true } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ReadableStream, void, E, void>>;

  download<E extends boolean = false>(
    projectId: string | number,
    options?: { asStream?: boolean } & ShowExpanded<E> & Sudo,
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
      namespaceId?: number;
      namespacePath?: string;
      overrideParams?: Record<string, unknown>;
      overwrite?: boolean;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ImportStatusSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ImportStatusSchema>()(this, 'projects/import', {
      sudo,
      showExpanded,
      body: createFormData(
        normalizeFormData({
          ...body,
          file: [file.content, file.filename],
          path,
        }),
      ),
    });
  }

  importRemote<E extends boolean = false>(
    url: string,
    path: string,
    options?: {
      name?: string;
      namespace?: number | string;
      namespaceId?: number;
      namespacePath?: string;
      overrideParams?: Record<string, unknown>;
      overwrite?: boolean;
    } & ShowExpanded<E> &
      Sudo,
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
    options?: {
      name?: string;
      namespace?: number | string;
      namespaceId?: number;
      namespacePath?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ImportStatusSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ImportStatusSchema>()(this, 'projects/remote-import-s3', {
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

  importRelation<E extends boolean = false>(
    file: { content: Blob; filename: string },
    path: string,
    relation: 'issues' | 'milestones' | 'ci_pipelines' | 'merge_requests',
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RelationImportSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<RelationImportSchema>()(this, 'projects/import-relation', {
      sudo,
      showExpanded,
      body: createFormData(
        normalizeFormData({
          file: [file.content, file.filename],
          path,
          relation,
        }),
      ),
    });
  }

  showRelationImportStatus<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RelationImportSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<RelationImportSchema[]>()(
      this,
      endpoint`projects/${projectId}/relation-imports`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showExportStatus<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ) {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ExportStatusSchema>()(this, endpoint`projects/${projectId}/export`, {
      sudo,
      showExpanded,
    });
  }

  showImportStatus<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
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
    options?: { description?: string } & ShowExpanded<E> & Sudo,
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
