import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceMilestones, MilestoneSchema } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo } from '../infrastructure';
import { IssueSchema } from './Issues';
import { MergeRequestSchema } from './MergeRequests';

export interface GroupMilestones extends ResourceMilestones {
  all(groupId: string | number, options?: PaginatedRequestOptions): Promise<MilestoneSchema[]>;

  create(
    groupId: string | number,
    title: string,
    options?: BaseRequestOptions,
  ): Promise<MilestoneSchema>;

  edit(
    groupId: string | number,
    milestoneId: number,
    options?: BaseRequestOptions,
  ): Promise<MilestoneSchema>;

  issues(groupId: string | number, milestoneId: number, options?: Sudo): Promise<IssueSchema[]>;

  mergeRequests(
    groupId: string | number,
    milestoneId: number,
    options?: Sudo,
  ): Promise<MergeRequestSchema[]>;

  show(groupId: string | number, milestoneId: number, options?: Sudo): Promise<MilestoneSchema>;
}

export class GroupMilestones extends ResourceMilestones {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
