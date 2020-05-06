import { ResourceDeployTokens } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class ProjectDeployTokens extends ResourceDeployTokens {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', options);
  }
}
