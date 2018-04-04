import { BaseService, RequestHelper } from '../infrastructure';

class EpicIssues extends BaseService {
  all(groupId, epicId) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.get(this, `groups/${gId}/epics/${eId}/issues`);
  }

  assign(groupId, epicId, issueId) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.put(this, `groups/${gId}/epics/${eId}/issues/${iId}`);
  }

  edit(groupId, epicId, issueId, options) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.delete(this, `groups/${gId}/epics/${eId}/issues/${iId}`, options);
  }

  remove(groupId, epicId, issueId) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.delete(this, `groups/${gId}/epics/${eId}/issues/${iId}`);
  }
}

export default EpicIssues;
