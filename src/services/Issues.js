import { BaseService, RequestHelper } from '../infrastructure';

class Issues extends BaseService {
  all(projectId, options) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/issues` : 'issues';

    return RequestHelper.get(this, url, options);
  }

  create(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/issues`, options);
  }

  edit(projectId, issueId, options) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/issues/${iId}`, options);
  }

  link(projectId, issueIId, targetProjectId, targetIssueId, options = {}) {
    const [pId, iId] = [projectId, issueIId].map(encodeURIComponent);
    const [targetpId, targetIId] = [targetProjectId, targetIssueId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/issues/${iId}/links`,
      {
        targetProjectId: targetpId,
        targetIssueId: targetIId,
        ...options,
      },
    );
  }

  remove(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/issues/${iId}`);
  }

  show(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${iId}`);
  }

  subscribe(projectId, issueId, options) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/issues/${iId}/subscribe`,
      options,
    );
  }

  unsubscribe(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.delete(
      this,
      `projects/${pId}/issues/${iId}/unsubscribe`,
    );
  }
}

export default Issues;
