import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface RelationsExportStatusSchema extends Record<string, unknown> {
  relation: string;
  status: number;
  error?: string;
  updated_at: string;
}

export class ProjectRelationsExport<C extends boolean = false> extends BaseResource<C> {
  download<E extends boolean = false>(
    projectId: string | number,
    relation: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/export_relations/download`,
      {
        sudo,
        showExpanded,
        searchParams: {
          ...searchParams,
          relation,
        },
      },
    );
  }

  showExportStatus<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<RelationsExportStatusSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<RelationsExportStatusSchema>()(
      this,
      endpoint`projects/${projectId}/export_relations/status`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  scheduleExport<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<{ message: string }>()(
      this,
      endpoint`projects/${projectId}/export_relations`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }
}
