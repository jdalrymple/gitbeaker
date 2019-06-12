import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { ProjectId } from '.';

class Tags extends BaseService {
  all(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/repository/tags`, options);
  }

  create(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/repository/tags`, options);
  }

  remove(projectId: ProjectId, tagName: string, options?: Sudo) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/repository/tags/${tId}`, options);
  }

  show(projectId: ProjectId, tagName: string, options?: Sudo) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/repository/tags/${tId}`, options);
  }
}

export default Tags;
