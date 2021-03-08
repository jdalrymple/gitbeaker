import { BaseService } from '@gitbeaker/requester-utils';
import { UserSchema } from './Users';
import { MilestoneSchema } from '../templates/ResourceMilestones';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface EpicIssueSchema extends Record<string, unknown> {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: string;
  created_at: string;
  updated_at: string;
  closed_at?: string;
  labels?: string[];
  milestone: MilestoneSchema;
  assignees?: Omit<UserSchema, 'created_at'>[];
  assignee: Omit<UserSchema, 'created_at'>;
  author: Omit<UserSchema, 'created_at'>;
  user_notes_count: number;
  upvotes: number;
  downvotes: number;
  due_date?: string;
  confidential: boolean;
  weight?: null;
  discussion_locked?: boolean;
  web_url: string;
  time_stats: {
    time_estimate: number;
    total_time_spent: number;
    human_time_estimate?: string;
    human_total_time_spent?: string;
  };
  _links: {
    self: string;
    notes: string;
    award_emoji: string;
    project: string;
  };
  subscribed: boolean;
  epic_issue_id: number;
}

export class EpicIssues<C extends boolean = false> extends BaseService<C> {
  all(groupId: string | number, epicId: number, options?: PaginatedRequestOptions) {
    const [gId, eId] = [groupId, epicId].map(encodeURIComponent);

    return RequestHelper.get<EpicIssueSchema[]>()(
      this,
      `groups/${gId}/epics/${eId}/issues`,
      options,
    );
  }

  assign(groupId: string | number, epicId: number, issueId: number, options?: Sudo) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.post<EpicIssueSchema>()(
      this,
      `groups/${gId}/epics/${eId}/issues/${iId}`,
      options,
    );
  }

  edit(groupId: string | number, epicId: number, issueId: number, options?: BaseRequestOptions) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.put<EpicIssueSchema>()(
      this,
      `groups/${gId}/epics/${eId}/issues/${iId}`,
      options,
    );
  }

  remove(groupId: string | number, epicId: number, issueId: number, options?: Sudo) {
    const [gId, eId, iId] = [groupId, epicId, issueId].map(encodeURIComponent);

    return RequestHelper.del()(this, `groups/${gId}/epics/${eId}/issues/${iId}`, options);
  }
}
