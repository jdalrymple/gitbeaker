import { BaseServiceOptions } from '../infrastructure';
import { ResourceLabels } from '../templates';

export class GroupLabels extends ResourceLabels {
  constructor(options: BaseServiceOptions = {}) {
    super('groups', options);
  }
}
