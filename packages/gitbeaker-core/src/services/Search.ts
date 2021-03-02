import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, BaseRequestOptions } from '../infrastructure';

export class Search<C extends boolean = false> extends BaseService<C> {
  all(
    scope: string,
    search: string,
    {
      projectId,
      groupId,
      ...options
    }: { projectId?: string | number; groupId?: string | number } & BaseRequestOptions = {},
  ) {
    let url = '';

    if (projectId) {
      url += `projects/${encodeURIComponent(projectId)}/`;
    } else if (groupId) {
      url += `groups/${encodeURIComponent(groupId)}/`;
    }

    return RequestHelper.get()(this, `${url}search`, { scope, search, ...options });
  }
}
