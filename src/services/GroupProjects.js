import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class GroupProjects extends BaseService {
  @api('<geonodeId>', { options: true, method: 'GET' })
  all(groupId, options) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/projects`, options);
  }

  @api('<groupId>', '<projectId>', { options: true, method: 'POST' })
  add(groupId, projectId) {
    const [gId, pId] = [groupId, projectId].map(encodeURIComponent);

    return RequestHelper.post(this, `groups/${gId}/projects/${pId}`);
  }
}

export default GroupProjects;
