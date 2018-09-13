import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

type EnvironmentId = string | number;

class Environments extends BaseService {
  all(projectId: ProjectId, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/environments`, options);
  }

  create(projectId: ProjectId, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/environments`, options);
  }

  edit(projectId: ProjectId, environmentId: EnvironmentId, options: RequestOptions) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/environments/${eId}`, options);
  }

  remove(projectId: ProjectId, environmentId: EnvironmentId) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/environments/${eId}`);
  }

  stop(projectId: ProjectId, environmentId: EnvironmentId) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/environments/${eId}/stop`);
  }
}

export default Environments;
