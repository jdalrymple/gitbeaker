import { ResourceVariables } from '../templates';
import { BaseServiceOptions } from '../../types/types';

class GroupVariables extends ResourceVariables {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupVariables;
