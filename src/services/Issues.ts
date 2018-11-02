import { BaseService, RequestHelper } from '../infrastructure';
import { IssueId } from './EpicIssues';
import { MergeRequestId } from './MergeRequests';
import { RequestOptions } from '../infrastructure/RequestHelper';

class Issues extends BaseService {
  addSpentTime(projectId: ProjectId, issueId: IssueId, duration: Duration) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/add_spent_time`, {
      duration,
    });
  }

  addTimeEstimate(projectId: ProjectId, issueId: IssueId, duration: Duration) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/time_estimate`, {
      duration,
    });
  }

  all({ projectId, ...options }: { projectId: ProjectId } & RequestOptions) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/issues` : 'issues';

    return RequestHelper.get(this, url, options);
  }

  create(projectId: ProjectId, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/issues`, options);
  }

  edit(projectId: ProjectId, issueId: IssueId, options: RequestOptions) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/issues/${iId}`, options);
  }

  link(
    projectId: ProjectId,
    issueIId: IssueId,
    targetProjectId: ProjectId,
    targetIssueId: IssueId,
    options = {},
  ) {
    const [pId, iId] = [projectId, issueIId].map(encodeURIComponent);
    const [targetpId, targetIId] = [targetProjectId, targetIssueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/links`, {
      targetProjectId: targetpId,
      targetIssueId: targetIId,
      ...options,
    });
  }

  participants(projectId: ProjectId, issueId: IssueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${iId}/participants`);
  }

  remove(projectId: ProjectId, issueId: IssueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/issues/${iId}`);
  }

  resetSpentTime(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${mId}/reset_spent_time`);
  }

  resetTimeEstimate(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${mId}/reset_time_estimate`);
  }

  show(projectId: ProjectId, issueId: IssueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${iId}`);
  }

  subscribe(projectId: ProjectId, issueId: IssueId, options: RequestOptions) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${iId}/subscribe`, options);
  }

  timeStats(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/issues/${mId}/time_stats`);
  }

  unsubscribe(projectId: ProjectId, issueId: IssueId) {
    const [pId, iId] = [projectId, issueId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/issues/${iId}/unsubscribe`);
  }
}

export default Issues;
