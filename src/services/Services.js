import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Services extends BaseService {
  @api('<projectId>', '<serviceName>', { options: true, method: 'PUT' })
  edit(projectId, serviceName, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/services/${serviceName}`, options);
  }

  @api('<projectId>', '<serviceName>', { options: true, method: 'DELETE' })
  remove(projectId, serviceName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/services/${serviceName}`);
  }

  @api('<projectId>', '<serviceName>', { method: 'GET' })
  show(projectId, serviceName) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/services/${serviceName}`);
  }
}

export default Services;
