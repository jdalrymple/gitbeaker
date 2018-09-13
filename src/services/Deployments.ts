import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

type DeploymentId = string | number;

class Deployments extends BaseService {
  all(projectId: ProjectId, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/deployments`, options);
  }

  show(projectId: ProjectId, deploymentId: DeploymentId) {
    const [pId, dId] = [projectId, deploymentId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/deployments/${dId}`);
  }
}

export default Deployments;
