import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { GroupId, ProjectId, LabelId } from '.';

class Labels extends BaseService {
  all({
    projectId,
    groupId,
    ...options
  }: ({ projectId: ProjectId } | { groupId: GroupId } | {}) & PaginatedRequestOptions) {
    let url;
    
    if (projectId) {
      url = `projects/${encodeURIComponent(projectId)}/labels`;
    }
    else if (groupId) {
      url = `groups/${encodeURIComponent(groupId)}/labels`;
    }

    return RequestHelper.get(this, url, options);
  }

  create(projectId: ProjectId, labelName: string, color: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/labels`, {
      name: labelName,
      color,
      ...options,
    });
  }

  edit(projectId: ProjectId, labelName: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/labels`, { name: labelName, ...options });
  }

  remove(projectId: ProjectId, labelName: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del(this, `projects/${pId}/labels`, { name: labelName, ...options });
  }

  subscribe(projectId: ProjectId, labelId: LabelId, options?: Sudo) {
    const [pId, lId] = [projectId, labelId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${lId}/subscribe`, options);
  }

  unsubscribe(projectId: ProjectId, labelId: LabelId, options?: Sudo) {
    const [pId, lId] = [projectId, labelId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/issues/${lId}/unsubscribe`, options);
  }
}

export default Labels;
