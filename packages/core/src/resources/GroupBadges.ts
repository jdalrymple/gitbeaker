import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceBadges } from '../templates';
import type { BadgeSchema } from '../templates/types';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface GroupBadgeSchema extends BadgeSchema {
  kind: 'group';
}

export type GroupBadgePreviewSchema = Omit<GroupBadgeSchema, 'id' | 'name' | 'kind'>;

export interface GroupBadges<C extends boolean = false> extends ResourceBadges<C> {
  add<E extends boolean = false>(
    groupId: string | number,
    linkUrl: string,
    imageUrl: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<GroupBadgeSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<GroupBadgeSchema[], C, E, P>>;

  edit<E extends boolean = false>(
    groupId: string | number,
    badgeId: number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<GroupBadgeSchema, C, E, void>>;

  preview<E extends boolean = false>(
    groupId: string | number,
    linkUrl: string,
    imageUrl: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupBadgePreviewSchema, C, E, void>>;

  remove<E extends boolean = false>(
    groupId: string | number,
    badgeId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    groupId: string | number,
    badgeId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupBadgeSchema, C, E, void>>;
}

export class GroupBadges<C extends boolean = false> extends ResourceBadges<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
