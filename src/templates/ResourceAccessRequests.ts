import { BaseService, RequestHelper } from '../infrastructure';

export const ACCESS_LEVELS = {
  GUEST: 10,
  REPORTER: 20,
  DEVELOPER: 30,
  MASTER: 40,
  OWNER: 50,
};

class ResourceAccessRequests extends BaseService {
  protected ACCESS_LEVELS: typeof ACCESS_LEVELS;

  constructor(resourceType, baseParams) {
    super(baseParams);

    this.url = [this.url, resourceType].join('/');
    this.ACCESS_LEVELS = ACCESS_LEVELS;
  }

  all(resourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/access_requests`);
  }

  request(resourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/access_requests`);
  }

  approve(resourceId, userId, { accessLevel = 30 }) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/access_requests/${uId}/approve`, {
      accessLevel,
    });
  }

  deny(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/access_requests/${uId}`);
  }
}

export default ResourceAccessRequests;
