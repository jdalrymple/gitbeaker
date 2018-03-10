import { BaseService, RequestHelper } from '../infrastructure';

export const ACCESS_LEVELS = {
  GUEST: 10,
  REPORTER: 20,
  DEVELOPER: 30,
  MASTER: 40,
  OWNER: 50,
};

export class ResourceAccessRequests extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.resourceType = resourceType;
    this.ACCESS_LEVELS = ACCESS_LEVELS;
  }

  all(resourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(
      this,
      `${this.resourceType}/${rId}/access_requests`,
    );
  }

  request(resourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(
      this,
      `${this.resourceType}/${rId}/access_requests`,
    );
  }

  approve(resourceId, userId, { accessLevel = 30 }) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.post(
      this,
      `${this.resourceType}/${rId}/access_requests/${uId}/approve`,
      { accessLevel },
    );
  }

  deny(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.delete(
      this,
      `${this.resourceType}/${rId}/access_requests/${uId}/approve`,
    );
  }
}

export default ResourceAccessRequests;
