import { BaseResource } from '@gitbeaker/requester-utils';
import { IssueSchema } from './Issues';
import {
  BaseRequestOptions,
  endpoint,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface EpicIssueSchema
  extends Omit<IssueSchema, 'references' | 'task_completion_status'> {
  epic_issue_id: number;
}

export class EpicIssues<C extends boolean = false> extends BaseResource<C> {
  all(groupId: string | number, epicIId: number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<EpicIssueSchema[]>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/issues`,
      options,
    );
  }

  assign(groupId: string | number, epicIId: number, epicIssueId: number, options?: Sudo) {
    return RequestHelper.post<EpicIssueSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/issues/${epicIssueId}`,
      options,
    );
  }

  edit(
    groupId: string | number,
    epicIId: number,
    epicIssueId: number,
    options?: BaseRequestOptions,
  ) {
    return RequestHelper.put<EpicIssueSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/issues/${epicIssueId}`,
      options,
    );
  }

  remove(groupId: string | number, epicIId: number, epicIssueId: number, options?: Sudo) {
    return RequestHelper.del()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/issues/${epicIssueId}`,
      options,
    );
  }
}
