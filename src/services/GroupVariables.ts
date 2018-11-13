import { ResourceVariables } from '../templates';
import { BaseServiceOptions } from '@src/types';

class GroupVariables extends ResourceVariables {
  constructor(baseParams: BaseModelContructorOptions) {
    super('groups', baseParams);
  }
}

export default GroupVariables;
