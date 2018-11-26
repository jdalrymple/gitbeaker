import { ResourceVariables } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class GroupVariables extends ResourceVariables {
  constructor(baseParams: BaseModelContructorOptions) {
    super('groups', baseParams);
  }
}

export default GroupVariables;
