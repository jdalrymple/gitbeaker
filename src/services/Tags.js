import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Tags extends BaseService {
  @api('<projectId>', { options: true, method: 'GET' })
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/tags`, options);
  }

  @api('<projectId>', { options: true, method: 'POST' })
  create(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/tags`, options);
  }

  @api('<projectId>', '<tagName>', { method: 'DELETE' })
  remove(projectId, tagName) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/repository/tags/${tId}`);
  }

  @api('<projectId>', '<tagName>', { method: 'GET' })
  show(projectId, tagName) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/tags/${tId}`);
  }
}

export default Tags;
