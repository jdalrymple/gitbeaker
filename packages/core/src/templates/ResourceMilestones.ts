import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { IssueSchema } from '../resources/Issues';
import type { MergeRequestSchema } from '../resources/MergeRequests';

export interface MilestoneSchema extends Record<string, unknown> {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  due_date?: string;
  start_date: string;
  state: string;
  updated_at: string;
  created_at: string;
  expired: boolean;
  web_url: string;
}

export class ResourceMilestones<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<MilestoneSchema[], C, E, P>> {
    return RequestHelper.get<MilestoneSchema[]>()(
      this,
      endpoint`${resourceId}/milestones`,
      options,
    );
  }

  allAssignedIssues<E extends boolean = false>(
    resourceId: string | number,
    milestoneId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IssueSchema[], C, E, void>> {
    return RequestHelper.get<IssueSchema[]>()(
      this,
      endpoint`${resourceId}/milestones/${milestoneId}/issues`,
      options,
    );
  }

  allAssignedMergeRequests<E extends boolean = false>(
    resourceId: string | number,
    milestoneId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, void>> {
    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      endpoint`${resourceId}/milestones/${milestoneId}/merge_requests`,
      options,
    );
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    title: string,
    options?: { description?: string; dueDate?: string; startDate?: string } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MilestoneSchema, C, E, void>> {
    return RequestHelper.post<MilestoneSchema>()(this, endpoint`${resourceId}/milestones`, {
      title,
      ...options,
    });
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    milestoneId: number,
    options?: {
      title?: string;
      description?: string;
      dueDate?: string;
      startDate?: string;
      startEvent?: 'close' | 'activate';
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MilestoneSchema, C, E, void>> {
    return RequestHelper.put<MilestoneSchema>()(
      this,
      endpoint`${resourceId}/milestones/${milestoneId}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    milestoneId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`${resourceId}/milestones/${milestoneId}`, options);
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    milestoneId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MilestoneSchema, C, E, void>> {
    return RequestHelper.get<MilestoneSchema>()(
      this,
      endpoint`${resourceId}/milestones/${milestoneId}`,
      options,
    );
  }

  showBurndownChartEvents<E extends boolean = false>(
    resourceId: string | number,
    milestoneId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.get<void>()(
      this,
      endpoint`${resourceId}/milestones/${milestoneId}/burndown_events`,
      options,
    );
  }
}
