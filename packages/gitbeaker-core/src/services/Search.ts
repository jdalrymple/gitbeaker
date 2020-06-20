import { BaseService, RequestHelper, BaseRequestOptions } from '../infrastructure';

export class Search extends BaseService {
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

    return RequestHelper.get(this, `${url}search`, { scope, search, ...options });
  }
}
