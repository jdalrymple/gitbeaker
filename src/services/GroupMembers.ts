import { ResourceMembers } from '../templates';
import { BaseServiceOptions } from '@typings';

class GroupMembers extends ResourceMembers {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupMembers;
