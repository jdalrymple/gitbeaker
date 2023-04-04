import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  Either,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { CommitDiffSchema, CommitSchema } from './Commits';
import type { IssueSchema, TimeStatsSchema } from './Issues';
import type { ExpandedPipelineSchema, PipelineSchema } from './Pipelines';
import type { SimpleProjectSchema } from './Projects';
import type { TodoSchema } from './TodoLists';
import type { UserSchema } from './Users';

import type { MilestoneSchema } from '../templates/ResourceMilestones';

// Select method options
export interface AllMergeRequestsOptions {
  approvedByIds?: number[];
  approverIds?: number[];
  approved?: string;
  assigneeId?: number;
  authorId?: number;
  authorUsername?: string;
  createdAfter?: string;
  createdBefore?: string;
  deployedAfter?: string;
  deployedBefore?: string;
  environment?: string;
  in?: string;
  labels?: string;
  milestone?: string;
  myReactionEmoji?: string;
  not?: {
    labels?: string | string[];
    milestone?: string;
    authorId?: number;
    authorUsername?: string;
    assigneeId?: number;
    assigneeUsername?: string;
    reviewerId?: number;
    reviewerUsername?: string;
    myReactionEmoji?: string;
  };
  orderBy?: 'created_at' | 'updated_at';
  reviewerId?: number | 'Any' | 'None';
  reviewerUsername?: string;
  scope?: 'created_by_me' | 'assigned_to_me' | 'all';
  search?: string;
  sort?: 'asc' | 'desc';
  sourceBranch?: string;
  state?: 'opened' | 'closed' | 'locked' | 'merged';
  targetBranch?: string;
  updatedAfter?: string;
  updatedBefore?: string;
  view?: string;
  withLabelsDetails?: boolean;
  withMergeStatusRecheck?: boolean;
  wip?: string;
}

export interface AcceptMergeRequestOptions {
  mergeCommitMessage?: string;
  squashCommitMessage?: string;
  squash?: boolean;
  shouldRemoveSourceBranch?: boolean;
  mergeWhenPipelineSucceeds?: boolean;
  sha?: string;
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
  reviewerId?: number;
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

// Response Schemas
export interface DiffRefsSchema {
  base_sha: string;
  head_sha: string;
  start_sha: string;
}

export interface MergeRequestChanges {
  old_path: string;
  new_path: string;
  a_mode: string;
  b_mode: string;
  new_file: boolean;
  renamed_file: boolean;
  deleted_file: boolean;
  diff: string;
}

export interface ReferenceSchema {
  short: string;
  relative: string;
  full: string;
}

export interface TaskCompletionStatusSchema {
  count: number;
  completed_count: number;
}

export interface MergeRequestDiffVersionsSchema extends Record<string, unknown> {
  id: number;
  head_commit_sha: string;
  base_commit_sha: string;
  start_commit_sha: string;
  created_at: string;
  merge_request_id: number;
  state: string;
  real_size: string;
}

export interface ExpandedMergeRequestDiffVersionsSchema extends Record<string, unknown> {
  id: number;
  head_commit_sha: string;
  base_commit_sha: string;
  start_commit_sha: string;
  created_at: string;
  merge_request_id: number;
  state: string;
  real_size: string;
  commits: CommitSchema[];
  diffs: CommitDiffSchema[];
}

export interface MergeRequestRebaseSchema extends Record<string, unknown> {
  rebase_in_progress?: boolean;
  merge_error?: string;
}

export interface CondensedMergeRequestSchema extends Record<string, unknown> {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: string;
  created_at: string;
  updated_at: string;
  web_url: string;
}

export interface MergeRequestSchema extends CondensedMergeRequestSchema {
  merged_by: Omit<UserSchema, 'created_at'>;
  merged_at: string;
  closed_by?: Omit<UserSchema, 'created_at'>;
  closed_at?: Omit<UserSchema, 'created_at'>;
  target_branch: string;
  source_branch: string;
  user_notes_count: number;
  upvotes: number;
  downvotes: number;
  author: Omit<UserSchema, 'created_at'>;
  assignees?: Omit<UserSchema, 'created_at'>[];
  assignee?: Omit<UserSchema, 'created_at'>;
  reviewers?: Omit<UserSchema, 'created_at'>[];
  source_project_id: number;
  target_project_id: number;
  labels?: string[];
  draft: boolean;
  work_in_progress: boolean;
  milestone?: MilestoneSchema;
  merge_when_pipeline_succeeds: boolean;
  merge_status:
    | 'unchecked'
    | 'checking'
    | 'can_be_merged'
    | 'cannot_be_merged'
    | 'cannot_be_merged_recheck';
  sha: string;
  merge_commit_sha: string;
  squash_commit_sha?: string;
  discussion_locked?: boolean;
  should_remove_source_branch?: boolean;
  force_remove_source_branch: boolean;
  reference: string;
  references: ReferenceSchema;
  time_stats: TimeStatsSchema;
  squash: boolean;
  task_completion_status: TaskCompletionStatusSchema;
  has_conflicts: boolean;
  blocking_discussions_resolved: boolean;
  approvals_before_merge?: unknown;
}

export interface ExpandedMergeRequestSchema extends MergeRequestSchema {
  subscribed: boolean;
  changes_count: string;
  latest_build_started_at: string;
  latest_build_finished_at: string;
  first_deployed_to_production_at?: null;
  pipeline: PipelineSchema;
  head_pipeline: ExpandedPipelineSchema;
  diff_refs: DiffRefsSchema;
  merge_error?: null;
  first_contribution: boolean;
  user: {
    can_merge: boolean;
  };
}

export interface MergeRequestWithChangesSchema extends ExpandedMergeRequestSchema {
  changes?: MergeRequestChanges[];
  overflow: boolean;
}

export interface MergeRequestTodoSchema extends TodoSchema {
  project: SimpleProjectSchema;
  target_type: 'MergeRequest';
  target: ExpandedMergeRequestSchema;
}

// Export API
export class MergeRequests<C extends boolean = false> extends BaseResource<C> {
  // convenience method
  accept<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: AcceptMergeRequestOptions & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ExpandedPipelineSchema, C, E, void>> {
    return this.merge(projectId, mergerequestIId, options);
  }

