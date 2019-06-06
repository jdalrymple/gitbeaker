import { BaseService, RequestHelper } from '../infrastructure';

class Releases extends BaseService {
  all(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/releases`, options);
  }

  create(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/releases`, options);
  }

  edit(projectId: ProjectId, tagName: string, options?: BaseRequestOptions) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/releases/${tId}`, options);
  }

  remove(projectId: ProjectId, tagName: string, options?: Sudo) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/releases/${tId}`, options);
  }

  show(projectId: ProjectId, tagName: string, options?: Sudo) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/releases/${tId}`, options);
  }
}

export default Releases;
