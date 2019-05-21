import { BaseService, RequestHelper } from '../infrastructure';

class ResourceBadges extends BaseService {
  constructor(resourceType: string, options: BaseServiceOptions) {
    super({ url: resourceType, ...options });
  }

  add(resourceId: ResourceId, options?: BaseRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/badges`, options);
  }

  all(resourceId: ResourceId, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/badges`, options);
  }

  edit(resourceId: ResourceId, badgeId: BadgeId, options?: BaseRequestOptions) {
    const [rId, bId] = [resourceId, badgeId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/badges/${bId}`, options);
  }

  preview(resourceId: ResourceId, linkUrl: string, imageUrl: string, options?: Sudo) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/badges/render`, { linkUrl, imageUrl, ...options });
  }

  remove(resourceId: ResourceId, badgeId: BadgeId, options?: Sudo) {
    const [rId, bId] = [resourceId, badgeId].map(encodeURIComponent);

    return RequestHelper.del(this, `${rId}/badges/${bId}`, options);
  }

  show(resourceId: ResourceId, badgeId: BadgeId, options?: Sudo) {
    const [rId, bId] = [resourceId, badgeId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/badges/${bId}`, options);
  }
}

export default ResourceBadges;
