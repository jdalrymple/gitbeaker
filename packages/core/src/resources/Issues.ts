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
  UserAgentDetailSchema,
} from '../infrastructure';
import type { SimpleUserSchema } from './Users';
import type { MergeRequestSchema } from './MergeRequests';
import type { TodoSchema } from './TodoLists';
import type { MetricImageSchema } from './AlertManagement';
import type { SimpleLabelSchema } from '../templates/ResourceLabels';
import type { MilestoneSchema } from '../templates/ResourceMilestones';

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
  iterationId?: string;
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
    options?: { summary?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/add_spent_time`,
      {
        duration,
        ...options,
      },
    );
  }

  addTimeEstimate<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    duration: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/time_estimate`,
      {
        duration,
        ...options,
      },
    );
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E> &
      AllIssuesOptions & { withLabelsDetails: true },
  ): Promise<GitlabAPIResponse<IssueSchemaWithExpandedLabels[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E> &
      AllIssuesOptions &
      BaseRequestOptions<E> & { withLabelsDetails?: false },
  ): Promise<GitlabAPIResponse<IssueSchemaWithBasicLabels[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    {
      projectId,
      groupId,
      ...options
    }: OneOrNoneOf<{ projectId: string | number; groupId: string | number }> &
      PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E> &
      AllIssuesOptions &
      BaseRequestOptions<E> = {} as any,
  ): Promise<GitlabAPIResponse<IssueSchema[], C, E, P>> {
    let url: string;

    if (projectId) url = endpoint`projects/${projectId}/issues`;
    else if (groupId) url = endpoint`groups/${groupId}/issues`;
    else url = 'issues';

    return RequestHelper.get<IssueSchema[]>()(this, url, options);
  }

  allMetricImages<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MetricImageSchema[], C, E, void>> {
    return RequestHelper.get<MetricImageSchema[]>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/metric_images`,
      options,
    );
  }

  allParticipants<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MappedOmit<SimpleUserSchema, 'created_at'>[], C, E, void>> {
    return RequestHelper.get<MappedOmit<SimpleUserSchema, 'created_at'>[]>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/participants`,
      options,
    );
  }

  allRelatedMergeRequests<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, void>> {
    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/related_merge_requests`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    title: string,
    options?: CreateIssueOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueSchema, C, E, void>> {
    return RequestHelper.post<IssueSchema>()(this, endpoint`projects/${projectId}/issues`, {
      ...options,
      title,
    });
  }

  createTodo<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TodoSchema, C, E, void>> {
    return RequestHelper.post<TodoSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/todo`,
      options,
    );
  }

  clone<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    destinationProjectId: string | number,
    options?: { withNotes?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueSchema, C, E, void>> {
    return RequestHelper.post<IssueSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/clone`,
      {
        toProjectId: destinationProjectId,
        ...options,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: EditIssueOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueSchema, C, E, void>> {
    return RequestHelper.put<IssueSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}`,
      options,
    );
  }

  editMetricImage<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    imageId: number,
    options?: { url?: string; urlText?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MetricImageSchema, C, E, void>> {
    return RequestHelper.put<MetricImageSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/metric_images/${imageId}`,
      options,
    );
  }

  move<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    destinationProjectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueSchema, C, E, void>> {
    return RequestHelper.post<IssueSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/move`,
      {
        toProjectId: destinationProjectId,
        ...options,
      },
    );
  }

  // Includes /promote already!
  promote<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    body: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueSchema, C, E, void>> {
    return RequestHelper.post<IssueSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/notes`,
      {
        searchParams: {
          body: `${body} \n /promote`,
        },
        ...options,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`projects/${projectId}/issues/${issueIId}`, options);
  }

  removeMetricImage<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    imageId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/metric_images/${imageId}`,
      options,
    );
  }

  reorder<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: { moveAfterId?: number; moveBeforeId?: number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.put<void>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/reorder`,
      options,
    );
  }

  resetSpentTime<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/reset_spent_time`,
      options,
    );
  }

  resetTimeEstimate<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/reset_time_estimate`,
      options,
    );
  }

  show<E extends boolean = false>(
    issueId: number,
    { projectId, ...options }: { projectId?: string | number } & Sudo & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<IssueSchema, C, E, void>> {
    const url = projectId ? endpoint`projects/${projectId}/issues/${issueId}` : `issues/${issueId}`;

    return RequestHelper.get<IssueSchema>()(this, url, options as Sudo & ShowExpanded<E>);
  }

  subscribe<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueSchema, C, E, void>> {
    return RequestHelper.post<IssueSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/subscribe`,
      options,
    );
  }

  allClosedByMergeRequestst<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, void>> {
    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/closed_by`,
      options,
    );
  }

  showTimeStats<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TimeStatsSchema, C, E, void>> {
    return RequestHelper.get<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/time_stats`,
      options,
    );
  }

  unsubscribe<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueSchema, C, E, void>> {
    return RequestHelper.post<IssueSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/unsubscribe`,
      options,
    );
  }

  uploadMetricImage<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    metricImage: { content: Blob; filename: string },
    options?: { url?: string; urlText?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MetricImageSchema, C, E, void>> {
    return RequestHelper.post<MetricImageSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/metric_images`,
      {
        isForm: true,
        ...options,
        file: [metricImage.content, metricImage.filename],
      },
    );
  }

  showUserAgentDetails<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserAgentDetailSchema, C, E, void>> {
    return RequestHelper.get<UserAgentDetailSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/user_agent_details`,
      options,
    );
  }
}
