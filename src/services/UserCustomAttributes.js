import { ResourceCustomAttributes } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceCustomAttributes)
class UserCustomAttributes extends ResourceCustomAttributes {
  constructor(options) {
    super('users', options);
  }
}

export default UserCustomAttributes;
