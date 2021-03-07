import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceMilestones } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo } from '../infrastructure';

export interface ProjectMilestones<C extends boolean = false> extends ResourceMilestones<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions);

  create(projectId: string | number, title: string, options?: BaseRequestOptions);

  edit(projectId: string | number, milestoneId: number, options?: BaseRequestOptions);

  issues(projectId: string | number, milestoneId: number, options?: Sudo);

  mergeRequests(projectId: string | number, milestoneId: number, options?: Sudo);

  show(projectId: string | number, milestoneId: number, options?: Sudo);
}

export class ProjectMilestones<C extends boolean = false> extends ResourceMilestones<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', options);
  }
}
