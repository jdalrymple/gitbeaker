import { BaseService, RequestHelper } from '../infrastructure';

class Search extends BaseService {
  all(scope, search, { projectId, groupId } = {}) {
    let url = '';

    if (projectId) {
      url += `projects/${encodeURIComponent(projectId)}/`;
    } else if (groupId) {
      url += `groups/${encodeURIComponent(groupId)}/`;
    }

    return RequestHelper.get(this, `${url}search`, { scope, search });
  }
}

export default Search;
