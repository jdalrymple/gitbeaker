import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type {
  BadgeSchema,
  CondensedBadgeSchema,
  EditBadgeOptions,
} from '../templates/ResourceBadges';

import { ResourceBadges } from '../templates';

export interface GroupBadgeSchema extends BadgeSchema {
  kind: 'group';
}

export interface GroupBadges<C extends boolean = false> extends ResourceBadges<C> {
  add<E extends boolean = false>(
    groupId: string | number,
    linkUrl: string,
    imageUrl: string,
    options?: { name?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupBadgeSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: { name?: string } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<GroupBadgeSchema[], C, E, P>>;

  edit<E extends boolean = false>(
    groupId: string | number,
    badgeId: number,
    options?: EditBadgeOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupBadgeSchema, C, E, void>>;

  preview<E extends boolean = false>(
    groupId: string | number,
    linkUrl: string,
    imageUrl: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CondensedBadgeSchema, C, E, void>>;

  remove<E extends boolean = false>(
    groupId: string | number,
    badgeId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    groupId: string | number,
    badgeId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupBadgeSchema, C, E, void>>;
}

export class GroupBadges<C extends boolean = false> extends ResourceBadges<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
