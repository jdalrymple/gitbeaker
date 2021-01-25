import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceBadges } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface GroupBadges<C extends boolean> extends ResourceBadges<C> {
  add(groupId: string | number, options?: BaseRequestOptions);

  all(groupId: string | number, options?: PaginatedRequestOptions);

  edit(groupId: string | number, badgeId: number, options?: BaseRequestOptions);

  preview(groupId: string | number, linkUrl: string, imageUrl: string, options?: Sudo);

  remove(groupId: string | number, badgeId: number, options?: Sudo);

  show(groupId: string | number, badgeId: number, options?: Sudo);
}

export class GroupBadges<C extends boolean> extends ResourceBadges<C> {
  constructor(options: BaseServiceOptions<C>) {
    super('groups', options);
  }
}
