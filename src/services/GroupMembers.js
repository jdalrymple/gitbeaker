import { ResourceMembers } from '../templates';

class GroupMembers {
  constructor(options) {
    return new ResourceMembers('groups', options);
  }
}

export default GroupMembers;
