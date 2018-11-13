import { BaseService, RequestHelper } from '../infrastructure';
import { BaseRequestOptions, Sudo, ProjectId, SupportedService } from '@src/types';

class Services extends BaseService {
  edit(projectId: ProjectId, serviceName: SupportedService, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/services/${serviceName}`, options);
  }

  remove(projectId: ProjectId, serviceName: SupportedService, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/services/${serviceName}`, options);
  }

  show(projectId: ProjectId, serviceName: SupportedService, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/services/${serviceName}`, options);
  }
}

export default Services;
