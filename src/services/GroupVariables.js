import { ResourceVariables } from '../templates';

class GroupVariables {
  constructor(options) {
    return new ResourceVariables('groups', options);
  }
}

export default GroupVariables;
