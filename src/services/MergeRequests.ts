import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

export type MergeRequestId = string | number;

class MergeRequests extends BaseService {
  accept(projectId: ProjectId, mergerequestId: MergeRequestId, options: RequestOptions) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}/merge`, options);
  }

  addSpentTime(projectId: ProjectId, mergerequestId: MergeRequestId, duration: Duration) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${mId}/add_spent_time`, {
      duration,
    });
  }

  addTimeEstimate(projectId: ProjectId, mergerequestId: MergeRequestId, duration: Duration) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${mId}/time_estimate`, {
      duration,
    });
  }

  approve(projectId: ProjectId, mergerequestId: MergeRequestId, { sha }: { sha: string }) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/approve`, { sha });
  }

  approvals(projectId: ProjectId, { mergerequestId }: { mergerequestId?: MergeRequestId } = {}) {
    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}` : '';

    return RequestHelper.get(this, `projects/${pId}/${mergeRequest}/approvals`);
  }

  all({ projectId, ...options }: { projectId?: ProjectId } = {}) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/merge_requests` : 'merge_requests';

    return RequestHelper.get(this, url, options);
  }

  cancelOnPipelineSucess(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}/cancel_merge_when_pipeline_succeeds`);
  }

  changes(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/changes`);
  }

  closesIssues(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/closes_issues`);
  }

  commits(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/commits`);
  }

  create(
    projectId: ProjectId,
    sourceBranch: string,
    targetBranch: string,
    title: string,
    options: RequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/merge_requests`, {
      id: pId,
      sourceBranch,
      targetBranch,
      title,
      ...options,
    });
  }

  edit(projectId: ProjectId, mergerequestId: MergeRequestId, options: RequestOptions) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}`, options);
  }

  editApprovals(projectId: ProjectId, { mergerequestId, ...options }: temporaryAny) {
    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}/` : '';

    return RequestHelper.post(this, `projects/${pId}/${mergeRequest}approvals`, options);
  }

  editApprovers(projectId: ProjectId, { mergerequestId, ...options }: temporaryAny) {
    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}/` : '';

    return RequestHelper.put(this, `projects/${pId}/${mergeRequest}approvers`, options);
  }

  participants(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/participants`);
  }

  pipelines(projectId: ProjectId, { mergerequestId }: { mergerequestId?: string } = {}) {
    const pId = encodeURIComponent(projectId);
    const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}` : '';

    return RequestHelper.get(this, `projects/${pId}/${mergeRequest}/pipelines`);
  }

  remove(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/merge_requests/${mId}`);
  }

  resetSpentTime(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/reset_spent_time`);
  }

  resetTimeEstimate(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/reset_time_estimate`);
  }

  show(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}`);
  }

  timeStats(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/time_stats`);
  }

  version(projectId: ProjectId, mergerequestId: MergeRequestId, versionId: string | number) {
    const [pId, mId, vId] = [projectId, mergerequestId, versionId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/versions/${vId}`);
  }

  versions(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/versions`);
  }

  unapprove(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/approve`);
  }

  unsubscribe(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/merge_requests/${mId}/unsubscribe`);
  }
}

export default MergeRequests;
