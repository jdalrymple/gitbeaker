import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

export const ACCESS_LEVELS = {
  GUEST: 10,
  REPORTER: 20,
  DEVELOPER: 30,
  MASTER: 40,
  OWNER: 50,
};
@cls()
class ResourceAccessRequests extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.url = URLJoin(this.url, resourceType);
    this.ACCESS_LEVELS = ACCESS_LEVELS;
  }

  @api('<resourceId>', { method: 'GET' })
  all(resourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/access_requests`);
  }

  @api('<resourceId>', { method: 'POST' })
  request(resourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/access_requests`);
  }

  @api('<resourceId>', '<userId>', { options: true, method: 'POST' })
  approve(resourceId, userId, { accessLevel = 30 }) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/access_requests/${uId}/approve`, {
      accessLevel,
    });
  }

  @api('<resourceId>', '<userId>', { method: 'DELETE' })
  deny(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/access_requests/${uId}`);
  }
}

export default ResourceAccessRequests;
