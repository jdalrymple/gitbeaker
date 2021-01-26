import { BaseService } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, PaginatedRequestOptions, RequestHelper } from '../infrastructure';
import { ProjectSchema } from './Projects';

export class GroupProjects<C extends boolean = false> extends BaseService<C> {
  all(groupId: string | number, options?: PaginatedRequestOptions): Promise<ProjectSchema[]> {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get<C>(this, `groups/${gId}/projects`, options) as Promise<
      ProjectSchema<C>[]
    >;
  }

  add(groupId: string | number, projectId: string | number, options?: BaseRequestOptions) {
    const [gId, pId] = [groupId, projectId].map(encodeURIComponent);

    return RequestHelper.post<C>(this, `groups/${gId}/projects/${pId}`, options);
  }
}
