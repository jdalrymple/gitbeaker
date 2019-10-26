import { ResourceMembers } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class GroupMembers extends ResourceMembers {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}
