import { ResourceMembers } from '../templates';

class GroupMembers extends ResourceMembers {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupMembers;
