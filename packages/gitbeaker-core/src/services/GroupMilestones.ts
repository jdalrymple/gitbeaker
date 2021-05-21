import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { MilestoneSchema, IssueSchema, MergeRequestSchema } from '../models';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';
import { ResourceMilestones } from '../templates';

export interface GroupMilestones<C extends boolean = false> extends ResourceMilestones<C> {
  all(
    groupId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, MilestoneSchema>[]>;

  create(
    groupId: string | number,
    title: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, MilestoneSchema>>;

  edit(
    groupId: string | number,
    milestoneId: number,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, MilestoneSchema>>;

  issues(
    groupId: string | number,
    milestoneId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, IssueSchema>[]>;

  mergeRequests(
    groupId: string | number,
    milestoneId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, MergeRequestSchema>[]>;

  show(
    groupId: string | number,
    milestoneId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, MilestoneSchema>>;
}

export class GroupMilestones<C extends boolean = false> extends ResourceMilestones<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
