import { BaseService, RequestHelper } from '../infrastructure';
import { BaseRequestOptions, ProjectId, GroupId } from '@src/types';

class Search extends BaseService {
  all(
    scope: string,
    search: string,
    {
      projectId,
      groupId,
      ...options
    }: { projectId?: ProjectId; groupId?: GroupId } & BaseRequestOptions,
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

export default Search;
