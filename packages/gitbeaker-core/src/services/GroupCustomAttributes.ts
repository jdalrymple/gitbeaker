import { ResourceCustomAttributes } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class GroupCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseServiceOptions = {}) {
    super('groups', options);
  }
}
