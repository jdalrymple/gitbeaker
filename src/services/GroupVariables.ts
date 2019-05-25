import { ResourceVariables } from '../templates';

class GroupVariables extends ResourceVariables {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupVariables;
