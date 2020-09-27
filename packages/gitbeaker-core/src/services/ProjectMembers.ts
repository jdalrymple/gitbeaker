import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceMembers } from '../templates';

export class ProjectMembers extends ResourceMembers {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', options);
  }
}
