import { BaseService, RequestHelper } from '../infrastructure';

class Tags extends BaseService {
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/tags`, options);
  }

  create(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/tags`, options);
  }

  remove(projectId, tagName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(
      this,
      `projects/${pId}/repository/tags/${encodeURI(tagName)}`,
    );
  }

  show(projectId, tagName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(
      this,
      `projects/${pId}/repository/tags/${encodeURI(tagName)}`,
    );
  }
}

export default Tags;
