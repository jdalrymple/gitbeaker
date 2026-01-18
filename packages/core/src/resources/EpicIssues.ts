import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { IssueSchema } from './Issues';

export interface EpicIssueSchema extends MappedOmit<
  IssueSchema,
  'references' | 'task_completion_status'
> {
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
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<EpicIssueSchema[], C, E, P>> {
    return RequestHelper.get<EpicIssueSchema[]>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/issues`,
      options,
    );
  }

  assign<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    epicIssueId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<EpicIssueSchema, C, E, void>> {
    return RequestHelper.post<EpicIssueSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/issues/${epicIssueId}`,
      options,
    );
  }

  edit<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    epicIssueId: number,
    options?: { moveBeforeId?: number; moveAfterId?: number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedEpicIssueSchema, C, E, void>> {
    return RequestHelper.put<ExpandedEpicIssueSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/issues/${epicIssueId}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    epicIssueId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/issues/${epicIssueId}`,
      options,
    );
  }
}
