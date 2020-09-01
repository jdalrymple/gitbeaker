import { BaseService } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, PaginatedRequestOptions, RequestHelper } from '../infrastructure';
import { ProjectSchema } from './Projects';

export class GroupProjects extends BaseService {
  all(groupId: string | number, options?: PaginatedRequestOptions): Promise<ProjectSchema[]> {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get(this, `groups/${gId}/projects`, options) as Promise<ProjectSchema[]>;
  }

  add(groupId: string | number, projectId: string | number, options?: BaseRequestOptions) {
    const [gId, pId] = [groupId, projectId].map(encodeURIComponent);

    return RequestHelper.post(this, `groups/${gId}/projects/${pId}`, options);
  }
}
