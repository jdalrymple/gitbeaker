import { BaseService, RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

interface CreateTodoOptions extends Sudo {
  resourceName?: 'mergerequest' | 'issue';
}

export class Todos extends BaseService {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, 'todos', options);
  }

  createMergeRequest(projectId: string | number, mergerequestId: number, options?: Sudo) {
    return RequestHelper.post(
      this,
      `projects/${projectId}/merge_requests/${mergerequestId}/todo`,
      options,
    );
  }

  createIssue(projectId: string | number, issueId: number, options?: Sudo) {
    return RequestHelper.post(this, `projects/${projectId}/issues/${issueId}/todo`, options);
  }

  create(
    projectId: string | number,
    resourceId: number,
    { resourceName, ...options }: CreateTodoOptions = {},
  ) {
    if (resourceName === 'issue') {
      return this.createIssue(projectId, resourceId, options);
    }
    return this.createMergeRequest(projectId, resourceId, options);
  }

  done({ todoId, ...options }: { todoId?: number } & Sudo) {
    let url = 'mark_as_done';

    if (todoId) url = `${todoId}/${url}`;

    return RequestHelper.post(this, `todos/${url}`, options);
  }
}
