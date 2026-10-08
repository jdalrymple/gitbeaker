import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface GroupRelationExportBatchSchema extends Record<string, unknown> {
  status: number;
  batch_number: number;
  objects_count: number;
  error: string | null;
  updated_at: string;
}

export interface GroupRelationExportStatusSchema extends Record<string, unknown> {
  relation: string;
  status: number;
  error: string | null;
  updated_at: string;
  batched: boolean;
  batches_count: number;
  batches?: GroupRelationExportBatchSchema[];
}

export class GroupRelationExports<C extends boolean = false> extends BaseResource<C> {
  download<E extends boolean = false>(
    groupId: string | number,
    relation: string,
    options?: { batched?: boolean; batchNumber?: number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<Blob>()(this, endpoint`groups/${groupId}/export_relations/download`, {
      sudo,
      showExpanded,
      searchParams: { ...searchParams, relation },
    });
  }

  exportStatus<E extends boolean = false>(
    groupId: string | number,
    options?: { relation?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupRelationExportStatusSchema[], C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<GroupRelationExportStatusSchema[]>()(
      this,
      endpoint`groups/${groupId}/export_relations/status`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  scheduleExport<E extends boolean = false>(
    groupId: string | number,
    options?: { batched?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<{ message: string }, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<{ message: string }>()(
      this,
      endpoint`groups/${groupId}/export_relations`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }
}
