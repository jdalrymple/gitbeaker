import { BaseService, RequestHelper } from '../infrastructure';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  Sudo,
  ProjectId,
  EnvironmentId,
} from '@src/types';

class Environments extends BaseService {
  all(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/environments`, options);
  }

  create(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/environments`, options);
  }

  edit(projectId: ProjectId, environmentId: EnvironmentId, options?: BaseRequestOptions) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/environments/${eId}`, options);
  }

  remove(projectId: ProjectId, environmentId: EnvironmentId, options?: Sudo) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/environments/${eId}`, options);
  }

  stop(projectId: ProjectId, environmentId: EnvironmentId, options?: Sudo) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/environments/${eId}/stop`, options);
  }
}

export default Environments;
