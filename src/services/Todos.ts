import { BaseService, RequestHelper } from '../infrastructure';

class Todos extends BaseService {
  all(options) {
    return RequestHelper.get(this, 'todos', options);
  }

  create(projectId: number, mergerequestId: number) {
    return RequestHelper.post(this, `projects/${projectId}/merge_requests/${mergerequestId}/todo`);
  }

  done({ todoId }: { todoId?: number } = {}) {
    let url = 'mark_as_done';

    if (todoId) url = `${todoId}/${url}`
     
    return RequestHelper.delete(this, `todos/${url}`);
  }
}

export default Todos;
