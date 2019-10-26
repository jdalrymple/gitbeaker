import { ResourceVariables } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class GroupVariables extends ResourceVariables {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}
