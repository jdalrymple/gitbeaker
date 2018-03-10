import { ResourceCustomAttributes } from '../templates';

export class GroupCustomAttributes {
  constructor(options) {
    return new ResourceCustomAttributes('groups', options);
  }
}

export default GroupCustomAttributes;
