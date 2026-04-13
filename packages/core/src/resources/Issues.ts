import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  MappedOmit,
  OneOrNoneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
  UserAgentDetailSchema,
} from '../infrastructure';
import type { SimpleLabelSchema } from '../templates/ResourceLabels';
import type { MilestoneSchema } from '../templates/ResourceMilestones';
import type { MetricImageSchema } from './AlertManagement';
import type { MergeRequestSchema } from './MergeRequests';
import type { TodoSchema } from './TodoLists';
import type { SimpleUserSchema } from './Users';
import { BaseResource } from '@gitbeaker/requester-utils';
import {
  RequestHelper,
  createFormData,
  endpoint,
  ensureRequiredParams,
  getPrefixedUrl,
} from '../infrastructure';

export interface TimeStatsSchema extends Record<string, unknown> {
  time_estimate: number;
  total_time_spent: number;
  human_time_estimate: string | null;
  human_total_time_spent: string | null;
}

export interface IssueSchema extends Record<string, unknown> {
  state: string;
  description: string;
  health_status?: string;
  weight?: number;
  author: MappedOmit<SimpleUserSchema, 'created_at'>;
  milestone?: MilestoneSchema;
  project_id: number;
  assignees?: MappedOmit<SimpleUserSchema, 'created_at'>[];
  type: string;
  updated_at: string;
  closed_at?: string;
  closed_by?: string;
  id: number;
  title: string;
  created_at: string;
  moved_to_id?: string;
  iid: number;
  labels: string[] | SimpleLabelSchema[];
  upvotes: number;
  downvotes: number;
  merge_requests_count: number;
  user_notes_count: number;
  due_date: string;
  web_url: string;
  references: {
    short: string;
    relative: string;
    full: string;
  };
  time_stats: TimeStatsSchema;
  has_tasks: boolean;
  task_status: string;
  confidential: boolean;
  discussion_locked: boolean;
  _links: {
    self: string;
    notes: string;
    award_emoji: string;
    project: string;
  };
  task_completion_status: {
    count: number;
    completed_count: number;
  };
  subscribed: boolean;
  epic?: {
    id: number;
    iid: number;
    title: string;
    url: string;
    group_id: number;
  };
  service_desk_reply_to?: string;
}

export interface IssueSchemaWithExpandedLabels extends IssueSchema {
  labels: SimpleLabelSchema[];
}

export interface IssueSchemaWithBasicLabels extends IssueSchema {
  labels: string[];
}

export type AllIssuesOptions = {
  assigneeId?: number;
  assigneeUsername?: string[];
  authorId?: number;
  authorUsername?: string;
  confidential?: boolean;
  createdAfter?: string;
  createdBefore?: string;
  dueDate?: string;
  epicId?: number;
  healthStatus?: string;
  iids?: number[];
  in?: string;
  issueType?: string;
  iterationId?: number;
  iterationTitle?: string;
  labels?: string;
  milestone?: string;
  milestoneId?: string;
  myReactionEmoji?: string;
  nonArchived?: boolean;
  not?: Record<string, string>;
  orderBy?: string;
  scope?: string;
  search?: string;
  sort?: string;
  state?: string;
  updatedAfter?: string;
  updatedBefore?: string;
  weight?: number;
  withLabelsDetails?: boolean;
};

export type CreateIssueOptions = {
  assigneeId?: number;
  assigneeIds?: number[];
  confidential?: boolean;
  createdAt?: string;
  description?: string;
  discussionToResolve?: string;
  dueDate?: string;
  epicId?: number;
  epicIid?: number;
  iid?: number | string;
  issueType?: string;
  labels?: string;
  mergeRequestToResolveDiscussionsOf?: number;
  milestoneId?: number;
  weight?: number;
};

export type EditIssueOptions = {
  addLabels?: string;
  assigneeId?: number;
  assigneeIds?: number[];
  confidential?: boolean;
  description?: string;
  discussionLocked?: boolean;
  dueDate?: string;
  epicId?: number;
  epicIid?: number;
  issueType?: string;
  labels?: string;
  milestoneId?: number;
  removeLabels?: string;
  stateEvent?: string;
  title?: string;
  updatedAt?: string;
  weight?: number;
};

