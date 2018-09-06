import { BaseService, RequestHelper } from '../infrastructure';

class Issues extends BaseService {
  addSpentTime(projectId: ProjectId, issueId, duration) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/add_spent_time`, {
      duration,
    });
  }

  addTimeEstimate(projectId: ProjectId, issueId, duration) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/time_estimate`, {
      duration,
    });
  }

  all({ projectId, ...options }) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/issues` : 'issues';

    return RequestHelper.get(this, url, options);
  }

  create(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/issues`, options);
  }

  edit(projectId: ProjectId, issueId, options) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/issues/${iId}`, options);
  }

  link(projectId: ProjectId, issueIId, targetProjectId, targetIssueId, options = {}) {
    const [pId, iId] = [projectId, issueIId].map(encodeURIComponent);
    const [targetpId, targetIId] = [targetProjectId, targetIssueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/links`, {
      targetProjectId: targetpId,
      targetIssueId: targetIId,
      ...options,
    });
  }

  participants(projectId: ProjectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${iId}/participants`);
  }

  remove(projectId: ProjectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/issues/${iId}`);
  }

  resetSpentTime(projectId: ProjectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${mId}/reset_spent_time`);
  }

  resetTimeEstimate(projectId: ProjectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${mId}/reset_time_estimate`);
  }

  show(projectId: ProjectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${iId}`);
  }

  subscribe(projectId: ProjectId, issueId, options) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/subscribe`, options);
  }

  timeStats(projectId: ProjectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${mId}/time_stats`);
  }

  unsubscribe(projectId: ProjectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/issues/${iId}/unsubscribe`);
  }
}

export default Issues;
