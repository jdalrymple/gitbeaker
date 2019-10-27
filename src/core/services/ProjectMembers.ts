import { ResourceMembers } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class ProjectMembers extends ResourceMembers {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', options);
  }
}
