import { BaseService, RequestHelper } from '../infrastructure';
import { PaginatedRequestOptions, Sudo, ProjectId, DeploymentId } from '@typings';

class Deployments extends BaseService {
  all(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/deployments`, options);
  }

  show(projectId: ProjectId, deploymentId: DeploymentId, options?: Sudo) {
    const [pId, dId] = [projectId, deploymentId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/deployments/${dId}`, options);
  }
}

export default Deployments;
