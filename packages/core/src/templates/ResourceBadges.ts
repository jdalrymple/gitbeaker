import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface BadgeSchema extends Record<string, unknown> {
  name: string;
  id: number;
  link_url: string;
  image_url: string;
  rendered_link_url: string;
  rendered_image_url: string;
  kind: 'project' | 'group';
}

export class ResourceBadges<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
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
