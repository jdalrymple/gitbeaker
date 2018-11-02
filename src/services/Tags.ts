import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

class Tags extends BaseService {
  all(projectId: ProjectId, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/tags`, options);
  }

  create(projectId: ProjectId, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/tags`, options);
  }

  remove(projectId: ProjectId, tagName: string) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/repository/tags/${tId}`);
  }

  show(projectId: ProjectId, tagName: string) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/tags/${tId}`);
  }
}

export default Tags;
