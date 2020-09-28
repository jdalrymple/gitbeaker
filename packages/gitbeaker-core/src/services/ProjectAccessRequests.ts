import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceAccessRequests } from '../templates';

export class ProjectAccessRequests extends ResourceAccessRequests {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', options);
  }
}
