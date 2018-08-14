import { ResourceBadges } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceBadges)
class GroupBadges extends ResourceBadges {
  constructor(options) {
    super('groups', options);
  }
}

export default GroupBadges;
