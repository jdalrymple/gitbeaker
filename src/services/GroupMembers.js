import { ResourceMembers } from '../templates';

export class GroupMembers {
  constructor(options) {
    return new ResourceMembers('groups', options);
  }
}

export default GroupMembers;
