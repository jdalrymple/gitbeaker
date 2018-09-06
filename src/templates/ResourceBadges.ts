import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class ResourceBadges extends BaseService {
  constructor(resourceType: string, baseParams: BaseModelContructorOptions) {
    super(baseParams);

    this.url = URLJoin(this.url, resourceType);
  }

  add(resourceId: ResourceId, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/badges`, options);
  }

  all(resourceId: ResourceId, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/badges`, options);
  }

  edit(resourceId: ResourceId, badgeId, options) {
    const [rId, bId] = [resourceId, badgeId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/badges/${bId}`, options);
  }

  preview(resourceId: ResourceId, linkUrl, imageUrl) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/badges/render`, { linkUrl, imageUrl });
  }

  remove(resourceId: ResourceId, badgeId) {
    const [rId, bId] = [resourceId, badgeId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/badges/${bId}`);
  }

  show(resourceId: ResourceId, badgeId) {
    const [rId, bId] = [resourceId, badgeId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/badges/${bId}`);
  }
}

export default ResourceBadges;
