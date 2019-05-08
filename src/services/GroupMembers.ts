import { ResourceMembers } from '../templates';
import { BaseServiceOptions } from '../../types/types';

class GroupMembers extends ResourceMembers {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupMembers;
