import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceAccessRequests, AccessRequestSchema, AccessLevel } from '../templates';
import { Sudo } from '../infrastructure';

export interface GroupAccessRequests extends ResourceAccessRequests {
  all(projectId: string | number): Promise<AccessRequestSchema[]>;

  request(projectId: string | number): Promise<AccessRequestSchema>;

  approve(
    projectId: string | number,
    userId: number,
    options?: { accessLevel?: AccessLevel } & Sudo,
  ): Promise<AccessRequestSchema>;

  deny(projectId: string | number, userId: number): Promise<void>;
}

export class ProjectAccessRequests extends ResourceAccessRequests {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
