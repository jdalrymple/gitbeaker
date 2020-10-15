import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface AcceptMergeRequestOptions {
  mergeCommitMessage?: string;
  squashCommitMessage?: string;
  squash?: boolean;
  shouldRemoveSourceBranch?: boolean;
  mergeWhenPipelineSucceeds?: boolean;
  sha?: string;
}

export interface ShowMergeRequestOptions {
  renderHtml?: boolean;
  includeDivergedCommitsCount?: true;
  includeRebaseInProgress?: boolean;
}

export interface CreateMergeRequestOptions {
  assigneeId?: number;
  description?: string;
  targetProjectId?: number;
  labels?: string;
  milestoneId?: number;
  removeSourceBranch?: boolean;
  allowCollaboration?: boolean;
  allowMaintainerToPush?: boolean;
  squash?: boolean;
}

export interface UpdateMergeRequestOptions {
  targetBranch?: number;
  title?: string;
  assigneeId?: number;
  milestoneId?: number;
  labels?: string;
  description?: string;
  stateEvent?: string;
  removeSourceBranch?: boolean;
  squash?: boolean;
  discussionLocked?: boolean;
  allowCollaboration?: boolean;
  allowMaintainerToPush?: boolean;
}

export interface AllMergeRequestsOptions {
  state?: 'opened' | 'closed' | 'locked' | 'merged';
  orderBy?: 'created_at' | 'updated_at';
  sort?: 'asc' | 'desc';
  milestone?: 'None' | string;
  view?: string;
  labels?: string;
  withLabelsDetails?: boolean;
  createdAfter?: string;
  createdBefore?: string;
  updatedBefore?: string;
  updatedAfter?: string;
  scope?: 'created_by_me' | 'assigned_to_me' | 'all';
  authorId?: number;
  asigneeId?: number;
  approverIds?: Array<number>;
  approvedByIds?: Array<number>;
  myReactionEmoji?: string;
  sourceBranch?: string;
  targetBranch?: string;
  in?: string;
  wip?: string;
}

export class MergeRequests extends BaseService {
  accept(
    projectId: string | number,
    mergerequestIid: number,
    options?: AcceptMergeRequestOptions & BaseRequestOptions,
  ) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mIid}/merge`, options);
  }

  addSpentTime(
    projectId: string | number,
    mergerequestIid: number,
    duration: string,
    options?: Sudo,
  ) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mIid}/add_spent_time`, {
      duration,
      ...options,
    });
  }

  addTimeEstimate(
    projectId: string | number,
    mergerequestIid: number,
    duration: string,
    options?: Sudo,
  ) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mIid}/time_estimate`, {
      duration,
      ...options,
    });
  }

  all({
    projectId,
    groupId,
    ...options
  }: ({ projectId?: string | number } | { groupId?: string | number }) &
    AllMergeRequestsOptions &
    PaginatedRequestOptions = {}) {
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

  cancelOnPipelineSucess(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.put(
      this,
      `projects/${pId}/merge_requests/${mIid}/cancel_merge_when_pipeline_succeeds`,
      options,
    );
  }

  changes(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIid}/changes`, options);
  }

  closesIssues(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIid}/closes_issues`, options);
  }

  commits(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIid}/commits`, options);
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
    mergerequestIid: number,
    options?: UpdateMergeRequestOptions & BaseRequestOptions,
  ) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mIid}`, options);
  }

  participants(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIid}/participants`, options);
  }

  pipelines(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIid}/pipelines`, options);
  }

  rebase(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/merge_requests/${mIid}/rebase`, options);
  }

  remove(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/merge_requests/${mIid}`, options);
  }

  resetSpentTime(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/merge_requests/${mIid}/reset_spent_time`,
      options,
    );
  }

  resetTimeEstimate(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `projects/${pId}/merge_requests/${mIid}/reset_time_estimate`,
      options,
    );
  }

  show(
    projectId: string | number,
    mergerequestIid: number,
    options?: ShowMergeRequestOptions & BaseRequestOptions,
  ) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIid}`, options);
  }

  subscribe(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mIid}/subscribe`, options);
  }

  timeStats(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIid}/time_stats`, options);
  }

  version(projectId: string | number, mergerequestIid: number, versionId: number, options?: Sudo) {
    const [pId, mIid, vId] = [projectId, mergerequestIid, versionId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `projects/${pId}/merge_requests/${mIid}/versions/${vId}`,
      options,
    );
  }

  versions(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/merge_requests/${mIid}/versions`, options);
  }

  unsubscribe(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/merge_requests/${mIid}/unsubscribe`, options);
  }
}
