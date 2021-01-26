import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceMembers } from '../templates';

export class GroupMembers<C extends boolean = false> extends ResourceMembers<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('groups', options);
  }
}
