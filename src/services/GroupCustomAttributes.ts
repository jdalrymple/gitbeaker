import { ResourceCustomAttributes } from '../templates';

class GroupCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupCustomAttributes;
