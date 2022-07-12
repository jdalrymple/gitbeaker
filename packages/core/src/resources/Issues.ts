import { BaseResource } from '@gitbeaker/requester-utils';
import { UserSchema } from './Users';
import { MergeRequestSchema } from './MergeRequests';
import { MilestoneSchema } from '../templates/types';
import {
  ShowExpanded,
  BaseRequestOptions,
  endpoint,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface TimeStatsSchema extends Record<string, unknown> {
  time_estimate: number;
  total_time_spent: number;
  human_time_estimate: string;
  human_total_time_spent: string;
}

export interface IssueLinkSchema extends Record<string, unknown> {
  id: number;
  iid: number;
  project_id: number;
  issue_link_id: number;
  state: string;
  description: string;
  weight?: number;
  author: Omit<UserSchema, 'created_at'>;
  milestone: MilestoneSchema;
  assignees?: Omit<UserSchema, 'created_at'>[];
  title: string;
  labels?: string[];
  user_notes_count: number;
  due_date: string;
  web_url: string;
  confidential: boolean;
  updated_at: string;
  link_type: 'relates_to' | 'blocks' | 'is_blocked_by';
  link_created_at: string;
  link_updated_at: string;
}

export interface IssueSchema extends Record<string, unknown> {
  state: string;
  description: string;
  weight?: number;
  health_status?: string;
  author: Omit<UserSchema, 'created_at'>;
  milestone: MilestoneSchema;
  project_id: number;
  assignees?: Omit<UserSchema, 'created_at'>[];
  updated_at: string;
  closed_at?: string;
  closed_by?: string;
  id: number;
  title: string;
  created_at: string;
  moved_to_id?: string;
  iid: number;
  labels?: string[];
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
}

export class Issues<C extends boolean = false> extends BaseResource<C> {
  addSpentTime(projectId: string | number, issueIid: number, duration: string, options?: Sudo) {
    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIid}/add_spent_time`,
      {
        duration,
        ...options,
      },
    );
  }

  addTimeEstimate(projectId: string | number, issueIid: number, duration: string, options?: Sudo) {
    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIid}/time_estimate`,
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
  }: { projectId?: string | number; groupId?: string | number } & PaginatedRequestOptions = {}) {
    let url: string;

    if (projectId) {
      url = endpoint`projects/${projectId}/issues`;
    } else if (groupId) {
      url = endpoint`groups/${groupId}/issues`;
    } else {
      url = 'issues';
    }

    return RequestHelper.get<Omit<IssueSchema, 'epic'>[]>()(this, url, options);
  }

  create(projectId: string | number, options?: BaseRequestOptions) {
    return RequestHelper.post<IssueSchema>()(this, endpoint`projects/${projectId}/issues`, options);
  }

  closedBy(projectId: string | number, issueIid: number, options?: BaseRequestOptions) {
    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIid}/closed_by`,
      options,
    );
  }

  edit(projectId: string | number, issueIid: number, options?: BaseRequestOptions) {
    return RequestHelper.put<IssueSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIid}`,
      options,
    );
  }

  // TODO move
  link(
    projectId: string | number,
    issueIId: number,
    targetProjectId: string | number,
    targetIssueIId: number,
    options?: BaseRequestOptions,
  ) {
    const [targetPId, targetIId] = [targetProjectId, targetIssueIId].map(encodeURIComponent);

    return RequestHelper.post<IssueLinkSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIId}/links`,
      {
        targetProjectId: targetPId,
        targetIssueIid: targetIId,
        ...options,
      },
    );
  }

  // TODO move
  links(projectId: string | number, issueIid: number) {
    return RequestHelper.get<IssueLinkSchema[]>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIid}/links`,
    );
  }

  participants(projectId: string | number, issueIid: number, options?: Sudo) {
    return RequestHelper.get<Omit<UserSchema, 'created_at'>[]>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIid}/participants`,
      options,
    );
  }

  relatedMergeRequests(projectId: string | number, issueIid: number, options?: BaseRequestOptions) {
    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIid}/related_merge_requests`,
      options,
    );
  }

  // TODO move
  removeLink(
    projectId: string | number,
    issueIid: number,
    issueLinkId: string | number,
    options?: { linkType?: string } & Sudo & ShowExpanded,
  ) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/issues/${issueIid}/links/${issueLinkId}`,
      options,
    );
  }

  remove(projectId: string | number, issueIid: number, options?: Sudo & ShowExpanded) {
    return RequestHelper.del()(this, endpoint`projects/${projectId}/issues/${issueIid}`, options);
  }

  resetSpentTime(projectId: string | number, issueIid: number, options?: BaseRequestOptions) {
    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIid}/reset_spent_time`,
      options,
    );
  }

  resetTimeEstimate(projectId: string | number, issueIid: number, options?: Sudo) {
    return RequestHelper.post<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIid}/reset_time_estimate`,
      options,
    );
  }

  show(projectId: string | number, issueIid: number, options?: Sudo) {
    return RequestHelper.get<IssueSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIid}`,
      options,
    );
  }

  subscribe(projectId: string | number, issueIid: number, options?: Sudo) {
    return RequestHelper.post<IssueSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIid}/subscribe`,
      options,
    );
  }

  timeStats(projectId: string | number, issueIid: number, options?: Sudo) {
    return RequestHelper.get<TimeStatsSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIid}/time_stats`,
      options,
    );
  }

  unsubscribe(projectId: string | number, issueIid: number, options?: Sudo) {
    return RequestHelper.post<IssueSchema>()(
      this,
      endpoint`projects/${projectId}/issues/${issueIid}/unsubscribe`,
      options,
    );
  }
}
