import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class MergeRequests extends BaseService {
  @api('<projectId>', '<mergerequestId>', { options: true, method: 'PUT' })
  accept(projectId, mergerequestId, options) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}/merge`, options);
  }

  @api('<projectId>', '<mergerequestId>', '<duration>', { method: 'POST' })
  addSpentTime(projectId, mergerequestId, duration) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${mId}/add_spent_time`, {
      duration,
    });
  }

  @api('<projectId>', '<mergerequestId>', '<duration>', { method: 'POST' })
  addTimeEstimate(projectId, mergerequestId, duration) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${mId}/time_estimate`, {
      duration,
    });
  }

  @api('<projectId>', '<mergerequestId>', '<sha>', { method: 'POST' })
  approve(projectId, mergerequestId, sha) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/approve`, { sha });
  }

  @api('<projectId>', '<mergerequestId>', { method: 'GET' })
  approvals(projectId, mergerequestId) {
    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}` : '';

    return RequestHelper.get(this, `projects/${pId}/${mergeRequest}/approvals`);
  }

  @api('<projectId>', { options: true, method: 'GET' })
  all(projectId, options) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/merge_requests` : 'merge_requests';

    return RequestHelper.get(this, url, options);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'PUT' })
  cancelOnPipelineSucess(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}/cancel_merge_when_pipeline_succeeds`);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'GET' })
  changes(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/changes`);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'GET' })
  closesIssues(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/closes_issues`);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'GET' })
  commits(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/commits`);
  }

  @api('<projectId>', '<sourceBranch>', '<targetBranch>', '<title>', { options: true, method: 'POST' })
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

  @api('<projectId>', '<mergerequestId>', { options: true, method: 'PUT' })
  edit(projectId, mergerequestId, options) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}`, options);
  }

  @api('<projectId>', '<mergerequestId>', { options: true, method: 'POST' })
  editApprovals(projectId, mergerequestId, options) {
    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}` : '';

    return RequestHelper.post(this, `projects/${pId}/${mergeRequest}approvals`, options);
  }

  @api('<projectId>', '<mergerequestId>', { options: true, method: 'PUT' })
  editApprovers(projectId, mergerequestId, options) {
    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}` : '';

    return RequestHelper.put(this, `projects/${pId}/${mergeRequest}approvers`, options);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'PUT' })
  pipelines(projectId, mergerequestId) {
    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}` : '';

    return RequestHelper.get(this, `projects/${pId}/${mergeRequest}/pipelines`);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'DELETE' })
  remove(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/merge_requests/${mId}`);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'POST' })
  resetSpentTime(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/reset_spent_time`);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'POST' })
  resetTimeEstimate(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/reset_time_estimate`);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'GET' })
  show(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}`);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'GET' })
  timeStats(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/time_stats`);
  }

  @api('<projectId>', '<mergerequestId>', '<versionId>', { method: 'GET' })
  version(projectId, mergerequestId, versionId) {
    const [pId, mId, vId] = [projectId, mergerequestId, versionId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/versions/${vId}`);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'GET' })
  versions(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/versions`);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'POST' })
  unapprove(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/approve`);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'DELETE' })
  unsubscribe(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/merge_requests/${mId}/unsubscribe`);
  }
}

export default MergeRequests;
