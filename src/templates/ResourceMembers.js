import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';

class ResourceMembers extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.url = URLJoin(this.url, resourceType);
  }

  all(resourceId) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/members`);
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