  addSpentTime<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    duration: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/add_spent_time`,
      {
        duration,
        ...options,
      },
    );
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    {
      projectId,
      groupId,
      ...options
    }: AllMergeRequestsOptions &
      Either<{ projectId: string | number }, { groupId: string | number }> &
      PaginationRequestOptions<P> &
      BaseRequestOptions<E> = {} as any,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, P>> {
    let prefix = '';

    if (projectId) {
      prefix = endpoint`projects/${projectId}/`;
    } else if (groupId) {
      prefix = endpoint`groups/${groupId}/`;
    }

    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      `${prefix}merge_requests`,
      options as unknown as AllMergeRequestsOptions &
        PaginationRequestOptions<P> &
        BaseRequestOptions<E>,
    );
  }

  cancelOnPipelineSuccess<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestSchema, C, E, void>> {
    return RequestHelper.post<ExpandedMergeRequestSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/cancel_merge_when_pipeline_succeeds`,
      options,
    );
  }

  allChanges<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestWithChangesSchema[], C, E, void>> {
    return RequestHelper.get<MergeRequestWithChangesSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/changes`,
      options,
    );
  }

  allIssuesClosed<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueSchema[], C, E, void>> {
    return RequestHelper.get<IssueSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/closes_issues`,
      options,
    );
  }

  allCommits<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CommitSchema[], C, E, void>> {
    return RequestHelper.get<CommitSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/commits`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    sourceBranch: string,
    targetBranch: string,
    title: string,
    options?: CreateMergeRequestOptions & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestSchema, C, E, void>> {
    return RequestHelper.post<ExpandedMergeRequestSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests`,
      {
        sourceBranch,
        targetBranch,
        title,
        ...options,
      },
    );
  }

  createPipeline<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedPipelineSchema, C, E, void>> {
    return RequestHelper.post<ExpandedPipelineSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/pipelines`,
      options,
    );
  }

  createTodo<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestTodoSchema, C, E, void>> {
    return RequestHelper.post<MergeRequestTodoSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/todo`,
      options,
    );
  }

  allDiffVersions<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestDiffVersionsSchema[], C, E, void>> {
    return RequestHelper.get<MergeRequestDiffVersionsSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/versions`,
      options,
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: UpdateMergeRequestOptions & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ExpandedPipelineSchema, C, E, void>> {
    return RequestHelper.put<ExpandedPipelineSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}`,
      options,
    );
  }

  merge<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: AcceptMergeRequestOptions & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ExpandedPipelineSchema, C, E, void>> {
    return RequestHelper.put<ExpandedPipelineSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/merge`,
      options,
    );
  }

  mergeToDefault<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: UpdateMergeRequestOptions & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<{ commit_id: string }, C, E, void>> {
    return RequestHelper.put<{ commit_id: string }>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/merge_ref`,
      options,
    );
  }

  allParticipants<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Omit<UserSchema, 'created_at'>[], C, E, void>> {
    return RequestHelper.get<Omit<UserSchema, 'created_at'>[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/participants`,
      options,
    );
  }

  allPipelines<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<
    GitlabAPIResponse<Pick<PipelineSchema, 'id' | 'sha' | 'ref' | 'status'>[], C, E, void>
  > {
    return RequestHelper.get<Pick<PipelineSchema, 'id' | 'sha' | 'ref' | 'status'>[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/pipelines`,
      options,
    );
  }

  rebase<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestRebaseSchema, C, E, void>> {
    return RequestHelper.put<MergeRequestRebaseSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/rebase`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}`,
      options,
    );
  }

  resetSpentTime<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/reset_spent_time`,
      options,
    );
  }

  resetTimeEstimate<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/reset_time_estimate`,
      options,
    );
  }

  setTimeEstimate<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    duration: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/time_estimate`,
      {
        duration,
        ...options,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: {
      renderHtml?: boolean;
      includeDivergedCommitsCount?: true;
      includeRebaseInProgress?: boolean;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestSchema, C, E, void>> {
    return RequestHelper.get<ExpandedMergeRequestSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}`,
      options,
    );
  }

  showDiffVersion<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    versionId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestDiffVersionsSchema, C, E, void>> {
    return RequestHelper.get<ExpandedMergeRequestDiffVersionsSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/versions/${versionId}`,
      options,
    );
  }

  showTimeStats<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    return RequestHelper.get<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/time_stats`,
      options,
    );
  }

  subscribe<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestSchema, C, E, void>> {
    return RequestHelper.post<ExpandedMergeRequestSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/subscribe`,
      options,
    );
  }

  unsubscribe<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestSchema, C, E, void>> {
    return RequestHelper.post<ExpandedMergeRequestSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/unsubscribe`,
      options,
    );
  }
}
