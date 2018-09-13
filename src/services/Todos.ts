import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';
import { MergeRequestId } from './MergeRequests';

type TodoId = string | number;
interface TodosOptions {
  todoId: TodoId;
}
class Todos extends BaseService {
  all(options: RequestOptions) {
    return RequestHelper.get(this, 'todos', options);
  }

  create(projectId: ProjectId, mergerequestId: MergeRequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/todo`);
  }

  done({ todoId }: TodosOptions) {
    const tId = encodeURIComponent(todoId);

    return RequestHelper.delete(this, `todos/${tId}/mark_as_done`);
  }
}

export default Todos;
