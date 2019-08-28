import { BaseService, PaginatedRequestOptions, RequestHelper, Sudo } from '../infrastructure';
import { ProjectId } from '.';

class Packages extends BaseService {
  all(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/packages`, options);
  }

  remove(projectId: ProjectId, packageId: number, options?: Sudo) {
    const [pId, pkId] = [projectId, packageId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/packages/${pkId}`, options);
  }

  show(projectId: ProjectId, packageId: number, options?: Sudo) {
    const [pId, pkId] = [projectId, packageId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/packages/${pkId}`, options);
  }

  showFiles(projectId: ProjectId, packageId: number, options?: Sudo) {
    const [pId, pkId] = [projectId, packageId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/packages/${pkId}/package_files`, options);
  }
}

export default Packages;
