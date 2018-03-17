import { BaseService, RequestHelper } from '../infrastructure';

class Commits extends BaseService {
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(
      this,
      `projects/${pId}/repository/commits`,
      options,
    );
  }

  allComments(projectId, sha) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(
      this,
      `projects/${pId}/repository/commits/${sha}/comments`,
    );
  }

  createComment(projectId, sha, note, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(
      this,
      `projects/${pId}/repository/commits/${sha}/comments`,
      Object.assign({ note }, options),
    );
  }

  diff(projectId, sha) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(
      this,
      `projects/${pId}/repository/commits/${sha}/diff`,
    );
  }

  show(projectId, sha) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}`);
  }

  statuses(projectId, sha, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(
      this,
      `projects/${pId}/repository/commits/${sha}/statuses`,
      options,
    );
  }
}

export default Commits;
