import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceBadges, BadgeSchema } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface GroupBadgeSchema extends BadgeSchema {
  kind: 'group';
}

export interface GroupBadges extends ResourceBadges {
  add(groupId: string | number, options?: BaseRequestOptions): Promise<GroupBadgeSchema>;

  all(groupId: string | number, options?: PaginatedRequestOptions): Promise<GroupBadgeSchema[]>;

  edit(
    groupId: string | number,
    badgeId: number,
    options?: BaseRequestOptions,
  ): Promise<GroupBadgeSchema>;

  preview(
    groupId: string | number,
    linkUrl: string,
    imageUrl: string,
    options?: Sudo,
  ): Promise<Omit<GroupBadgeSchema, 'id' | 'name' | 'kind'>>;

  remove(groupId: string | number, badgeId: number, options?: Sudo): Promise<void>;

  show(groupId: string | number, badgeId: number, options?: Sudo): Promise<GroupBadgeSchema>;
}

export class GroupBadges extends ResourceBadges {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
