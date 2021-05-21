import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { BadgeSchema } from '../models';

export class ResourceBadges<C extends boolean = false> extends BaseService<C> {
  constructor(resourceType: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  add(resourceId: string | number, options?: BaseRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post<BadgeSchema>()(this, `${rId}/badges`, options);
  }

  all(resourceId: string | number, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get<BadgeSchema[]>()(this, `${rId}/badges`, options);
  }

  edit(resourceId: string | number, badgeId: number, options?: BaseRequestOptions) {
    const [rId, bId] = [resourceId, badgeId].map(encodeURIComponent);

    return RequestHelper.put<BadgeSchema>()(this, `${rId}/badges/${bId}`, options);
  }

  preview(resourceId: string | number, linkUrl: string, imageUrl: string, options?: Sudo) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get<Omit<BadgeSchema, 'id' | 'name' | 'kind'>>()(
      this,
      `${rId}/badges/render`,
      { linkUrl, imageUrl, ...options },
    );
  }

  remove(resourceId: string | number, badgeId: number, options?: Sudo) {
    const [rId, bId] = [resourceId, badgeId].map(encodeURIComponent);

    return RequestHelper.del()(this, `${rId}/badges/${bId}`, options);
  }

  show(resourceId: string | number, badgeId: number, options?: Sudo) {
    const [rId, bId] = [resourceId, badgeId].map(encodeURIComponent);

    return RequestHelper.get<BadgeSchema>()(this, `${rId}/badges/${bId}`, options);
  }
}
