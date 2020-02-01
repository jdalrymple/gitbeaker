import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface AcceptMergeRequestOptions {
  merge_commit_message?: string;
  squash_commit_message?: string;
  squash?: boolean;
  should_remove_source_branch?: boolean;
  merge_when_pipeline_succeeds?: boolean;
  sha?: string;
}

export interface ShowMergeRequestOptions {
  render_html?: boolean;
  include_diverged_commits_count?: true;
  include_rebase_in_progress?: boolean;
}

export interface CreateMergeRequestOptions {
  assignee_id?: number;
  description?: string;
  target_project_id?: number;
  labels?: string;
  milestone_id?: number;
  remove_source_branch?: boolean;
  allow_collaboration?: boolean;
  allow_maintainer_to_push?: boolean;
  squash?: boolean;
}

export interface UpdateMergeRequestOptions {
  target_branch?: number;
  title?: string;
  assignee_id?: number;
  milestone_id?: number;
  labels?: string;
  description?: string;
  state_event?: string;
  remove_source_branch?: boolean;
  squash?: boolean;
  discussion_locked?: boolean;
  allow_collaboration?: boolean;
  allow_maintainer_to_push?: boolean;
}

export class MergeRequests extends BaseService {
  accept(
    projectId: string | number,
    mergerequestIId: number,
    options?: AcceptMergeRequestOptions & BaseRequestOptions,
  ) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mIId}/merge`, options);
  }

  addSpentTime(
    projectId: string | number,
    mergerequestIId: number,
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
    projectId: string | number,
    mergerequestIId: number,
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
  }: ({ projectId: string | number } | { groupId: string | number } | {}) &
    PaginatedRequestOptions) {
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
    projectId: string | number,
    mergerequestIId: number,
    options?: { sha?: string } & BaseRequestOptions,
  ) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mIId}/approve`, options);
  }

  approvals(
    projectId: string | number,
    { mergerequestIId, ...options }: { mergerequestIId?: number } & BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);

    let url;

    if (mergerequestIId) {
      const mIId = encodeURIComponent(mergerequestIId);
      url = `projects/${pId}/merge_requests/${mIId}/approvals`;
    } else {
      url = `projects/${pId}/approvals`;
    }

    return RequestHelper.get(this, url, options);
  }

  approvalState(
    projectId: string | number,
    mergerequestIId: number,
    options?: { sha?: string } & BaseRequestOptions,
  ) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/merge_requests/${mIId}/approval_state`,
      options,
    );
  }

  approvers(
    projectId: string | number,
    approverIds: number[],
    approverGroupIds: (string | number)[],
    { mergerequestIId, ...options }: { mergerequestIId?: number } & BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);

    let url;

    if (mergerequestIId) {
      const mIId = encodeURIComponent(mergerequestIId);
      url = `projects/${pId}/merge_requests/${mIId}/approvers`;
    } else {
      url = `projects/${pId}/approvers`;
    }

    return RequestHelper.put(this, url, { approverIds, approverGroupIds, ...options });
  }

  cancelOnPipelineSucess(projectId: string | number, mergerequestIId: number, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.put(
      this,
      `projects/${pId}/merge_requests/${mIId}/cancel_merge_when_pipeline_succeeds`,
      options,
    );
  }

  changes(projectId: string | number, mergerequestIId: number, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIId}/changes`, options);
  }

  closesIssues(projectId: string | number, mergerequestIId: number, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIId}/closes_issues`, options);
  }

  commits(projectId: string | number, mergerequestIId: number, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIId}/commits`, options);
  }

  create(
    projectId: string | number,
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
    projectId: string | number,
    mergerequestIId: number,
    options?: UpdateMergeRequestOptions & BaseRequestOptions,
  ) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mIId}`, options);
  }

  editApprovals(
    projectId: string | number,
    { mergerequestIId, ...options }: { mergerequestIId?: number } & BaseRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);

    let url;

    if (mergerequestIId) {
      const mIId = encodeURIComponent(mergerequestIId);
      url = `projects/${pId}/merge_requests/${mIId}/approvals`;
    } else {
      url = `projects/${pId}/approvals`;
    }

    return RequestHelper.post(this, url, options);
  }

  participants(projectId: string | number, mergerequestIId: number, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIId}/participants`, options);
  }

  pipelines(projectId: string | number, mergerequestIId: number, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIId}/pipelines`, options);
  }

  remove(projectId: string | number, mergerequestIId: number, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/merge_requests/${mIId}`, options);
  }

  resetSpentTime(projectId: string | number, mergerequestIId: number, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/merge_requests/${mIId}/reset_spent_time`,
      options,
    );
  }

  resetTimeEstimate(projectId: string | number, mergerequestIId: number, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/merge_requests/${mIId}/reset_time_estimate`,
      options,
    );
  }

  show(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowMergeRequestOptions & BaseRequestOptions,
  ) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIId}`, options);
  }

  timeStats(projectId: string | number, mergerequestIId: number, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIId}/time_stats`, options);
  }

  version(projectId: string | number, mergerequestIId: number, versionId: number, options?: Sudo) {
    const [pId, mIId, vId] = [projectId, mergerequestIId, versionId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/merge_requests/${mIId}/versions/${vId}`,
      options,
    );
  }

  versions(projectId: string | number, mergerequestIId: number, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIId}/versions`, options);
  }

  unapprove(projectId: string | number, mergerequestIId: number, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mIId}/unapprove`, options);
  }

  unsubscribe(projectId: string | number, mergerequestIId: number, options?: Sudo) {
    const [pId, mIId] = [projectId, mergerequestIId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/merge_requests/${mIId}/unsubscribe`, options);
  }
}
