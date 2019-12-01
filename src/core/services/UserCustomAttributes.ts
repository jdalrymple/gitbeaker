import { ResourceCustomAttributes } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class UserCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseServiceOptions) {
    super('users', options);
  }
}
