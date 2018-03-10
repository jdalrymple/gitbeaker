import { BaseService, RequestHelper } from '../infrastructure';

export class MergeRequests extends BaseService {
  accept(projectId, mergerequestId, options = {}) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.put(
      this,
      `projects/${pId}/merge_requests/${mId}/merge`,
      options,
    );
  }

  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    if (projectId) {
      return RequestHelper.get(this, `projects/${pId}/merge_requests`, options);
    }

    return RequestHelper.get(this, 'merge_requests', options);
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

    return RequestHelper.get(
      this,
      `projects/${pId}/merge_requests/${mId}/changes`,
    );
  }

  closesIssues(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/merge_requests/${mId}/closes_issues`,
    );
  }

  commits(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/merge_requests/${mId}/commits`,
    );
  }

  create(projectId, sourceBranch, targetBranch, title, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(
      this,
      `projects/${pId}/merge_requests`,
      Object.assign(
        {
          id: pId,
          source_branch: sourceBranch,
          target_branch: targetBranch,
          title,
        },
        options,
      ),
    );
  }

  createTodo(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/merge_requests/${mId}/todo`,
    );
  }

  edit(projectId, mergerequestId, options = {}) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.put(
      this,
      `projects/${pId}/merge_requests/${mId}`,
      options,
    );
  }

  remove(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/merge_requests/${mId}`);
  }

  show(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}`);
  }

  subscribe(projectId, mergerequestId, options = {}) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/merge_requests/${mId}/subscribe`,
      options,
    );
  }

  resetSpentTime(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/merge_requests/${mId}/reset_spent_time`,
    );
  }

  resetTimeEstimate(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/merge_requests/${mId}/reset_time_estimate`,
    );
  }

  spentTime(projectId, mergerequestId, duration) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/merge_requests/${mId}/add_spent_time`,
      { duration },
    );
  }

  timeEstimate(projectId, mergerequestId, duration) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/merge_requests/${mId}/time_estimate`,
      { duration },
    );
  }

  timeStats(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/merge_requests/${mId}/time_stats`,
    );
  }

  unsubscribe(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.delete(
      this,
      `projects/${pId}/merge_requests/${mId}/unsubscribe`,
    );
  }
}

export default MergeRequests;
