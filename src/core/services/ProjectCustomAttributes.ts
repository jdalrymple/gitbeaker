import { ResourceCustomAttributes } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class ProjectCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', options);
  }
}
