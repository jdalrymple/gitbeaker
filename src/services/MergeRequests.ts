import { BaseService, RequestHelper } from '../infrastructure';

class MergeRequests extends BaseService {
  accept(projectId: ProjectId, mergerequestId, options) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}/merge`, options);
  }

  addSpentTime(projectId: ProjectId, mergerequestId, duration) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${mId}/add_spent_time`, {
      duration,
    });
  }

  addTimeEstimate(projectId: ProjectId, mergerequestId, duration) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${mId}/time_estimate`, {
      duration,
    });
  }

  approve(projectId: ProjectId, mergerequestId, { sha }) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/approve`, { sha });
  }

  approvals(projectId: ProjectId, { mergerequestId }: { mergerequestId?: string } = {}) {
    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}` : '';

    return RequestHelper.get(this, `projects/${pId}/${mergeRequest}/approvals`);
  }

  all({ projectId, ...options }: { projectId?: ProjectId } = {}) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/merge_requests` : 'merge_requests';

    return RequestHelper.get(this, url, options);
  }

  cancelOnPipelineSucess(projectId: ProjectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}/cancel_merge_when_pipeline_succeeds`);
  }

  changes(projectId: ProjectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/changes`);
  }

  closesIssues(projectId: ProjectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/closes_issues`);
  }

  commits(projectId: ProjectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/commits`);
  }

  create(projectId: ProjectId, sourceBranch, targetBranch, title, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/merge_requests`, {
      id: pId,
      sourceBranch,
      targetBranch,
      title,
      ...options,
    });
  }

  edit(projectId: ProjectId, mergerequestId, options) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}`, options);
  }

  editApprovals(projectId: ProjectId, { mergerequestId, ...options }) {
    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}` : '';

    return RequestHelper.post(this, `projects/${pId}/${mergeRequest}approvals`, options);
  }

  editApprovers(projectId: ProjectId, { mergerequestId, ...options }) {
    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}` : '';

    return RequestHelper.put(this, `projects/${pId}/${mergeRequest}approvers`, options);
  }

  pipelines(projectId: ProjectId, { mergerequestId }: { mergerequestId?: string } = {}) {
    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}` : '';

    return RequestHelper.get(this, `projects/${pId}/${mergeRequest}/pipelines`);
  }

  remove(projectId: ProjectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/merge_requests/${mId}`);
  }

  resetSpentTime(projectId: ProjectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/reset_spent_time`);
  }

  resetTimeEstimate(projectId: ProjectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/reset_time_estimate`);
  }

  show(projectId: ProjectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}`);
  }

  timeStats(projectId: ProjectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/time_stats`);
  }

  version(projectId: ProjectId, mergerequestId, versionId) {
    const [pId, mId, vId] = [projectId, mergerequestId, versionId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/versions/${vId}`);
  }

  versions(projectId: ProjectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/versions`);
  }

  unapprove(projectId: ProjectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/approve`);
  }

  unsubscribe(projectId: ProjectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/merge_requests/${mId}/unsubscribe`);
  }
}

export default MergeRequests;
