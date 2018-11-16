import { BaseService, RequestHelper } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, GroupProjectId, ProjectId } from '@typings';

class GroupProjects extends BaseService {
  all(groupId: GroupProjectId, options?: PaginatedRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/projects`, options);
  }

  add(groupId: GroupProjectId, projectId: ProjectId, options?: BaseRequestOptions) {
    const [gId, pId] = [groupId, projectId].map(encodeURIComponent);

    return RequestHelper.post(this, `groups/${gId}/projects/${pId}`, options);
  }
}

export default GroupProjects;
