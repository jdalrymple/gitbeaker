import { ResourceBadges } from '../templates';
import { BaseServiceOptions } from '@typings';

class GroupBadges extends ResourceBadges {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupBadges;
