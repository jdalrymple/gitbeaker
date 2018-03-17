import { ResourceMembers } from '../templates';

class GroupMembers extends ResourceMembers {
  constructor(options) {
    super('groups', options);
  }
}

export default GroupMembers;
