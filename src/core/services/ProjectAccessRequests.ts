import { ResourceAccessRequests } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class ProjectAccessRequests extends ResourceAccessRequests {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}
