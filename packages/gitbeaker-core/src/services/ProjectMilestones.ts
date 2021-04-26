import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceMilestones, MilestoneSchema } from '../templates/ResourceMilestones';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';
import type { IssueSchema } from './Issues';
import type { MergeRequestSchema } from './MergeRequests';

export interface ProjectMilestones<C extends boolean = false> extends ResourceMilestones<C> {
  all(
    projectId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, MilestoneSchema>[]>;

  create(
    projectId: string | number,
    title: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, MilestoneSchema>>;

  edit(
    projectId: string | number,
    milestoneId: number,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, MilestoneSchema>>;

  issues(
    projectId: string | number,
    milestoneId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, IssueSchema>[]>;

  mergeRequests(
    projectId: string | number,
    milestoneId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, MergeRequestSchema>[]>;

  show(
    projectId: string | number,
    milestoneId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, MilestoneSchema>>;
}

export class ProjectMilestones<C extends boolean = false> extends ResourceMilestones<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', options);
  }
}
