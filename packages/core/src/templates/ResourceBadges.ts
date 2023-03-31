import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
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

export type CondensedBadgeSchema = Omit<BadgeSchema, 'id' | 'name' | 'kind'>;

export class ResourceBadges<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  add<E extends boolean = false>(
    resourceId: string | number,
    linkUrl: string,
    imageUrl: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<BadgeSchema, C, E, void>> {
    return RequestHelper.post<BadgeSchema>()(this, endpoint`${resourceId}/badges`, {
      linkUrl,
      imageUrl,
      ...options,
    });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<BadgeSchema[], C, E, P>> {
    return RequestHelper.get<BadgeSchema[]>()(this, endpoint`${resourceId}/badges`, options);
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    badgeId: number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<BadgeSchema, C, E, void>> {
    return RequestHelper.put<BadgeSchema>()(
      this,
      endpoint`${resourceId}/badges/${badgeId}`,
      options,
    );
  }

  preview<E extends boolean = false>(
    resourceId: string | number,
    linkUrl: string,
    imageUrl: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CondensedBadgeSchema, C, E, void>> {
    return RequestHelper.get<CondensedBadgeSchema>()(this, endpoint`${resourceId}/badges/render`, {
      linkUrl,
      imageUrl,
      ...options,
    });
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    badgeId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`${resourceId}/badges/${badgeId}`, options);
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    badgeId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<BadgeSchema, C, E, void>> {
    return RequestHelper.get<BadgeSchema>()(
      this,
      endpoint`${resourceId}/badges/${badgeId}`,
      options,
    );
  }
}
