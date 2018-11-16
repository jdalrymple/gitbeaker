import { BaseService, RequestHelper } from '../infrastructure';
import {
  BaseServiceOptions,
  PaginatedRequestOptions,
  BaseRequestOptions,
  AccessLevel,
  Sudo,
  ResourceId,
  ResourceType,
  UserId,
} from '@typings';

class ResourceMembers extends BaseService {
  constructor(resourceType: ResourceType, options: BaseServiceOptions) {
    super({ url: resourceType, ...options });
  }

  all(resourceId: ResourceId, includeInherited = false, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);
    const url = [rId, 'members'];

    if (includeInherited) url.push('all');

    return RequestHelper.get(this, url.join('/'), { options });
  }

  add(
    resourceId: ResourceId,
    userId: UserId,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/members`, {
      userId: uId,
      accessLevel,
      ...options,
    });
  }

  edit(
    resourceId: ResourceId,
    userId: UserId,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/members/${uId}`, {
      accessLevel,
      ...options,
    });
  }

  show(resourceId: ResourceId, userId: UserId, options?: Sudo) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/members/${uId}`, options);
  }

  remove(resourceId: ResourceId, userId: UserId, options?: Sudo) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/members/${uId}`, options);
  }
}

export default ResourceMembers;
