import { BaseService, RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

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

  create(projectId: string | number, mergerequestId: number, options?: Sudo) {
    return this.createMergeRequest(projectId, mergerequestId, options);
  }

  done({ todoId, ...options }: { todoId?: number } & Sudo) {
    let url = 'mark_as_done';

    if (todoId) url = `${todoId}/${url}`;

    return RequestHelper.post(this, `todos/${url}`, options);
  }
}
