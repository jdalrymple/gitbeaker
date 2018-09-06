import { BaseService, RequestHelper } from '../infrastructure';

class Services extends BaseService {
  edit(projectId: ProjectId, serviceName, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/services/${serviceName}`, options);
  }

  remove(projectId: ProjectId, serviceName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/services/${serviceName}`);
  }

  show(projectId: ProjectId, serviceName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/services/${serviceName}`);
  }
}

export default Services;
