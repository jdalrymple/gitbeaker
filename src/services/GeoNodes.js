import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class GeoNodes extends BaseService {
  @api({ options: true, method: 'GET' })
  all(options) {
    return RequestHelper.get(this, 'geo_nodes', options);
  }

  @api('<geonodeId>', { options: true, method: 'POST' })
  create(geonodeId, options) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.post(this, `geo_nodes/${gId}`, options);
  }

  @api('<geonodeId>', { options: true, method: 'PUT' })
  edit(geonodeId, options) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.put(this, `geo_nodes/${gId}`, options);
  }

  @api({ options: true, method: 'POST' })
  failures(options) {
    return RequestHelper.post(this, 'geo_nodes/current/failures', options);
  }

  @api('<geonodeId>', { options: true, method: 'DELETE' })
  repair(geonodeId, options) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.delete(this, `geo_nodes/${gId}`, options);
  }

  @api('<geonodeId>', { options: true, method: 'GET' })
  show(geonodeId, options) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.get(this, `geo_nodes/${gId}`, options);
  }

  @api('<geonodeId>', { options: true, method: 'GET' })
  status(geonodeId, options) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.get(this, `geo_nodes/${gId}/status`, options);
  }

  @api({ options: true, method: 'GET' })
  statuses(options) {
    return RequestHelper.get(this, 'geo_nodes/statuses', options);
  }
}

export default GeoNodes;
