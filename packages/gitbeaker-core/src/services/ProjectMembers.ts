import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceMembers } from '../templates';

export class ProjectMembers<C extends boolean = false> extends ResourceMembers() {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', options);
  }
}
