import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class GeoNodes<C extends boolean = false> extends BaseService<C> {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get()(this, 'geo_nodes', options);
  }

  create(geonodeId: number, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.post()(this, `geo_nodes/${gId}`, options);
  }

  edit(geonodeId: number, options?: BaseRequestOptions) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.put()(this, `geo_nodes/${gId}`, options);
  }

  failures(options?: BaseRequestOptions) {
    return RequestHelper.post()(this, 'geo_nodes/current/failures', options);
  }

  repair(geonodeId: number, options?: Sudo) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.del()(this, `geo_nodes/${gId}`, options);
  }

  show(geonodeId: number, options?: Sudo) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.get()(this, `geo_nodes/${gId}`, options);
  }

  status(geonodeId: number, options?: Sudo) {
    const gId = encodeURIComponent(geonodeId);

    return RequestHelper.get()(this, `geo_nodes/${gId}/status`, options);
  }

  statuses(options?: PaginatedRequestOptions) {
    return RequestHelper.get()(this, 'geo_nodes/statuses', options);
  }
}
