import { BaseService, RequestHelper } from '../infrastructure';

export class GroupProjects extends BaseService {
  all(groupId, options = {}) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/projects`, options);
  }

  add(groupId, projectId) {
    const [gId, pId] = [groupId, projectId].map(encodeURIComponent);

    return RequestHelper.post(this, `groups/${gId}/projects/${pId}`);
  }
}

export default GroupProjects;
