import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Todos extends BaseService {
  @api({ options: true, method: 'GET' })
  all(options) {
    return RequestHelper.get(this, 'todos', options);
  }

  @api('<projectId>', '<mergerequestId>', { method: 'POST' })
  create(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/todo`);
  }

  @api('<todoId>', { method: 'DELETE' })
  done(todoId) {
    const tId = encodeURIComponent(todoId);

    return RequestHelper.delete(this, `todos/${tId}/mark_as_done`);
  }
}

export default Todos;
