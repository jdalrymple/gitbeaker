import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Commits extends BaseService {
  @api('<projectId>', { options: true, method: 'GET' })
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits`, options);
  }

  @api('<projectId>', '<sha>', '<branch>', { method: 'POST' })
  cherryPick(projectId, sha, branch) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/commits/${sha}/cherry_pick`, { branch });
  }

  @api('<projectId>', '<sha>', { method: 'GET' })
  comments(projectId, sha) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/comments`);
  }

  @api('<projectId>', '<sha>', '<message>', '[actions]', { options: true, method: 'POST' })
  create(projectId, branch, message, actions = [], options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/commits`, {
      branch,
      commitMessage: message,
      actions,
      ...options,
    });
  }

  @api('<projectId>', '<sha>', '<note>', { options: true, method: 'POST' })
  createComment(projectId, sha, note, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/commits/${sha}/comments`, {
      note,
      ...options,
    });
  }

  @api('<projectId>', '<sha>', { method: 'GET' })
  diff(projectId, sha) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/diff`);
  }

  @api('<projectId>', '<sha>', { options: true, method: 'POST' })
  editStatus(projectId, sha, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/statuses/${sha}`, options);
  }

  @api('<projectId>', '<sha>', { method: 'GET' })
  references(projectId, sha) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/refs`);
  }

  @api('<projectId>', '<sha>', { options: true, method: 'GET' })
  show(projectId, sha, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}`, options);
  }

  @api('<projectId>', '<sha>', { options: true, method: 'GET' })
  status(projectId, sha, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/statuses`, options);
  }
}

export default Commits;
