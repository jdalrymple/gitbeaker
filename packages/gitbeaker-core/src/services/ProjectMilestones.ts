import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceMilestones } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo } from '../infrastructure';

export interface ProjectMilestones extends ResourceMilestones {
  all(projectId: string | number, options?: PaginatedRequestOptions);

  create(projectId: string | number, title: string, options?: BaseRequestOptions);

  edit(projectId: string | number, milestoneId: number, options?: BaseRequestOptions);

  issues(projectId: string | number, milestoneId: number, options?: Sudo);

  mergeRequests(projectId: string | number, milestoneId: number, options?: Sudo);

  show(projectId: string | number, milestoneId: number, options?: Sudo);
}

export class ProjectMilestones extends ResourceMilestones {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', options);
  }
}
