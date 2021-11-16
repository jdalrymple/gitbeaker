import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  endpoint,
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
    return RequestHelper.post<BadgeSchema>()(this, endpoint`${resourceId}/badges`, options);
  }

  all(resourceId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<BadgeSchema[]>()(this, endpoint`${resourceId}/badges`, options);
  }

  edit(resourceId: string | number, badgeId: number, options?: BaseRequestOptions) {
    return RequestHelper.put<BadgeSchema>()(
      this,
      endpoint`${resourceId}/badges/${badgeId}`,
      options,
    );
  }

  preview(resourceId: string | number, linkUrl: string, imageUrl: string, options?: Sudo) {
    return RequestHelper.get<Omit<BadgeSchema, 'id' | 'name' | 'kind'>>()(
      this,
      endpoint`${resourceId}/badges/render`,
      { linkUrl, imageUrl, ...options },
    );
  }

  remove(resourceId: string | number, badgeId: number, options?: Sudo) {
    return RequestHelper.del()(this, endpoint`${resourceId}/badges/${badgeId}`, options);
  }

  show(resourceId: string | number, badgeId: number, options?: Sudo) {
    return RequestHelper.get<BadgeSchema>()(
      this,
      endpoint`${resourceId}/badges/${badgeId}`,
      options,
    );
  }
}
