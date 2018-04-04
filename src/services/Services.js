import { BaseService, RequestHelper } from '../infrastructure';

class Services extends BaseService {
  edit(projectId, serviceName, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/services/${serviceName}`, options);
  }

  remove(projectId, serviceName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/services/${serviceName}`);
  }

  show(projectId, serviceName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/services/${serviceName}`);
  }
}

export default Services;
