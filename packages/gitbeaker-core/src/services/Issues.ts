import { BaseService } from '@gitbeaker/requester-utils';
import { UserSchema } from './Users';
import { MergeRequestSchema } from './MergeRequests';
import { MilestoneSchema } from '../templates/ResourceMilestones';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

type ProjectOrGroup = { projectId?: string | number; groupId?: string | number };

export interface TimeStatsSchema extends Record<string, unknown> {
  human_time_estimate?: string;
  human_total_time_spent?: string;
  time_estimate?: number;
  total_time_spent?: number;
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
  closed_at?: null;
  closed_by?: null;
  id: number;
  title: string;
  created_at: string;
  moved_to_id?: null;
  iid: number;
  labels?: string[] | null;
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

export class Issues<C extends boolean = false> extends BaseService<C> {
  addSpentTime(projectId: string | number, issueIid: number, duration: string, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      `projects/${pId}/issues/${iId}/add_spent_time`,
      {
        duration,
        ...options,
      },
    );
  }

  addTimeEstimate(projectId: string | number, issueIid: number, duration: string, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      `projects/${pId}/issues/${iId}/time_estimate`,
      {
        duration,
        ...options,
      },
    );
  }

  all({ projectId, groupId, ...options }: ProjectOrGroup & PaginatedRequestOptions = {}) {
    let url: string;

    if (projectId) {
      url = `projects/${encodeURIComponent(projectId)}/issues`;
    } else if (groupId) {
      url = `groups/${encodeURIComponent(groupId)}/issues`;
    } else {
      url = 'issues';
    }

    return RequestHelper.get<Omit<IssueSchema, 'epic'>[]>()(this, url, options);
  }

  create(projectId: string | number, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<IssueSchema>()(this, `projects/${pId}/issues`, options);
  }

  closedBy(projectId: string | number, issueIid: number, options?: BaseRequestOptions) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      `projects/${pId}/issues/${iId}/closed_by`,
      options,
    );
  }

  edit(projectId: string | number, issueIid: number, options?: BaseRequestOptions) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.put<IssueSchema>()(this, `projects/${pId}/issues/${iId}`, options);
  }

  // TODO move
  link(
    projectId: string | number,
    issueIid: number,
    targetProjectId: string | number,
    targetIssueIid: number,
    options?: BaseRequestOptions,
  ) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);
    const [targetpId, targetIid] = [targetProjectId, targetIssueIid].map(encodeURIComponent);

    return RequestHelper.post()(this, `projects/${pId}/issues/${iId}/links`, {
      targetProjectId: targetpId,
      targetIssueIid: targetIid,
      ...options,
    });
  }

  // TODO move
  links(projectId: string | number, issueIid: number) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get()(this, `projects/${pId}/issues/${iId}/links`);
  }

  participants(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get<Omit<UserSchema, 'created_at'>>()(
      this,
      `projects/${pId}/issues/${iId}/participants`,
      options,
    );
  }

  relatedMergeRequests(projectId: string | number, issueIid: number, options?: BaseRequestOptions) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get<MergeRequestSchema>()(
      this,
      `projects/${pId}/issues/${iId}/related_merge_requests`,
      options,
    );
  }

  // TODO move
  removeLink(
    projectId: string | number,
    issueIid: number,
    issueLinkId: string | number,
    options?: BaseRequestOptions,
  ) {
    const [pId, iId, iLinkId] = [projectId, issueIid, issueLinkId].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/issues/${iId}/links/${iLinkId}`, {
      ...options,
    });
  }

  remove(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/issues/${iId}`, options);
  }

  resetSpentTime(projectId: string | number, issueIid: number, options?: BaseRequestOptions) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      `projects/${pId}/issues/${iId}/reset_spent_time`,
      options,
    );
  }

  resetTimeEstimate(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<TimeStatsSchema>()(
      this,
      `projects/${pId}/issues/${iId}/reset_time_estimate`,
      options,
    );
  }

  show(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get<IssueSchema>()(this, `projects/${pId}/issues/${iId}`, options);
  }

  subscribe(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<IssueSchema>()(
      this,
      `projects/${pId}/issues/${iId}/subscribe`,
      options,
    );
  }

  timeStats(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.get<TimeStatsSchema>()(
      this,
      `projects/${pId}/issues/${iId}/time_stats`,
      options,
    );
  }

  unsubscribe(projectId: string | number, issueIid: number, options?: Sudo) {
    const [pId, iId] = [projectId, issueIid].map(encodeURIComponent);

    return RequestHelper.post<IssueSchema>()(
      this,
      `projects/${pId}/issues/${iId}/unsubscribe`,
      options,
    );
  }
}
