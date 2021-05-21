import { MilestoneSchema, UserSchema } from '.';
import { TimeStatsSchema } from './TimeStatsSchema';

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
