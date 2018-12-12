import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

class ProtectedTags extends BaseService {
  all(projectId: ProjectId, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/protected_tags`, options);
  }

  protect(projectId: ProjectId, tagName: string, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/protected_tags`, {
      name: tagName,
      ...options,
    });
  }

  show(projectId: ProjectId, tagName: string) {
    const [pId, tName] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/protected_tags/${tName}`);
  }

  unprotect(projectId: ProjectId, tagName: string) {
    const [pId, tName] = [projectId, tagName].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/protected_tags/${tName}`);
  }
}

export default ProtectedTags;
