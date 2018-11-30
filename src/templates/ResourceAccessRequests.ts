import { BaseService, RequestHelper } from '../infrastructure';
import {
  BaseServiceOptions,
  Sudo,
  ResourceType,
  ResourceId,
  UserId,
  AccessLevel,
} from '@typings';

class ResourceAccessRequests extends BaseService {
  constructor(resourceType: ResourceType, options: BaseServiceOptions) {
    super({ url: resourceType, ...options });
  }

  all(resourceId: ResourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/access_requests`);
  }

  request(resourceId: ResourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/access_requests`);
  }

  approve(
    resourceId: ResourceId,
    userId: UserId,
    { accessLevel }: { accessLevel: AccessLevel } & Sudo,
  ) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/access_requests/${uId}/approve`, {
      accessLevel,
    });
  }

  deny(resourceId: ResourceId, userId: UserId) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.del(this, `${rId}/access_requests/${uId}`);
  }
}

export default ResourceAccessRequests;
