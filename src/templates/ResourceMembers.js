import { BaseService, RequestHelper } from '../infrastructure';

class ResourceMembers extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.resourceType = resourceType;
  }

  all(resourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${this.resourceType}/${rId}/members`);
  }

  add(resourceId, userId, accessLevel, options) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.post(this, `${this.resourceType}/${rId}/members`, {
      user_id: uId,
      access_level: parseInt(accessLevel, 10),
      ...options,
    });
  }

  edit(resourceId, userId, accessLevel, options) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.put(
      this,
      `${this.resourceType}/${rId}/members/${uId}`,
      {
        access_level: parseInt(accessLevel, 10),
        ...options,
      },
    );
  }

  show(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.get(
      this,
      `${this.resourceType}/${rId}/members/${uId}`,
    );
  }

  remove(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.delete(
      this,
      `${this.resourceType}/${rId}/members/${uId}`,
    );
  }
}

export default ResourceMembers;
