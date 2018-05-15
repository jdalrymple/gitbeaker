import { ResourceCustomAttributes } from '../templates';

class UserCustomAttributes extends ResourceCustomAttributes {
  constructor(options) {
    super('users', options);
  }
}

export default UserCustomAttributes;
