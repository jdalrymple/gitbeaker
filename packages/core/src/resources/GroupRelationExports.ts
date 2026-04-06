import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface GroupRelationExportStatusSchema extends Record<string, unknown> {
  relation: string;
  status: number;
  error?: string;
  updated_at: string;
}

export class GroupRelationExports<C extends boolean = false> extends BaseResource<C> {
  download<E extends boolean = false>(
    groupId: string | number,
    relation: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<Blob>()(this, endpoint`groups/${groupId}/export_relations/download`, {
      sudo,
      showExpanded,
      searchParams: { relation },
    });
  }

  exportStatus<E extends boolean = false>(
    groupId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupRelationExportStatusSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<GroupRelationExportStatusSchema[]>()(
      this,
      endpoint`groups/${groupId}/export_relations`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  scheduleExport<E extends boolean = false>(
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo & BaseRequestSearchParams,
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
