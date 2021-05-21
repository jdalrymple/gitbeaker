import { BaseService } from '@gitbeaker/requester-utils';
import { UserSchema, ProjectSchema, MilestoneSchema } from '../models';

import { RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface TodoSchema extends Record<string, unknown> {
  id: number;
  project: Pick<
    ProjectSchema,
    'id' | 'name' | 'name_with_namespace' | 'path' | 'path_with_namespace'
  >;
  author: Pick<UserSchema, 'name' | 'username' | 'id' | 'state' | 'avatar_url' | 'web_url'>;
  action_name: string;
  target_type: string;
  target: {
    id: number;
    iid: number;
    project_id: number;
    title: string;
    description: string;
    state: string;
    created_at: string;
    updated_at: string;
    target_branch: string;
    source_branch: string;
    upvotes: number;
    downvotes: number;
    author: Pick<UserSchema, 'name' | 'username' | 'id' | 'state' | 'avatar_url' | 'web_url'>;
    assignee: Pick<UserSchema, 'name' | 'username' | 'id' | 'state' | 'avatar_url' | 'web_url'>;
    source_project_id: number;
    target_project_id: number;
    labels?: string[];
    work_in_progress: boolean;
    milestone: Omit<MilestoneSchema, 'start_date' | 'expired' | 'web_url'>;
    merge_when_pipeline_succeeds: boolean;
    merge_status: string;
    user_notes_count: number;
  };
  target_url: string;
  body: string;
  state: string;
  created_at: string;
  updated_at: string;
}

export class Todos<C extends boolean = false> extends BaseService<C> {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<TodoSchema[]>()(this, 'todos', options);
  }

  create(
    projectId: string | number,
    resourceId: number,
    resourceName: 'mergerequest' | 'issue',
    options?: Sudo,
  ) {
    const resourceAPI = resourceName === 'issue' ? 'issues' : 'merge_requests';

    return RequestHelper.post<TodoSchema>()(
      this,
      `projects/${projectId}/${resourceAPI}/${resourceId}/todo`,
      options,
    );
  }

  done({ todoId, ...options }: { todoId?: number } & Sudo = {}) {
    const url = ['todos'];

    if (todoId) url.push(todoId.toString());

    url.push('mark_as_done');

    // Fixme: Rewrite this to make better use of proper typing
    if (todoId) {
      return RequestHelper.post<TodoSchema>()(
        this,
        url.join('/'),
        options as Record<string, unknown>,
      );
    }
    return RequestHelper.post<void>()(this, url.join('/'), options as Record<string, unknown>);
  }
}
