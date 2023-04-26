import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceMilestones } from '../templates';
import type {
  AllMilestonesOptions,
  BurndownChartEventSchema,
  MilestoneSchema,
} from '../templates/ResourceMilestones';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { IssueSchema } from './Issues';
import type { MergeRequestSchema } from './MergeRequests';

export interface ProjectMilestones<C extends boolean = false> extends ResourceMilestones<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: AllMilestonesOptions & PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MilestoneSchema[], C, E, P>>;

  allAssignedIssues<E extends boolean = false>(
    projectId: string | number,
    milestoneId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueSchema[], C, E, void>>;

  allAssignedMergeRequests<E extends boolean = false>(
    projectId: string | number,
    milestoneId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, void>>;

  allBurndownChartEvents<E extends boolean = false>(
    projectId: string | number,
    milestoneId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<BurndownChartEventSchema[], C, E, void>>;

  create<E extends boolean = false>(
    projectId: string | number,
    title: string,
    options?: { description?: string; dueDate?: string; startDate?: string } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MilestoneSchema, C, E, void>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    milestoneId: number,
    options?: {
      title?: string;
      description?: string;
      dueDate?: string;
      startDate?: string;
      startEvent?: 'close' | 'activate';
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MilestoneSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    milestoneId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    milestoneId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MilestoneSchema, C, E, void>>;
}

export class ProjectMilestones<C extends boolean = false> extends ResourceMilestones<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }

  promote<E extends boolean = false>(
    projectId: string | number,
    milestoneId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(
      this,
      endpoint`${projectId}/milestones/${milestoneId}/promote`,
      options,
    );
  }
}
