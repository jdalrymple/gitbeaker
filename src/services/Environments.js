import { BaseService, RequestHelper } from '../infrastructure';

class Environments extends BaseService {
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/environments`, options);
  }

  create(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/environments`, options);
  }

  edit(projectId, environmentId, options) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/environments/${eId}`, options);
  }

  remove(projectId, environmentId) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/environments/${eId}`);
  }

  stop(projectId, environmentId) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/environments/${eId}/stop`);
  }
}

export default Environments;
