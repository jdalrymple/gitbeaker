import { ResourceVariables } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export { ResourceVariableSchema } from '../templates';

export class ProjectVariables extends ResourceVariables {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}
