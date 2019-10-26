import { BaseServiceOptions } from '../infrastructure';
import { ResourceLabels } from '../templates';

export class Labels extends ResourceLabels {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}
