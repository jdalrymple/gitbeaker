import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

export type EpicId = string | number;
export type IssueId = string | number;

class EpicIssues extends BaseService {
  all(groupId: GroupId, epicId: EpicId) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.get(this, `groups/${gId}/epics/${eId}/issues`);
  }

  assign(groupId: GroupId, epicId: EpicId, issueId: IssueId) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.put(this, `groups/${gId}/epics/${eId}/issues/${iId}`);
  }

  edit(groupId: GroupId, epicId: EpicId, issueId: IssueId, options: RequestOptions) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.delete(this, `groups/${gId}/epics/${eId}/issues/${iId}`, options);
  }

  remove(groupId: GroupId, epicId: EpicId, issueId: IssueId) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.delete(this, `groups/${gId}/epics/${eId}/issues/${iId}`);
  }
}

export default EpicIssues;
