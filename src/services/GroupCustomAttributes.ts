import { ResourceCustomAttributes } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class GroupCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseModelContructorOptions) {
    super('groups', options);
  }
}

export default GroupCustomAttributes;