export class Issues<C extends boolean = false> extends BaseResource<C> {
  addSpentTime<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    duration: string,
    options?: { summary?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/add_spent_time`,
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

  addTimeEstimate<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    duration: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/time_estimate`,
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
    options: { withLabelsDetails: true } & AllIssuesOptions &
      BaseRequestSearchParams &
      OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<IssueSchemaWithExpandedLabels[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: { withLabelsDetails?: false } & AllIssuesOptions &
      BaseRequestSearchParams &
      OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<IssueSchemaWithBasicLabels[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: AllIssuesOptions &
      BaseRequestSearchParams &
      OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<IssueSchema[], C, E, P>> {
    const { projectId, groupId, sudo, showExpanded, maxPages, ...searchParams } = options || {};

    ensureRequiredParams({ projectId, groupId }, { minExpected: 0 });

    const url = getPrefixedUrl('issues', { projects: projectId, groups: groupId });

    return RequestHelper.get<IssueSchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as AllIssuesOptions &
        BaseRequestSearchParams &
        PaginationRequestSearchParams<P>,
    });
  }

  allMetricImages<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MetricImageSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MetricImageSchema[]>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/metric_images`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  allParticipants<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MappedOmit<SimpleUserSchema, 'created_at'>[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MappedOmit<SimpleUserSchema, 'created_at'>[]>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/participants`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  allRelatedMergeRequests<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/related_merge_requests`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    title: string,
    options?: CreateIssueOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<IssueSchema>()(this, endpoint`projects/${projectId}/issues`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        title,
      },
    });
  }

  createTodo<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<TodoSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<TodoSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/todo`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  clone<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    destinationProjectId: string | number,
    options?: { withNotes?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<IssueSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/clone`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          toProjectId: destinationProjectId,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: EditIssueOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<IssueSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  editMetricImage<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    imageId: number,
    options?: { url?: string; urlText?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MetricImageSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<MetricImageSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/metric_images/${imageId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  move<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    destinationProjectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<IssueSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/move`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          toProjectId: destinationProjectId,
        },
      },
    );
  }

  // Includes /promote already!
  promote<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    body: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueSchema, C, E, void>> {
    const { sudo, showExpanded, ...bodyOptions } = options || {};

    return RequestHelper.post<IssueSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/notes`,
      {
        sudo,
        showExpanded,
        body: {
          ...bodyOptions,
          body: `${body} \n /promote`,
        },
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/issues/${issueIId}`, {
      sudo,
      showExpanded,
    });
  }

  removeMetricImage<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    imageId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/metric_images/${imageId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  reorder<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: { moveAfterId?: number; moveBeforeId?: number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<void>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/reorder`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  resetSpentTime<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/reset_spent_time`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  resetTimeEstimate<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/reset_time_estimate`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  show<E extends boolean = false>(
    issueId: number,
    {
      projectId,
      sudo,
      showExpanded,
      ...searchParams
    }: { projectId?: string | number } & ShowExpanded<E> & Sudo = {},
  ): Promise<GitlabAPIResponse<IssueSchema, C, E, void>> {
    const url = getPrefixedUrl('', { projects: projectId, issues: issueId });

    return RequestHelper.get<IssueSchema>()(this, url, {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  subscribe<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<IssueSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/subscribe`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  allClosedByMergeRequestst<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/closed_by`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showTimeStats<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/time_stats`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  unsubscribe<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<IssueSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/unsubscribe`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  uploadMetricImage<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    metricImage: { content: Blob; filename: string },
    options?: { url?: string; urlText?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MetricImageSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<MetricImageSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/metric_images`,
      {
        sudo,
        showExpanded,
        body: createFormData({
          ...body,
          file: [metricImage.content, metricImage.filename],
        }),
      },
    );
  }

  showUserAgentDetails<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<UserAgentDetailSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<UserAgentDetailSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/user_agent_details`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
