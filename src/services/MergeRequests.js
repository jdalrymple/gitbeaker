import { BaseService, RequestHelper } from '../infrastructure';

class MergeRequests extends BaseService {
  accept(projectId, mergerequestId, options) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}/merge`, options);
  }

  approve(projectId, mergerequestId, { sha }) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/approve`, { sha });
  }

  approvals(projectId, { mergerequestId } = {}) {
    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId
      ? `merge_requests/${encodeURIComponent(mergerequestId)}`
      : '';

    return RequestHelper.get(this, `projects/${pId}/${mergeRequest}/approvals`);
  }

  all({ projectId, ...options } = {}) {
    const url = projectId
      ? `projects/${encodeURIComponent(projectId)}/merge_requests`
      : 'merge_requests';

    return RequestHelper.get(this, url, options);
  }

  cancelOnPipelineSucess(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.put(
      this,
      `projects/${pId}/merge_requests/${mId}/cancel_merge_when_pipeline_succeeds`,
    );
  }

  changes(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/changes`);
  }

  closesIssues(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/closes_issues`);
  }

  commits(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/commits`);
  }

  create(projectId, sourceBranch, targetBranch, title, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/merge_requests`, {
      id: pId,
      sourceBranch,
      targetBranch,
      title,
      ...options,
    });
  }

  edit(projectId, mergerequestId, options) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}`, options);
  }

  editApprovals(projectId, { mergerequestId, ...options }) {
    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId
      ? `merge_requests/${encodeURIComponent(mergerequestId)}/`
      : '';

    return RequestHelper.get(this, `projects/${pId}/${mergeRequest}approvals`, options);
  }

  editApprovers(projectId, { mergerequestId, ...options }) {
    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId
      ? `merge_requests/${encodeURIComponent(mergerequestId)}/`
      : '';

    return RequestHelper.get(this, `projects/${pId}/${mergeRequest}approvers`, options);
  }

  remove(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/merge_requests/${mId}`);
  }

  show(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}`);
  }

  subscribe(projectId, mergerequestId, options) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/subscribe`, options);
  }

  resetSpentTime(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/reset_spent_time`);
  }

  resetTimeEstimate(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/reset_time_estimate`);
  }

  spentTime(projectId, mergerequestId, duration) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/add_spent_time`, {
      duration,
    });
  }

  timeEstimate(projectId, mergerequestId, duration) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/time_estimate`, {
      duration,
    });
  }

  timeStats(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/time_stats`);
  }

  version(projectId, mergerequestId, versionId) {
    const [pId, mId, vId] = [projectId, mergerequestId, versionId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/versions/${vId}`);
  }

  versions(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/versions`);
  }

  unapprove(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/approve`);
  }

  unsubscribe(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/merge_requests/${mId}/unsubscribe`);
  }
}

export default MergeRequests;
