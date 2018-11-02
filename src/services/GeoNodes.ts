import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

export type GeonodeId = string | number;

class GeoNodes extends BaseService {
  all(options: RequestOptions) {
    return RequestHelper.get(this, 'geo_nodes', options);
  }

  create(geonodeId: GeonodeId, options: RequestOptions) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.post(this, `geo_nodes/${gId}`, options);
  }

  edit(geonodeId: GeonodeId, options: RequestOptions) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.put(this, `geo_nodes/${gId}`, options);
  }

  failures(options: RequestOptions) {
    return RequestHelper.post(this, 'geo_nodes/current/failures', options);
  }

  repair(geonodeId: GeonodeId, options: RequestOptions) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.delete(this, `geo_nodes/${gId}`, options);
  }

  show(geonodeId: GeonodeId, options: RequestOptions) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.get(this, `geo_nodes/${gId}`, options);
  }

  status(geonodeId: GeonodeId, options: RequestOptions) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.get(this, `geo_nodes/${gId}/status`, options);
  }

  statuses(options: RequestOptions) {
    return RequestHelper.get(this, 'geo_nodes/statuses', options);
  }
}

export default GeoNodes;
