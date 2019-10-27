import { ResourceBadges } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class ProjectBadges extends ResourceBadges {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', options);
  }
}
