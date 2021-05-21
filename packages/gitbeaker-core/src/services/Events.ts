import { BaseService } from '@gitbeaker/requester-utils';
import { UserSchema } from './Users';
import { RequestHelper, PaginatedRequestOptions } from '../infrastructure';

export interface EventOptions {
  action?:
    | 'created'
    | 'updated'
    | 'closed'
    | 'reopened'
    | 'pushed'
    | 'commented'
    | 'merged'
    | 'joined'
    | 'left'
    | 'destroyed'
    | 'expired';
  targetType?: 'issue' | 'milestone' | 'merge_request' | 'note' | 'project' | 'snippet' | 'user';
  before?: string;
  after?: string;
  scope?: string;
  sort?: 'asc' | 'desc';
}

export interface EventSchema extends Record<string, unknown> {
  id: number;
  title?: string;
  project_id: number;
  action_name: string;
  target_id: number;
  target_type: string;
  author_id: number;
  target_title: string;
  created_at: string;
  author: Omit<UserSchema, 'created_at'>;
  author_username: string;
}

export class Events extends BaseService {
  all({
    projectId,
    ...options
  }: { projectId?: string | number } & PaginatedRequestOptions & EventOptions = {}) {
    let url: string;

    if (projectId) {
      const pId = encodeURIComponent(projectId);

      url = `projects/${pId}/events`;
    } else {
      url = 'events';
    }

    return RequestHelper.get<EventSchema[]>()(this, url, options);
  }
}
