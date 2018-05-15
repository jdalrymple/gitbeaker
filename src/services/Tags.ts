import { BaseService, RequestHelper } from '../infrastructure';

class Tags extends BaseService {
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/tags`, options);
  }

  create(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/tags`, options);
  }

  remove(projectId, tagName) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/repository/tags/${tId}`);
  }

  show(projectId, tagName) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/tags/${tId}`);
  }
}

export default Tags;
