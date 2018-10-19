import { BaseService, RequestHelper } from '../infrastructure';

class ResourceMembers extends BaseService {
  constructor(resourceType, baseParams) {
    super(baseParams);

    this.url = [this.url, resourceType].join('/');
  }

  all(resourceId, includeInherited = false, options = {}) {
    const rId = encodeURIComponent(resourceId);
    const url = [rId, 'members'];

    if (includeInherited) url.push('all');

    return RequestHelper.get(this, url.join('/'), { options });
  }

  add(resourceId, userId, accessLevel, options) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/members`, {
      user_id: uId,
      access_level: parseInt(accessLevel, 10),
      ...options,
    });
  }

  edit(resourceId, userId, accessLevel, options) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/members/${uId}`, {
      access_level: parseInt(accessLevel, 10),
      ...options,
    });
  }

  show(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/members/${uId}`);
  }

  remove(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/members/${uId}`);
  }
}

export default ResourceMembers;
