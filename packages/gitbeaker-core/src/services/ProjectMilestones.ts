import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { IssueSchema } from './Issues';
import { MergeRequestSchema } from './MergeRequests';
import { ResourceMilestones, MilestoneSchema } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo } from '../infrastructure';

export interface ProjectMilestones extends ResourceMilestones {
  all(projectId: string | number, options?: PaginatedRequestOptions): Promise<MilestoneSchema[]>;

  create(
    projectId: string | number,
    title: string,
    options?: BaseRequestOptions,
  ): Promise<MilestoneSchema>;

  edit(
    projectId: string | number,
    milestoneId: number,
    options?: BaseRequestOptions,
  ): Promise<MilestoneSchema>;

  issues(projectId: string | number, milestoneId: number, options?: Sudo): Promise<IssueSchema[]>;

  mergeRequests(
    projectId: string | number,
    milestoneId: number,
    options?: Sudo,
  ): Promise<MergeRequestSchema[]>;

  show(projectId: string | number, milestoneId: number, options?: Sudo): Promise<MilestoneSchema>;
}

export class ProjectMilestones extends ResourceMilestones {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
