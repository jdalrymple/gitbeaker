import { ResourceBadges } from '../templates';
import {
  BaseRequestOptions,
  BaseServiceOptions,
  PaginatedRequestOptions,
  Sudo,
} from '../infrastructure';

export interface GroupBadges extends ResourceBadges {
  add(groupId: string | number, options?: BaseRequestOptions);

  all(groupId: string | number, options?: PaginatedRequestOptions);

  edit(groupId: string | number, badgeId: number, options?: BaseRequestOptions);

  preview(groupId: string | number, linkUrl: string, imageUrl: string, options?: Sudo);

  remove(groupId: string | number, badgeId: number, options?: Sudo);

  show(groupId: string | number, badgeId: number, options?: Sudo);
}

export class GroupBadges extends ResourceBadges {
  constructor(options: BaseServiceOptions = {}) {
    super('groups', options);
  }
}
