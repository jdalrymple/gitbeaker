import { BaseService, RequestHelper } from '../infrastructure';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  ProjectId,
  TriggerId,
} from '../../types/types';

class Triggers extends BaseService {
  add(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/triggers`, options);
  }

  all(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/triggers`, options);
  }

  edit(projectId: ProjectId, triggerId: TriggerId, options?: BaseRequestOptions) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/triggers/${tId}`, options);
  }

  remove(projectId: ProjectId, triggerId: TriggerId, options?: Sudo) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/triggers/${tId}`, options);
  }

  show(projectId: ProjectId, triggerId: TriggerId, options?: Sudo) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/triggers/${tId}`, options);
  }

  pipeline(projectId: ProjectId, options: RequestOptions) {
    if (!options.ref) throw new Error('Missing required property: ref');
    if (!options.token) throw new Error('Missing required property: token');

    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/trigger/pipeline`, options);
  }
}

export default Triggers;
