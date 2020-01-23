import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class EpicIssues extends BaseService {
  all(groupId: string | number, epicId: number, options?: PaginatedRequestOptions) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.get(this, `groups/${gId}/epics/${eId}/issues`, options);
  }

  assign(groupId: string | number, epicId: number, issueId: number, options?: Sudo) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `groups/${gId}/epics/${eId}/issues/${iId}`, options);
  }

  edit(groupId: string | number, epicId: number, issueId: number, options?: BaseRequestOptions) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.put(this, `groups/${gId}/epics/${eId}/issues/${iId}`, options);
  }

  remove(groupId: string | number, epicId: number, issueId: number, options?: Sudo) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.del(this, `groups/${gId}/epics/${eId}/issues/${iId}`, options);
  }
}
