import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceMembers } from '../templates';

export class GroupMembers extends ResourceMembers {
  constructor(options: BaseServiceOptions = {}) {
    super('groups', options);
  }
}
