import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface CondensedBadgeSchema extends Record<string, unknown> {
  link_url: string;
  image_url: string;
  rendered_link_url: string;
  rendered_image_url: string;
}

export interface BadgeSchema extends CondensedBadgeSchema {
  name: string;
  id: number;
  kind: 'project' | 'group';
}

export interface EditBadgeOptions {
  name?: string;
  linkUrl?: string;
  imageUrl?: string;
}

export class ResourceBadges<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  add<E extends boolean = false>(
    resourceId: string | number,
    linkUrl: string,
    imageUrl: string,
    options?: { name?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BadgeSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<BadgeSchema>()(this, endpoint`${resourceId}/badges`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        linkUrl,
        imageUrl,
      },
    });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: { name?: string } & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BadgeSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<BadgeSchema[]>()(this, endpoint`${resourceId}/badges`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams & PaginationRequestSearchParams<P>,
    });
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    badgeId: number,
    options?: EditBadgeOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BadgeSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<BadgeSchema>()(this, endpoint`${resourceId}/badges/${badgeId}`, {
      sudo,
      showExpanded,
      body,
    });
  }

  preview<E extends boolean = false>(
    resourceId: string | number,
    linkUrl: string,
    imageUrl: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CondensedBadgeSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<CondensedBadgeSchema>()(this, endpoint`${resourceId}/badges/render`, {
      sudo,
      showExpanded,
      searchParams: {
        linkUrl,
        imageUrl,
      },
    });
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    badgeId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`${resourceId}/badges/${badgeId}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    badgeId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BadgeSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<BadgeSchema>()(this, endpoint`${resourceId}/badges/${badgeId}`, {
      sudo,
      showExpanded,
    });
  }
}
