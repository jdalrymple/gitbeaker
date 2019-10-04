import { BaseServiceOptions } from '../infrastructure';
import { ResourceLabels } from '../templates';

class GroupLabels extends ResourceLabels {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupLabels;
