import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { BadgeSchema } from '../models';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';
import { ResourceBadges } from '../templates';

export interface GroupBadgeSchema extends BadgeSchema {
  kind: 'group';
}

export interface GroupBadges<C extends boolean = false> extends ResourceBadges<C> {
  add(
    groupId: string | number,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, GroupBadgeSchema>>;

  all(
    groupId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, GroupBadgeSchema>[]>;

  edit(
    groupId: string | number,
    badgeId: number,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, GroupBadgeSchema>>;

  preview(
    groupId: string | number,
    linkUrl: string,
    imageUrl: string,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, Omit<GroupBadgeSchema, 'id' | 'name' | 'kind'>>>;

  remove(groupId: string | number, badgeId: number, options?: Sudo): Promise<void>;

  show(
    groupId: string | number,
    badgeId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, GroupBadgeSchema>>;
}

export class GroupBadges<C extends boolean = false> extends ResourceBadges<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
