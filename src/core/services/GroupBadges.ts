import { ResourceBadges } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class GroupBadges extends ResourceBadges {
  constructor(options: BaseServiceOptions = {}) {
    super('groups', options);
  }
}
