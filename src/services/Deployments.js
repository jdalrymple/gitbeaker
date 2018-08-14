import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Deployments extends BaseService {
  @api('<projectId>', { options: true, method: 'GET' })
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/deployments`, options);
  }

  @api('<projectId>', '<deploymentId>', { method: 'POST' })
  show(projectId, deploymentId) {
    const [pId, dId] = [projectId, deploymentId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/deployments/${dId}`);
  }
}

export default Deployments;
