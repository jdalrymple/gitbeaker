import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { api } from '../cli/worker';

class ResourceBadges extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.url = URLJoin(this.url, resourceType);
  }

  @api('<resourceId>', { options: true, method: 'POST' })
  add(resourceId, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/badges`, options);
  }

  @api('<resourceId>', { options: true, method: 'GET' })
  all(resourceId, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/badges`, options);
  }

  @api('<resourceId>', '<badgeId>', { options: true, method: 'PUT' })
  edit(resourceId, badgeId, options) {
    const [rId, bId] = [resourceId, badgeId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/badges/${bId}`, options);
  }

  @api('<projectId>', '<linkUrl>', '<imageUrl>', { method: 'GET' })
  preview(resourceId, linkUrl, imageUrl) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/badges/render`, { linkUrl, imageUrl });
  }

  @api('<resourceId>', '<badgeId>', { method: 'DELETE' })
  remove(resourceId, badgeId) {
    const [rId, bId] = [resourceId, badgeId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/badges/${bId}`);
  }

  @api('<resourceId>', '<badgeId>', { method: 'GET' })
  show(resourceId, badgeId) {
    const [rId, bId] = [resourceId, badgeId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/badges/${bId}`);
  }
}

export default ResourceBadges;
