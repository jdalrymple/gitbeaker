import { ResourceCustomAttributes } from '../templates';
import { BaseServiceOptions } from '@src/types';

class UserCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseServiceOptions) {
    super('users', options);
  }
}

export default UserCustomAttributes;
