import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Issues extends BaseService {
  @api('<projectId>', '<issueId>', '<duration>', { method: 'POST' })
  addSpentTime(projectId, issueId, duration) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/add_spent_time`, {
      duration,
    });
  }

  @api('<projectId>', '<issueId>', '<duration>', { method: 'POST' })
  addTimeEstimate(projectId, issueId, duration) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/time_estimate`, {
      duration,
    });
  }

  @api('<projectId>', { options: true, method: 'GET' })
  all(projectId, options) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/issues` : 'issues';

    return RequestHelper.get(this, url, options);
  }

  @api('<projectId>', { options: true, method: 'POST' })
  create(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/issues`, options);
  }

  @api('<projectId>', '<issueId>', { options: true, method: 'PUT' })
  edit(projectId, issueId, options) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/issues/${iId}`, options);
  }

  @api('<projectId>', '<issueId>', '<targetProjectId>', '<targetIssueId>', { options: true, method: 'POST' })
  link(projectId, issueId, targetProjectId, targetIssueId, options = {}) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);
    const [targetpId, targetIId] = [targetProjectId, targetIssueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/links`, {
      targetProjectId: targetpId,
      targetIssueId: targetIId,
      ...options,
    });
  }

  @api('<projectId>', '<issueId>', { method: 'GET' })
  participants(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${iId}/participants`);
  }

  @api('<projectId>', '<issueId>', { method: 'POST' })
  remove(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/issues/${iId}`);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'POST' })
  resetSpentTime(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${mId}/reset_spent_time`);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'POST' })
  resetTimeEstimate(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${mId}/reset_time_estimate`);
  }

  @api('<projectId>', '<issueId>', { method: 'GET' })
  show(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${iId}`);
  }

  @api('<projectId>', '<issueId>', { options: true, method: 'POST' })
  subscribe(projectId, issueId, options) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/subscribe`, options);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'GET' })
  timeStats(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${mId}/time_stats`);
  }

  @api('<projectId>', '<issueId>', { method: 'DELETE' })
  unsubscribe(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/issues/${iId}/unsubscribe`);
  }
}

export default Issues;
