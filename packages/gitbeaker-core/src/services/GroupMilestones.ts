import { ResourceMilestones } from '../templates';
import {
  BaseServiceOptions,
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
} from '../infrastructure';

export interface GroupMilestones extends ResourceMilestones {
  all(groupId: string | number, options?: PaginatedRequestOptions);

  create(groupId: string | number, title: string, options?: BaseRequestOptions);

  edit(groupId: string | number, milestoneId: number, options?: BaseRequestOptions);

  issues(groupId: string | number, milestoneId: number, options?: Sudo);

  mergeRequests(groupId: string | number, milestoneId: number, options?: Sudo);

  show(groupId: string | number, milestoneId: number, options?: Sudo);
}

export class GroupMilestones extends ResourceMilestones {
  constructor(options: BaseServiceOptions = {}) {
    super('groups', options);
  }
}
