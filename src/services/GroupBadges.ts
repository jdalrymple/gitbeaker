import { ResourceBadges } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class GroupBadges extends ResourceBadges {
  constructor(options: BaseModelContructorOptions) {
    super('groups', options);
  }
}

export default GroupBadges;
