import { ResourceVariables } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

class GroupVariables extends ResourceVariables {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupVariables;
