import { ResourceVariables } from '../templates';
import { BaseServiceOptions } from '@src/types';

class GroupVariables extends ResourceVariables {
  constructor(options: BaseServiceOptions) {
    super('groups', null, options);
  }
}

export default GroupVariables;
