import { ResourceMembers } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class GroupMembers extends ResourceMembers {
  constructor(options: BaseModelContructorOptions) {
    super('groups', options);
  }
}

export default GroupMembers;
