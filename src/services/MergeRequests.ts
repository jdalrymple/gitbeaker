import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import {
  AcceptMergeRequestOptions,
  CreateMergeRequestOptions,
  GroupId,
  MergeRequestId,
  ProjectId,
  ShowMergeRequestOptions,
  UpdateMergeRequestOptions,
  UserId,
} from '.';

class MergeRequests extends BaseService {
  accept(
    projectId: ProjectId,
    mergerequestIId: MergeRequestId,
    options?: AcceptMergeRequestOptions & BaseRequestOptions,
  ) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mIId}/merge`, options);
  }

  addSpentTime(
    projectId: ProjectId,
    mergerequestIId: MergeRequestId,
    duration: string,
    options?: Sudo,
  ) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mIId}/add_spent_time`, {
      duration,
      ...options,
    });
  }

  addTimeEstimate(
    projectId: ProjectId,
    mergerequestIId: MergeRequestId,
    duration: string,
    options?: Sudo,
  ) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mIId}/time_estimate`, {
      duration,
      ...options,
    });
  }

  all({
    projectId,
    groupId,
    ...options
  }: ({ projectId: ProjectId } | { groupId: GroupId } | {}) & PaginatedRequestOptions) {
    let url;

    if (projectId) {
      url = `projects/${encodeURIComponent(projectId)}/merge_requests`;
    } else if (groupId) {
      url = `groups/${encodeURIComponent(groupId)}/merge_requests`;
    } else {
      url = 'merge_requests';
    }

    return RequestHelper.get(this, url, options);
  }

  approve(
    projectId: ProjectId,
    mergerequestIId: MergeRequestId,
    options: { sha?: string } & BaseRequestOptions,
  ) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mIId}/approve`, options);
  }

  approvals(
    projectId: ProjectId,
    { mergerequestIId, ...options }: { mergerequestIId?: MergeRequestId } & BaseRequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    let url;

    if (mergerequestIId) {
      const  mIId = encodeURIComponent(mergerequestIId);
      url = `projects/${pId}/merge_requests/${mIId}/approvals`;
    } else {
      url = `projects/${pId}/approvals`;
    }

    return RequestHelper.get(this, url, options);
  }

  approvers(
    projectId: ProjectId,
    approverIds: UserId[],
    approverGroupIds: GroupId[],
    { mergerequestIId, ...options }: { mergerequestIId?: MergeRequestId } & BaseRequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    let url;

    if (mergerequestIId) {
      const  mIId = encodeURIComponent(mergerequestIId);
      url = `projects/${pId}/merge_requests/${mIId}/approvers`;
    } else {
      url = `projects/${pId}/approvers`;
    }

    return RequestHelper.put(this, url, { approverIds, approverGroupIds, ...options });
  }

  cancelOnPipelineSucess(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.put(
      this,
      `projects/${pId}/merge_requests/${mIId}/cancel_merge_when_pipeline_succeeds`,
      options,
    );
  }

  changes(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIId}/changes`, options);
  }

  closesIssues(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIId}/closes_issues`, options);
  }

  commits(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIId}/commits`, options);
  }

  create(
    projectId: ProjectId,
    sourceBranch: string,
    targetBranch: string,
    title: string,
    options?: CreateMergeRequestOptions & BaseRequestOptions,
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

  edit(
    projectId: ProjectId,
    mergerequestIId: MergeRequestId,
    options?: UpdateMergeRequestOptions & BaseRequestOptions,
  ) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mIId}`, options);
  }

  editApprovals(
    projectId: ProjectId,
    { mergerequestIId, ...options }: { mergerequestIId?: MergeRequestId } & BaseRequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    let url;

    if (mergerequestIId) {
      const  mIId = encodeURIComponent(mergerequestIId);
      url = `projects/${pId}/merge_requests/${mIId}/approvals`;
    } else {
      url = `projects/${pId}/approvals`;
    }

    return RequestHelper.post(this, url, options);
  }

  participants(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIId}/participants`, options);
  }

  pipelines(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIId}/pipelines`, options);
  }

  remove(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/merge_requests/${mIId}`, options);
  }

  resetSpentTime(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/merge_requests/${mIId}/reset_spent_time`,
      options,
    );
  }

  resetTimeEstimate(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/merge_requests/${mIId}/reset_time_estimate`,
      options,
    );
  }

  show(
    projectId: ProjectId,
    mergerequestIId: MergeRequestId,
    options?: ShowMergeRequestOptions & BaseRequestOptions,
  ) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIId}`, options);
  }

  timeStats(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIId}/time_stats`, options);
  }

  version(
    projectId: ProjectId,
    mergerequestIId: MergeRequestId,
    versionId: number,
    options?: Sudo,
  ) {
    const [pId, mIId, vId] = [projectId, mergerequestIId, versionId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/merge_requests/${mIId}/versions/${vId}`,
      options,
    );
  }

  versions(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIId}/versions`, options);
  }

  unapprove(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mIId}/approve`, options);
  }

  unsubscribe(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/merge_requests/${mIId}/unsubscribe`, options);
  }
}

export default MergeRequests;
