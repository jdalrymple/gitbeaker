import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

type GroupProjectId = string | number;

class GroupProjects extends BaseService {
  all(groupId: GroupProjectId, options: RequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/projects`, options);
  }

  add(groupId: GroupProjectId, projectId: ProjectId) {
    const [gId, pId] = [groupId, projectId].map(encodeURIComponent);

    return RequestHelper.post(this, `groups/${gId}/projects/${pId}`);
  }
}

export default GroupProjects;
