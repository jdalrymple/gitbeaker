import { ResourceCustomAttributes } from '../templates';
import { BaseServiceOptions } from '@src/types';

class GroupCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupCustomAttributes;
