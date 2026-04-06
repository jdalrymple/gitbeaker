import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { IssueSchema } from './Issues';

export interface EpicIssueSchema
  extends MappedOmit<IssueSchema, 'references' | 'task_completion_status'> {
  epic_issue_id: number;
}

export interface ExpandedEpicIssueSchema extends EpicIssueSchema {
  subscribed: boolean;
  relative_position: number;
}

export class EpicIssues<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    epicIId: number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<EpicIssueSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<EpicIssueSchema[]>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/issues`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
      },
    );
  }

  assign<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    epicIssueId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<EpicIssueSchema, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.post<EpicIssueSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/issues/${epicIssueId}`,
      {
        showExpanded,
        sudo,
      },
    );
  }

  edit<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    epicIssueId: number,
    options?: { moveBeforeId?: number; moveAfterId?: number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedEpicIssueSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ExpandedEpicIssueSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/issues/${epicIssueId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    epicIssueId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { showExpanded, sudo } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/issues/${epicIssueId}`,
      {
        showExpanded,
        sudo,
      },
    );
  }
}
