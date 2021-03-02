import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceMilestones } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo } from '../infrastructure';

export interface GroupMilestones<C extends boolean = false> extends ResourceMilestones<C> {
  all(groupId: string | number, options?: PaginatedRequestOptions<'keyset' | 'offset'>);

  create(groupId: string | number, title: string, options?: BaseRequestOptions);

  edit(groupId: string | number, milestoneId: number, options?: BaseRequestOptions);

  issues(groupId: string | number, milestoneId: number, options?: Sudo);

  mergeRequests(groupId: string | number, milestoneId: number, options?: Sudo);

  show(groupId: string | number, milestoneId: number, options?: Sudo);
}

export class GroupMilestones<C extends boolean = false> extends ResourceMilestones<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('groups', options);
  }
}
