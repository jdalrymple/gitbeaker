import { BaseService, RequestHelper } from '../infrastructure';

class ResourceBadges extends BaseService {
  constructor(resourceType, baseParams) {
    super({ url: resourceType, ...baseParams });
  }

  add(resourceId, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/badges`, options);
  }

  all(resourceId, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/badges`, options);
  }

  edit(resourceId, badgeId, options) {
    const [rId, bId] = [resourceId, badgeId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/badges/${bId}`, options);
  }

  preview(resourceId, linkUrl, imageUrl) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/badges/render`, { linkUrl, imageUrl });
  }

  remove(resourceId, badgeId) {
    const [rId, bId] = [resourceId, badgeId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/badges/${bId}`);
  }

  show(resourceId, badgeId) {
    const [rId, bId] = [resourceId, badgeId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/badges/${bId}`);
  }
}

export default ResourceBadges;
