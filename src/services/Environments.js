import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Environments extends BaseService {
  @api('<projectId>', { method: 'GET' })
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/environments`, options);
  }

  @api('<projectId>', { options: true, method: 'POST' })
  create(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/environments`, options);
  }

  @api('<projectId>', '<environmentId>', { options: true, method: 'PUT' })
  edit(projectId, environmentId, options) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/environments/${eId}`, options);
  }

  @api('<projectId>', '<environmentId>', { method: 'DELETE' })
  remove(projectId, environmentId) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/environments/${eId}`);
  }

  @api('<projectId>', '<environmentId>', { method: 'POST' })
  stop(projectId, environmentId) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/environments/${eId}/stop`);
  }
}

export default Environments;
