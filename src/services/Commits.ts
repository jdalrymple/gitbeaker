import { BaseService, RequestHelper } from '../infrastructure';

class Commits extends BaseService {
  all(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits`, options);
  }

  cherryPick(projectId: ProjectId, sha, branch) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/commits/${sha}/cherry_pick`, { branch });
  }

  comments(projectId: ProjectId, sha) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/comments`);
  }

  create(projectId: ProjectId, branch, message, actions = [], options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/commits`, {
      branch,
      commitMessage: message,
      actions,
      ...options,
    });
  }

  createComment(projectId: ProjectId, sha, note, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/commits/${sha}/comments`, {
      note,
      ...options,
    });
  }

  diff(projectId: ProjectId, sha) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/diff`);
  }

  editStatus(projectId: ProjectId, sha, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/statuses/${sha}`, options);
  }

  references(projectId: ProjectId, sha) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/refs`);
  }

  show(projectId: ProjectId, sha, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}`, options);
  }

  status(projectId: ProjectId, sha, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/statuses`, options);
  }
}

export default Commits;
