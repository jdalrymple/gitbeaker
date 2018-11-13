import { BaseService, RequestHelper } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId, LabelId } from '@src/types';

class Labels extends BaseService {
  all(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/labels`, options);
  }

  create(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/labels`, options);
  }

  edit(projectId: ProjectId, labelName: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/labels`, { name: labelName, ...options });
  }

  remove(projectId: ProjectId, labelName: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/labels`, { name: labelName, ...options });
  }

  subscribe(projectId: ProjectId, labelId: LabelId, options?: Sudo) {
    const [pId, lId] = [projectId, labelId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/issues/${lId}/subscribe`, options);
  }

  unsubscribe(projectId: ProjectId, labelId: LabelId, options?: Sudo) {
    const [pId, lId] = [projectId, labelId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/issues/${lId}/unsubscribe`, options);
  }
}

export default Labels;
