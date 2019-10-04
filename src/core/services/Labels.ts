import { BaseServiceOptions } from '../infrastructure';
import { ResourceLabels } from '../templates';

class Labels extends ResourceLabels {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default Labels;
