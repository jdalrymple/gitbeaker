import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import {
  ResourceAccessRequests,
  AccessRequestSchema,
  AccessLevel,
} from '../templates/ResourceAccessRequests';
import { Sudo, CamelizedRecord } from '../infrastructure';

export interface GroupAccessRequests<C extends boolean = false> extends ResourceAccessRequests<C> {
  all(projectId: string | number): Promise<CamelizedRecord<C, AccessRequestSchema>[]>;

  request(projectId: string | number): Promise<CamelizedRecord<C, AccessRequestSchema>>;

  approve(
    projectId: string | number,
    userId: number,
    options?: { accessLevel?: AccessLevel } & Sudo,
  ): Promise<CamelizedRecord<C, AccessRequestSchema>>;

  deny(projectId: string | number, userId: number): Promise<void>;
}

export class ProjectAccessRequests<C extends boolean = false> extends ResourceAccessRequests<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', options);
  }
}
