import { BaseService } from '@gitbeaker/requester-utils';
import { IssueSchema } from './Issues';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface EpicIssueSchema
  extends Exclude<IssueSchema, 'references' | 'task_completion_status'> {
  epic_issue_id: number;
}

export class EpicIssues<C extends boolean = false> extends BaseService<C> {
  all(groupId: string | number, epicIId: number, options?: PaginatedRequestOptions) {
    const [gId, eId] = [groupId, epicIId].map(encodeURIComponent);

    return RequestHelper.get<EpicIssueSchema[]>()(
      this,
      `groups/${gId}/epics/${eId}/issues`,
      options,
    );
  }

  assign(groupId: string | number, epicIId: number, epicIssueId: number, options?: Sudo) {
    const [gId, eId, iId] = [groupId, epicIId, epicIssueId].map(encodeURIComponent);

    return RequestHelper.post<EpicIssueSchema>()(
      this,
      `groups/${gId}/epics/${eId}/issues/${iId}`,
      options,
    );
  }

  edit(
    groupId: string | number,
    epicIId: number,
    epicIssueId: number,
    options?: BaseRequestOptions,
  ) {
    const [gId, eId, iId] = [groupId, epicIId, epicIssueId].map(encodeURIComponent);

    return RequestHelper.put<EpicIssueSchema>()(
      this,
      `groups/${gId}/epics/${eId}/issues/${iId}`,
      options,
    );
  }

  remove(groupId: string | number, epicIId: number, epicIssueId: number, options?: Sudo) {
    const [gId, eId, iId] = [groupId, epicIId, epicIssueId].map(encodeURIComponent);

    return RequestHelper.del()(this, `groups/${gId}/epics/${eId}/issues/${iId}`, options);
  }
}
