import { BaseService, RequestHelper } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, GeonodeId } from '@typings';

class GeoNodes extends BaseService {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, 'geo_nodes', options);
  }

  create(geonodeId: GeonodeId, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.post(this, `geo_nodes/${gId}`, options);
  }

  edit(geonodeId: GeonodeId, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.put(this, `geo_nodes/${gId}`, options);
  }

  failures(options?: BaseRequestOptions) {
    return RequestHelper.post(this, 'geo_nodes/current/failures', options);
  }

  repair(geonodeId: GeonodeId, options?: Sudo) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.delete(this, `geo_nodes/${gId}`, options);
  }

  show(geonodeId: GeonodeId, options?: Sudo) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.get(this, `geo_nodes/${gId}`, options);
  }

  status(geonodeId: GeonodeId, options?: Sudo) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.get(this, `geo_nodes/${gId}/status`, options);
  }

  statuses(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, 'geo_nodes/statuses', options);
  }
}

export default GeoNodes;
