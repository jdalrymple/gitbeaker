import { BaseService } from '@gitbeaker/requester-utils';
import { PaginatedRequestOptions, RequestHelper, Sudo } from '../infrastructure';

export class Packages<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions<'keyset' | 'offset'>) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get()(this, `projects/${pId}/packages`, options);
  }

  remove(projectId: string | number, packageId: number, options?: Sudo) {
    const [pId, pkId] = [projectId, packageId].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/packages/${pkId}`, options);
  }

  show(projectId: string | number, packageId: number, options?: Sudo) {
    const [pId, pkId] = [projectId, packageId].map(encodeURIComponent);

    return RequestHelper.get()(this, `projects/${pId}/packages/${pkId}`, options);
  }

  showFiles(projectId: string | number, packageId: number, options?: Sudo) {
    const [pId, pkId] = [projectId, packageId].map(encodeURIComponent);

    return RequestHelper.get()(this, `projects/${pId}/packages/${pkId}/package_files`, options);
  }
}
