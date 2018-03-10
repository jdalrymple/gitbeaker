import { BaseService, RequestHelper } from '../infrastructure';

export class Issues extends BaseService {
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    if (projectId) {
      return RequestHelper.get(this, `projects/${pId}/issues`, options);
    }

    return RequestHelper.get(this, 'issues', options);
  }

  create(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/issues`, options);
  }

  edit(projectId, issueId, options = {}) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/issues/${iId}`, options);
  }

  link(projectId, issueIId, targetProjectId, targetIssueId, options = {}) {
    const [pId, iId] = [projectId, issueIId].map(encodeURIComponent);
    const [targetpId, targetIId] = [targetProjectId, targetIssueId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/issues/${iId}/links`,
      Object.assign(
        { target_project_id: targetpId, target_issue_id: targetIId },
        options,
      ),
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

  subscribe(projectId, issueId, options = {}) {
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
