import { ResourceCustomAttributes } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceCustomAttributes)
class GroupCustomAttributes extends ResourceCustomAttributes {
  constructor(options) {
    super('groups', options);
  }
}

export default GroupCustomAttributes;
