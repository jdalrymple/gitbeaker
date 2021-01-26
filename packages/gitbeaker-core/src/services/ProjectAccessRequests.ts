import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceAccessRequests } from '../templates';

export class ProjectAccessRequests<C extends boolean = false> extends ResourceAccessRequests<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', options);
  }
}
