import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

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
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/export_relations/download`,
      {
        relation,
        ...options,
      },
    );
  }

  showExportStatus(projectId: string | number, options?: Sudo) {
    return RequestHelper.get<RelationsExportStatusSchema>()(
      this,
      endpoint`projects/${projectId}/export_relations/status`,
      options,
    );
  }

  scheduleExport<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    return RequestHelper.post<{ message: string }>()(
      this,
      endpoint`projects/${projectId}/export_relations`,
      options,
    );
  }
}
