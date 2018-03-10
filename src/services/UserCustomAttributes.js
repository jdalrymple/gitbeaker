import { ResourceCustomAttributes } from '../templates';

export class UserCustomAttributes {
  constructor(options) {
    return new ResourceCustomAttributes('users', options);
  }
}

export default UserCustomAttributes;
