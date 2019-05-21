import { ResourceCustomAttributes } from '../templates';

class UserCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseServiceOptions) {
    super('users', options);
  }
}

export default UserCustomAttributes;
