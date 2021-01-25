import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

interface CreateTodoOptions extends Sudo {
  resourceName?: 'mergerequest' | 'issue';
}

export class Todos<C extends boolean> extends BaseService<C> {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<C>(this, 'todos', options);
  }

  create(
    projectId: string | number,
    resourceId: number,
    { resourceName, ...options }: CreateTodoOptions = {},
  ) {
    if (resourceName === 'issue') {
      return RequestHelper.post<C>(
        this,
        `projects/${projectId}/issues/${resourceId}/todo`,
        options,
      );
    }
    return RequestHelper.post<C>(
      this,
      `projects/${projectId}/merge_requests/${resourceId}/todo`,
      options,
    );
  }

  done({ todoId, ...options }: { todoId?: number } & Sudo) {
    let url = 'mark_as_done';

    if (todoId) url = `${todoId}/${url}`;

    return RequestHelper.post<C>(this, `todos/${url}`, options);
  }
}
