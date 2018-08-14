import { ResourceMembers } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceMembers)
class GroupMembers extends ResourceMembers {
  constructor(options) {
    super('groups', options);
  }
}

export default GroupMembers;
