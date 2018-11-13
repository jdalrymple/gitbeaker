import { ResourceBadges } from '../templates';
import { BaseServiceOptions } from '@src/types';

class GroupBadges extends ResourceBadges {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupBadges;
