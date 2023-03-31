import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { BaseRequestOptions, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

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

export class ProjectImportExport<C extends boolean = false> extends BaseResource<C> {
  download<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/export/download`,
      options,
    );
  }

  // TODO: What does this return?
  import<E extends boolean = false>(
    content: Blob,
    name: string,
    path: string,
    {
      filename,
      parentId,
      ...options
    }: { parentId?: number; filename?: string } & Sudo & ShowExpanded<E> = {
      filename: `${Date.now().toString()}.tar.gz`,
    },
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(this, 'projects/import', {
      isForm: true,
      ...options,
      file: [content, filename],
      path,
      name,
      parentId,
    });
  }

  showExportStatus(projectId: string | number, options?: Sudo) {
    return RequestHelper.get<ExportStatusSchema>()(
      this,
      endpoint`projects/${projectId}/export`,
      options,
    );
  }

  showImportStatus(projectId: string | number, options?: Sudo) {
    return RequestHelper.get<ImportStatusSchema>()(
      this,
      endpoint`projects/${projectId}/import`,
      options,
    );
  }

  scheduleExport<E extends boolean = false>(
    projectId: string | number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    return RequestHelper.post<{ message: string }>()(
      this,
      endpoint`projects/${projectId}/export`,
      options,
    );
  }
}
