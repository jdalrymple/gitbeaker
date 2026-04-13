import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { IssueSchema } from '../resources/Issues';
import type { MergeRequestSchema } from '../resources/MergeRequests';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

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

export interface BurndownChartEventSchema extends Record<string, unknown> {
  created_at: string;
  weight: number;
  action: string;
}

export interface AllMilestonesOptions {
  iids?: number[];
  state?: string;
  title?: string;
  search?: string;
  includeParentMilestones?: boolean;
  updatedBefore?: string;
  updatedAfter?: string;
}

export class ResourceMilestones<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: AllMilestonesOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<MilestoneSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<MilestoneSchema[]>()(this, endpoint`${resourceId}/milestones`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams & PaginationRequestSearchParams<P>,
    });
  }

  allAssignedIssues<E extends boolean = false>(
    resourceId: string | number,
    milestoneId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<IssueSchema[]>()(
      this,
      endpoint`${resourceId}/milestones/${milestoneId}/issues`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  allAssignedMergeRequests<E extends boolean = false>(
    resourceId: string | number,
    milestoneId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      endpoint`${resourceId}/milestones/${milestoneId}/merge_requests`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  allBurndownChartEvents<E extends boolean = false>(
    resourceId: string | number,
    milestoneId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BurndownChartEventSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<BurndownChartEventSchema[]>()(
      this,
      endpoint`${resourceId}/milestones/${milestoneId}/burndown_events`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    title: string,
    options?: { description?: string; dueDate?: string; startDate?: string } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<MilestoneSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<MilestoneSchema>()(this, endpoint`${resourceId}/milestones`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        title,
      },
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
      stateEvent?: 'close' | 'activate';
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<MilestoneSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<MilestoneSchema>()(
      this,
      endpoint`${resourceId}/milestones/${milestoneId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    milestoneId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`${resourceId}/milestones/${milestoneId}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    milestoneId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MilestoneSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MilestoneSchema>()(
      this,
      endpoint`${resourceId}/milestones/${milestoneId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
