import { ResourceVariables } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceVariables)
class GroupVariables extends ResourceVariables {
  constructor(options) {
    super('groups', null, options);
  }
}

export default GroupVariables;
