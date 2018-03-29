import { BaseService, RequestHelper } from '../infrastructure';

class GeoNodes extends BaseService {
  all(options) {
    return RequestHelper.get(this, 'geo_nodes', options);
  }

  create(geonodeId, options) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.post(this, `geo_nodes/${gId}`, options);
  }

  edit(geonodeId, options) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.put(this, `geo_nodes/${gId}`, options);
  }

  failures(options) {
    return RequestHelper.post(this, 'geo_nodes/current/failures', options);
  }

  repair(geonodeId, options) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.delete(this, `geo_nodes/${gId}`, options);
  }

  show(geonodeId, options) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.get(this, `geo_nodes/${gId}`, options);
  }

  status(geonodeId, options) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.get(this, `geo_nodes/${gId}/status`, options);
  }

  statuses(options) {
    return RequestHelper.get(this, 'geo_nodes/statuses', options);
  }
}

export default GeoNodes;
