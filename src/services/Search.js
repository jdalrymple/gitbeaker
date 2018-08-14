import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Search extends BaseService {
  @api('<projectId>', '<groupId>', '<scope>', '<search>', { method: 'GET' })
  all(projectId, groupId, scope, search) {
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
