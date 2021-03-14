import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  ShowExpanded,
  PaginatedRequestOptions,
  RequestHelper,
} from '../infrastructure';
import { ProjectSchema } from './Projects';

export class GroupProjects<C extends boolean = false> extends BaseService<C> {
  all(groupId: string | number, options?: PaginatedRequestOptions) {
    const gId = encodeURIComponent(groupId);

    return RequestHelper.get<ProjectSchema[]>()(this, `groups/${gId}/projects`, options);
  }

  add(
    groupId: string | number,
    projectId: string | number,
    options?: BaseRequestOptions & ShowExpanded,
  ) {
    const [gId, pId] = [groupId, projectId].map(encodeURIComponent);

    return RequestHelper.post()(this, `groups/${gId}/projects/${pId}`, options);
  }
}
