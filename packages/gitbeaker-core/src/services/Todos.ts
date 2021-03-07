import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

interface CreateTodoOptions extends Sudo {
  resourceName?: 'mergerequest' | 'issue';
}

export class Todos<C extends boolean = false> extends BaseService<C> {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get()(this, 'todos', options);
  }

  create(
    projectId: string | number,
    resourceId: number,
    { resourceName, ...options }: CreateTodoOptions = {},
  ) {
    if (resourceName === 'issue') {
      return RequestHelper.post()(
        this,
        `projects/${projectId}/issues/${resourceId}/todo`,
        options as Record<string, unknown>,
      );
    }
    return RequestHelper.post()(
      this,
      `projects/${projectId}/merge_requests/${resourceId}/todo`,
      options as Record<string, unknown>,
    );
  }

  done({ todoId, ...options }: { todoId?: number } & Sudo = {}) {
    let url = 'mark_as_done';

    if (todoId) url = `${todoId}/${url}`;

    return RequestHelper.post()(this, `todos/${url}`, options as Record<string, unknown>);
  }
}
