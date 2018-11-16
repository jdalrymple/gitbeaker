import { ResourceVariables } from '../templates';
import { BaseServiceOptions } from '@typings';

class GroupVariables extends ResourceVariables {
  constructor(baseParams: BaseModelContructorOptions) {
    super('groups', baseParams);
  }
}

export default GroupVariables;
