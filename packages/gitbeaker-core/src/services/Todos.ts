import { BaseService, RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

export class Todos extends BaseService {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, 'todos', options);
  }

  create(projectId: string | number, mergerequestId: number, options?: Sudo) {
    return RequestHelper.post(
      this,
      `projects/${projectId}/merge_requests/${mergerequestId}/todo`,
      options,
    );
  }

  done({ todoId, ...options }: { todoId?: number } & Sudo) {
    let url = 'mark_as_done';

    if (todoId) url = `${todoId}/${url}`;

    return RequestHelper.del(this, `todos/${url}`, options);
  }
}
