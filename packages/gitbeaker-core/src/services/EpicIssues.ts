import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class EpicIssues<C extends boolean> extends BaseService<C> {
  all(groupId: string | number, epicId: number, options?: PaginatedRequestOptions) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.get<C>(this, `groups/${gId}/epics/${eId}/issues`, options);
  }

  assign(groupId: string | number, epicId: number, issueId: number, options?: Sudo) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.post<C>(this, `groups/${gId}/epics/${eId}/issues/${iId}`, options);
  }

  edit(groupId: string | number, epicId: number, issueId: number, options?: BaseRequestOptions) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.put<C>(this, `groups/${gId}/epics/${eId}/issues/${iId}`, options);
  }

  remove(groupId: string | number, epicId: number, issueId: number, options?: Sudo) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.del<C>(this, `groups/${gId}/epics/${eId}/issues/${iId}`, options);
  }
}
