import { ResourceCustomAttributes } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class UserCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseModelContructorOptions) {
    super('users', options);
  }
}

export default UserCustomAttributes;
