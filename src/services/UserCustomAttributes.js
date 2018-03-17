import { ResourceCustomAttributes } from '../templates';

class UserCustomAttributes {
  constructor(options) {
    return new ResourceCustomAttributes('users', options);
  }
}

export default UserCustomAttributes;
