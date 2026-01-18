import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  MappedOmit,
  OneOrNoneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { CommitDiffSchema, CommitSchema } from './Commits';
import type { IssueSchema, TimeStatsSchema } from './Issues';
import type { ExpandedPipelineSchema, PipelineSchema } from './Pipelines';
import type { ReviewerState } from './Webhooks';
import type { SimpleProjectSchema } from './Projects';
import type { TodoSchema } from './TodoLists';
import type { SimpleUserSchema } from './Users';

import type { MilestoneSchema } from '../templates/ResourceMilestones';
import type { SimpleLabelSchema } from '../templates/ResourceLabels';

// Response Schemas
export interface DiffRefsSchema {
  base_sha: string;
  head_sha: string;
  start_sha: string;
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

export interface MergeRequestDiffSchema extends Record<string, unknown> {
  old_path: string;
  new_path: string;
  a_mode: string;
  b_mode: string;
  new_file: boolean;
  renamed_file: boolean;
  deleted_file: boolean;
  diff: string;
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
  description: string | null;
  state: string;
  created_at: string;
  updated_at: string;
  web_url: string;
}

export interface MergeRequestSchema extends CondensedMergeRequestSchema {
  merged_by: MappedOmit<SimpleUserSchema, 'created_at'> | null;
  merged_at: string | null;
  closed_by: MappedOmit<SimpleUserSchema, 'created_at'> | null;
  closed_at: string | null;
  target_branch: string;
  source_branch: string;
  user_notes_count: number;
  upvotes: number;
  downvotes: number;
  author: MappedOmit<SimpleUserSchema, 'created_at'>;
  assignees: MappedOmit<SimpleUserSchema, 'created_at'>[] | null;
  assignee: MappedOmit<SimpleUserSchema, 'created_at'> | null;
  reviewers: MappedOmit<SimpleUserSchema, 'created_at'>[] | null;
  source_project_id: number;
  target_project_id: number;
  labels: string[] | SimpleLabelSchema[];
  draft: boolean;
  work_in_progress: boolean;
  milestone: MilestoneSchema | null;
  merge_when_pipeline_succeeds: boolean;
  merge_status:
    | 'unchecked'
    | 'checking'
    | 'can_be_merged'
    | 'cannot_be_merged'
    | 'cannot_be_merged_recheck';
  detailed_merge_status:
    | 'blocked_status'
    | 'broken_status'
    | 'checking'
    | 'unchecked'
    | 'ci_must_pass'
    | 'ci_still_running'
    | 'discussions_not_resolved'
    | 'draft_status'
    | 'external_status_checks'
    | 'mergeable'
    | 'not_approved'
    | 'not_open'
    | 'policies_denied'
    | 'jira_association_missing';
  sha: string;
  merge_commit_sha: string | null;
  squash_commit_sha: string | null;
  discussion_locked: boolean | null;
  should_remove_source_branch: boolean | null;
  force_remove_source_branch: boolean;
  reference: string;
  references: ReferenceSchema;
  time_stats: TimeStatsSchema;
  squash: boolean;
  task_completion_status: TaskCompletionStatusSchema;
  prepared_at: string | null;
  has_conflicts: boolean;
  blocking_discussions_resolved: boolean;
  approvals_before_merge: number | null;
}

export interface ExpandedMergeRequestSchema extends MergeRequestSchema {
  subscribed: boolean;
  changes_count: string;
  latest_build_started_at: string | null;
  latest_build_finished_at: string | null;
  first_deployed_to_production_at: null;
  pipeline: PipelineSchema | null;
  head_pipeline: ExpandedPipelineSchema | null;
  diff_refs: DiffRefsSchema;
  merge_error: string | null;
  first_contribution: boolean;
  user: {
    can_merge: boolean;
  };
  rebase_in_progress?: boolean;
}

export interface MergeRequestSchemaWithExpandedLabels extends MergeRequestSchema {
  labels: SimpleLabelSchema[];
}

export interface MergeRequestSchemaWithBasicLabels extends MergeRequestSchema {
  labels: string[];
}

export interface MergeRequestTodoSchema extends TodoSchema {
  project: SimpleProjectSchema;
  target_type: 'MergeRequest';
  target: ExpandedMergeRequestSchema;
}

export interface MergeRequestChangesSchema
  extends MappedOmit<
    MergeRequestSchema,
    'has_conflicts' | 'blocking_discussions_resolved' | 'approvals_before_merge'
  > {
  changes: CommitDiffSchema[];
  overflow: boolean;
}

export interface MergeRequestReviewerSchema extends Record<string, unknown> {
  user: MappedOmit<SimpleUserSchema, 'created_at'>;
  state: ReviewerState;
  created_at: string;
}

// Select method options
export type AllMergeRequestsOptions = {
  approvedByIds?: number[];
  approverIds?: number[];
  approved?: string;
  assigneeId?: number | 'Any' | 'None';
  authorId?: number;
  authorUsername?: string;
  createdAfter?: string;
  createdBefore?: string;
  deployedAfter?: string;
  deployedBefore?: string;
  environment?: string;
  iids?: number[];
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
};

export type AcceptMergeRequestOptions = {
  mergeCommitMessage?: string;
  squashCommitMessage?: string;
  squash?: boolean;
  shouldRemoveSourceBranch?: boolean;
  /**
   * @deprecated Use `autoMerge` instead. Deprecated in GitLab 17.11.
   */
  mergeWhenPipelineSucceeds?: boolean;
  sha?: string;
  autoMerge?: boolean;
};

export type EditMergeRequestOptions = {
  targetBranch?: string;
  title?: string;
  assigneeId?: number;
  assigneeIds?: number[];
  reviewerIds?: number[];
  milestoneId?: number;
  addLabels?: string;
  labels?: string | Array<string>;
  removeLabels?: string;
  description?: string;
  stateEvent?: string;
  removeSourceBranch?: boolean;
  squash?: boolean;
  squashOnMerge?: boolean;
  discussionLocked?: boolean;
  allowCollaboration?: boolean;
  allowMaintainerToPush?: boolean;
};

export type CreateMergeRequestOptions = {
  targetProjectId?: number;
} & Pick<
  EditMergeRequestOptions,
  | 'assigneeId'
  | 'assigneeIds'
  | 'description'
  | 'labels'
  | 'title'
  | 'milestoneId'
  | 'reviewerIds'
  | 'removeSourceBranch'
  | 'allowCollaboration'
  | 'allowMaintainerToPush'
  | 'squash'
>;

// Export API
export class MergeRequests<C extends boolean = false> extends BaseResource<C> {
  // convenience method
  accept<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: AcceptMergeRequestOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestSchema, C, E, void>> {
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
    options: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      AllMergeRequestsOptions & { withLabelsDetails: true },
  ): Promise<GitlabAPIResponse<MergeRequestSchemaWithExpandedLabels[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      AllMergeRequestsOptions &
      BaseRequestOptions<E> & { withLabelsDetails?: false },
  ): Promise<GitlabAPIResponse<MergeRequestSchemaWithBasicLabels[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    {
      projectId,
      groupId,
      ...options
    }: AllMergeRequestsOptions &
      OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      BaseRequestOptions<E> = {} as any,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, P>> {
    let prefix = '';

    if (projectId) {
      prefix = endpoint`projects/${projectId}/`;
    } else if (groupId) {
      prefix = endpoint`groups/${groupId}/`;
    }

    return RequestHelper.get<MergeRequestSchema[]>()(this, `${prefix}merge_requests`, options);
  }

  allDiffs<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<MergeRequestDiffSchema[], C, E, P>> {
    return RequestHelper.get<MergeRequestDiffSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/diffs`,
      options,
    );
  }

  allCommits<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<CommitSchema[], C, E, P>> {
    return RequestHelper.get<CommitSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/commits`,
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

  allIssuesRelated<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueSchema[], C, E, void>> {
    return RequestHelper.get<IssueSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/related_issues`,
      options,
    );
  }

  allParticipants<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MappedOmit<SimpleUserSchema, 'created_at'>[], C, E, void>> {
    return RequestHelper.get<MappedOmit<SimpleUserSchema, 'created_at'>[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/participants`,
      options,
    );
  }

  allPipelines<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    mergerequestIId: number,
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PipelineSchema[], C, E, P>> {
    return RequestHelper.get<PipelineSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/pipelines`,
      options,
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

  create<E extends boolean = false>(
    projectId: string | number,
    sourceBranch: string,
    targetBranch: string,
    title: string,
    options?: CreateMergeRequestOptions & Sudo & ShowExpanded<E>,
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

  edit<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: EditMergeRequestOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestSchema, C, E, void>> {
    return RequestHelper.put<ExpandedMergeRequestSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}`,
      options,
    );
  }

  merge<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: AcceptMergeRequestOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestSchema, C, E, void>> {
    return RequestHelper.put<ExpandedMergeRequestSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/merge`,
      options,
    );
  }

  mergeToDefault<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ commit_id: string }, C, E, void>> {
    return RequestHelper.put<{ commit_id: string }>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/merge_ref`,
      options,
    );
  }

  rebase<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    { skipCI, ...options }: { skipCI?: boolean } & Sudo & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<MergeRequestRebaseSchema, C, E, void>> {
    return RequestHelper.put<MergeRequestRebaseSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/rebase`,
      {
        ...options,
        skipCi: skipCI,
      },
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
      includeDivergedCommitsCount?: boolean;
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

  showChanges<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: { accessRawDiffs?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestChangesSchema, C, E, void>> {
    process.emitWarning(
      'This endpoint was deprecated in GitLab API 15.7 and will be removed in API v5. Please use the "allDiffs" function instead.',
      'DeprecationWarning',
    );
    return RequestHelper.get<MergeRequestChangesSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/changes`,
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

  showReviewers<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestReviewerSchema[], C, E, void>> {
    return RequestHelper.get<MergeRequestReviewerSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/reviewers`,
      options,
    );
  }
}
