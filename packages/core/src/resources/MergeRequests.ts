import type {
  GitlabAPIResponse,
  MappedOmit,
  OneOrNoneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { SimpleLabelSchema } from '../templates/ResourceLabels';
import type { MilestoneSchema } from '../templates/ResourceMilestones';
import type { CommitDiffSchema, CommitSchema } from './Commits';
import type { IssueSchema, TimeStatsSchema } from './Issues';
import type { ExpandedPipelineSchema, PipelineSchema } from './Pipelines';
import type { SimpleProjectSchema } from './Projects';
import type { TodoSchema } from './TodoLists';
import type { SimpleUserSchema } from './Users';
import type { ReviewerState } from './Webhooks';

import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestSearchParams,
  RequestHelper,
  endpoint,
  ensureRequiredParams,
  getPrefixedUrl,
} from '../infrastructure';

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

export class MergeRequests<C extends boolean = false> extends BaseResource<C> {
  // convenience method
  accept<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: AcceptMergeRequestOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestSchema, C, E, void>> {
    return this.merge(projectId, mergerequestIId, options);
  }

  addSpentTime<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    duration: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/add_spent_time`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          duration,
        },
      },
    );
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options: { withLabelsDetails: true } & AllMergeRequestsOptions &
      BaseRequestSearchParams &
      OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestSchemaWithExpandedLabels[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: { withLabelsDetails?: false } & AllMergeRequestsOptions &
      BaseRequestSearchParams &
      OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestSchemaWithBasicLabels[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: AllMergeRequestsOptions &
      BaseRequestSearchParams &
      OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, P>> {
    const { projectId, groupId, sudo, showExpanded, maxPages, ...searchParams } = options || {};

    ensureRequiredParams({ projectId, groupId }, { minExpected: 0 });

    const url = getPrefixedUrl('merge_requests', { projects: projectId, groups: groupId });

    return RequestHelper.get<MergeRequestSchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams,
    });
  }

  allDiffs<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    mergerequestIId: number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestDiffSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<MergeRequestDiffSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/diffs`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  allCommits<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    mergerequestIId: number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CommitSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<CommitSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/commits`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  allDiffVersions<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestDiffVersionsSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MergeRequestDiffVersionsSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/versions`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  allIssuesClosed<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<IssueSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/closes_issues`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  allIssuesRelated<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<IssueSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/related_issues`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  allParticipants<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MappedOmit<SimpleUserSchema, 'created_at'>[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MappedOmit<SimpleUserSchema, 'created_at'>[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/participants`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  allPipelines<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    mergerequestIId: number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PipelineSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<PipelineSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/pipelines`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  cancelOnPipelineSuccess<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<ExpandedMergeRequestSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/cancel_merge_when_pipeline_succeeds`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    sourceBranch: string,
    targetBranch: string,
    title: string,
    options?: CreateMergeRequestOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ExpandedMergeRequestSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          sourceBranch,
          targetBranch,
          title,
        },
      },
    );
  }

  createPipeline<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedPipelineSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<ExpandedPipelineSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/pipelines`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  createTodo<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestTodoSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<MergeRequestTodoSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/todo`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: EditMergeRequestOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ExpandedMergeRequestSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  merge<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: AcceptMergeRequestOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ExpandedMergeRequestSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/merge`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  mergeToDefault<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<{ commit_id: string }, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<{ commit_id: string }>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/merge_ref`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  rebase<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    { skipCI, sudo, showExpanded, ...body }: { skipCI?: boolean } & ShowExpanded<E> & Sudo = {},
  ): Promise<GitlabAPIResponse<MergeRequestRebaseSchema, C, E, void>> {
    return RequestHelper.put<MergeRequestRebaseSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/rebase`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          skipCi: skipCI,
        },
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  resetSpentTime<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/reset_spent_time`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  resetTimeEstimate<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/reset_time_estimate`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  setTimeEstimate<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    duration: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/time_estimate`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          duration,
        },
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
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<ExpandedMergeRequestSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  showChanges<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: { accessRawDiffs?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestChangesSchema, C, E, void>> {
    process.emitWarning(
      'This endpoint was deprecated in GitLab API 15.7 and will be removed in API v5. Please use the "allDiffs" function instead.',
      'DeprecationWarning',
    );
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<MergeRequestChangesSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/changes`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  showDiffVersion<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    versionId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestDiffVersionsSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ExpandedMergeRequestDiffVersionsSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/versions/${versionId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showTimeStats<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/time_stats`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  subscribe<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<ExpandedMergeRequestSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/subscribe`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  unsubscribe<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedMergeRequestSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<ExpandedMergeRequestSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/unsubscribe`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showReviewers<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestReviewerSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MergeRequestReviewerSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/reviewers`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
