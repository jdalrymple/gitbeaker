import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class EpicIssues extends BaseService {
  @api('<projectId>', '<epicId>', { method: 'GET' })
  all(groupId, epicId) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.get(this, `groups/${gId}/epics/${eId}/issues`);
  }

  @api('<groupId>', '<epicId>', '<issueId>', { method: 'PUT' })
  assign(groupId, epicId, issueId) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.put(this, `groups/${gId}/epics/${eId}/issues/${iId}`);
  }

  @api('<groupId>', '<epicId>', '<issueId>', { options: true, method: 'DELETE' })
  edit(groupId, epicId, issueId, options) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.delete(this, `groups/${gId}/epics/${eId}/issues/${iId}`, options);
  }

  @api('<groupId>', '<epicId>', '<issueId>', { method: 'DELETE' })
  remove(groupId, epicId, issueId) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.delete(this, `groups/${gId}/epics/${eId}/issues/${iId}`);
  }
}

export default EpicIssues;
