import { BaseService, RequestHelper } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId, IssueId } from '@typings';

class Issues extends BaseService {
  addSpentTime(projectId: ProjectId, issueId: IssueId, duration: string, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/add_spent_time`, {
      duration,
      ...options,
    });
  }

  addTimeEstimate(projectId: ProjectId, issueId: IssueId, duration: string, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/time_estimate`, {
      duration,
      ...options,
    });
  }

  all({ projectId, ...options }: { projectId: ProjectId } & PaginatedRequestOptions) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/issues` : 'issues';

    return RequestHelper.get(this, url, options);
  }

  create(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/issues`, options);
  }

  edit(projectId: ProjectId, issueId: IssueId, options?: BaseRequestOptions) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/issues/${iId}`, options);
  }

  link(
    projectId: ProjectId,
    issueIId: IssueId,
    targetProjectId: ProjectId,
    targetIssueId: IssueId,
    options?: BaseRequestOptions,
  ) {
    const [pId, iId] = [projectId, issueIId].map(encodeURIComponent);
    const [targetpId, targetIId] = [targetProjectId, targetIssueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/links`, {
      targetProjectId: targetpId,
      targetIssueId: targetIId,
      ...options,
    });
  }

  participants(projectId: ProjectId, issueId: IssueId, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${iId}/participants`, options);
  }

  remove(projectId: ProjectId, issueId: IssueId, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/issues/${iId}`, options);
  }

  resetSpentTime(projectId: ProjectId, issueId: IssueId, options?: BaseRequestOptions) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/reset_spent_time`, options);
  }

  resetTimeEstimate(projectId: ProjectId, issueId: IssueId, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/reset_time_estimate`, options);
  }

  show(projectId: ProjectId, issueId: IssueId, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${iId}`, options);
  }

  subscribe(projectId: ProjectId, issueId: IssueId, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/subscribe`, options);
  }

  timeStats(projectId: ProjectId, issueId: IssueId, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${iId}/time_stats`, options);
  }

  unsubscribe(projectId: ProjectId, issueId: IssueId, options?: Sudo) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/issues/${iId}/unsubscribe`, options);
  }
}

export default Issues;
