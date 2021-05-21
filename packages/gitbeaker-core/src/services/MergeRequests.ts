import { BaseService } from '@gitbeaker/requester-utils';
import { UserSchema } from './Users';
import { IssueSchema } from './Issues';
import { CommitSchema, CommitDiffSchema } from './Commits';
import { MilestoneSchema } from '../templates';
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
  labels?: string | Array<string>;
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
  labels?: string | Array<string>;
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
  labels?: string | Array<string>;
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

// Response Schemas
export interface ReferenceSchema {
  short: string;
  relative: string;
  full: string;
}

export interface TaskCompletionStatusSchema {
  count: number;
  completed_count: number;
}

export interface PipelineSchema extends Record<string, unknown> {
  id: number;
  sha: string;
  ref: string;
  status: string;
}

export interface TimeStatsSchema extends Record<string, unknown> {
  time_estimate: number;
  total_time_spent: number;
  human_time_estimate: string;
  human_total_time_spent: string;
}

export interface RebaseSchema extends Record<string, unknown> {
  rebase_in_progress?: boolean;
  merge_error?: string;
}

export interface DiffSchema extends Record<string, unknown> {
  id: number;
  head_commit_sha: string;
  base_commit_sha: string;
  start_commit_sha: string;
  created_at: string;
  merge_request_id: number;
  state: string;
  real_size: string;
  commits?: CommitSchema[];
  diffs?: CommitDiffSchema[];
}

export interface MergeRequestSchema extends Record<string, unknown> {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: string;
  merged_by: Omit<UserSchema, 'created_at'>;
  merged_at: string;
  closed_by?: string;
  closed_at?: string;
  created_at: string;
  updated_at: string;
  target_branch: string;
  source_branch: string;
  upvotes: number;
  downvotes: number;
  author: Omit<UserSchema, 'created_at'>;
  assignee: Omit<UserSchema, 'created_at'>;
  assignees?: Omit<UserSchema, 'created_at'>[];
  reviewers?: Omit<UserSchema, 'created_at'>[];
  source_project_id: number;
  target_project_id: number;
  labels?: string[];
  work_in_progress: boolean;
  milestone: MilestoneSchema;
  merge_when_pipeline_succeeds: boolean;
  merge_status: string;
  sha: string;
  merge_commit_sha?: string;
  squash_commit_sha?: string;
  user_notes_count: number;
  discussion_locked?: string;
  should_remove_source_branch: boolean;
  force_remove_source_branch: boolean;
  web_url: string;
  references: ReferenceSchema;
  time_stats: TimeStatsSchema;
  squash: boolean;
  task_completion_status: TaskCompletionStatusSchema;
  has_conflicts: boolean;
  blocking_discussions_resolved: boolean;
  changes?: CommitDiffSchema[];
}

export class MergeRequests extends BaseService {
  accept(
    projectId: string | number,
    mergerequestIid: number,
    options?: AcceptMergeRequestOptions & BaseRequestOptions,
  ) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.put<MergeRequestSchema>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/merge`,
      options,
    );
  }

  addSpentTime(
    projectId: string | number,
    mergerequestIid: number,
    duration: string,
    options?: Sudo,
  ) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/add_spent_time`,
      {
        duration,
        ...options,
      },
    );
  }

  addTimeEstimate(
    projectId: string | number,
    mergerequestIid: number,
    duration: string,
    options?: Sudo,
  ) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/time_estimate`,
      {
        duration,
        ...options,
      },
    );
  }

  all({
    projectId,
    groupId,
    ...options
  }: { projectId?: string | number; groupId?: string | number } & AllMergeRequestsOptions &
    PaginatedRequestOptions = {}) {
    let url: string;

    if (projectId) {
      url = `projects/${encodeURIComponent(projectId)}/merge_requests`;
    } else if (groupId) {
      url = `groups/${encodeURIComponent(groupId)}/merge_requests`;
    } else {
      url = 'merge_requests';
    }

    return RequestHelper.get<MergeRequestSchema[]>()(this, url, options);
  }

  cancelOnPipelineSucess(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.put<MergeRequestSchema>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/cancel_merge_when_pipeline_succeeds`,
      options,
    );
  }

  changes(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get<MergeRequestSchema>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/changes`,
      options,
    );
  }

  closesIssues(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get<IssueSchema[]>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/closes_issues`,
      options,
    );
  }

  commits(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get<CommitSchema[]>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/commits`,
      options,
    );
  }

  create(
    projectId: string | number,
    sourceBranch: string,
    targetBranch: string,
    title: string,
    options?: CreateMergeRequestOptions & BaseRequestOptions,
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<MergeRequestSchema>()(this, `projects/${pId}/merge_requests`, {
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

    return RequestHelper.put<MergeRequestSchema>()(
      this,
      `projects/${pId}/merge_requests/${mIid}`,
      options,
    );
  }

  participants(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get<Omit<UserSchema, 'created_at'>[]>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/participants`,
      options,
    );
  }

  pipelines(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get<PipelineSchema[]>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/pipelines`,
      options,
    );
  }

  rebase(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.put<RebaseSchema>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/rebase`,
      options,
    );
  }

  remove(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/merge_requests/${mIid}`, options);
  }

  resetSpentTime(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/reset_spent_time`,
      options,
    );
  }

  resetTimeEstimate(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post<TimeStatsSchema>()(
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

    return RequestHelper.get<MergeRequestSchema>()(
      this,
      `projects/${pId}/merge_requests/${mIid}`,
      options,
    );
  }

  subscribe(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post<MergeRequestSchema>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/subscribe`,
      options,
    );
  }

  timeStats(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get<TimeStatsSchema>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/time_stats`,
      options,
    );
  }

  version(projectId: string | number, mergerequestIid: number, versionId: number, options?: Sudo) {
    const [pId, mIid, vId] = [projectId, mergerequestIid, versionId].map(encodeURIComponent);

    return RequestHelper.get<DiffSchema>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/versions/${vId}`,
      options,
    );
  }

  versions(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.get<DiffSchema[]>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/versions`,
      options,
    );
  }

  unsubscribe(projectId: string | number, mergerequestIid: number, options?: Sudo) {
    const [pId, mIid] = [projectId, mergerequestIid].map(encodeURIComponent);

    return RequestHelper.post<MergeRequestSchema>()(
      this,
      `projects/${pId}/merge_requests/${mIid}/unsubscribe`,
      options,
    );
  }
}
