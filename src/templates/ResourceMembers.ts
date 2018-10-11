import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';
import { RequestOptions } from '../infrastructure/RequestHelper';

/** A valid access level */
export type AccessLevel = number;
class ResourceMembers extends BaseService {
  constructor(resourceType: string, baseParams: BaseModelContructorOptions) {
    super(baseParams);

    this.url = URLJoin(this.url, resourceType);
  }

  all(resourceId: ResourceId, includeInherited = false, options = {}) {
    const rId = encodeURIComponent(resourceId);

    const url = includeInherited ? `${rId}/members/all` : `${rId}/members`;

    return RequestHelper.get(this, url, options);
  }

  add(resourceId: ResourceId, userId: UserId, accessLevel: AccessLevel, options: RequestOptions) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/members`, {
      user_id: uId,
      access_level: accessLevel,
      ...options,
    });
  }

  edit(resourceId: ResourceId, userId: UserId, accessLevel: AccessLevel, options: RequestOptions) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/members/${uId}`, {
      access_level: accessLevel,
      ...options,
    });
  }

  show(resourceId: ResourceId, userId: UserId) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/members/${uId}`);
  }

  remove(resourceId: ResourceId, userId: UserId) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/members/${uId}`);
  }
}

export default ResourceMembers;
