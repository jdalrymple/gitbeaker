import { BaseService, RequestHelper } from '../infrastructure';

class Deployments extends BaseService {
  all(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/deployments`, options);
  }

  show(projectId: ProjectId, deploymentId) {
    const [pId, dId] = [projectId, deploymentId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/deployments/${dId}`);
  }
}

export default Deployments;
