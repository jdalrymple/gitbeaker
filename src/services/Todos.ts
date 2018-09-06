import { BaseService, RequestHelper } from '../infrastructure';

interface TodosOptions {
  todoId?: string;
}
class Todos extends BaseService {
  all(options) {
    return RequestHelper.get(this, 'todos', options);
  }

  create(projectId: ProjectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/todo`);
  }

  done({ todoId }: TodosOptions = {}) {
    const tId = encodeURIComponent(todoId);

    return RequestHelper.delete(this, `todos/${tId}/mark_as_done`);
  }
}

export default Todos;
