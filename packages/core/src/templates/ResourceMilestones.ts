import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import {
  RequestHelper,
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  endpoint,
} from '../infrastructure';
import { IssueSchema } from '../resources/Issues';
import { MergeRequestSchema } from '../resources/MergeRequests';

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
  web_url?: string;
}

export class ResourceMilestones<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all(resourceId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<MilestoneSchema[]>()(
      this,
      endpoint`${resourceId}/milestones`,
      options,
    );
  }

  create(resourceId: string | number, title: string, options?: BaseRequestOptions) {
    return RequestHelper.post<MilestoneSchema>()(this, endpoint`${resourceId}/milestones`, {
      title,
      ...options,
    });
  }

  edit(resourceId: string | number, milestoneId: number, options?: BaseRequestOptions) {
    return RequestHelper.put<MilestoneSchema>()(
      this,
      endpoint`${resourceId}/milestones/${milestoneId}`,
      options,
    );
  }

  issues(resourceId: string | number, milestoneId: number, options?: Sudo) {
    return RequestHelper.get<IssueSchema[]>()(
      this,
      endpoint`${resourceId}/milestones/${milestoneId}/issues`,
      options,
    );
  }

  mergeRequests(resourceId: string | number, milestoneId: number, options?: Sudo) {
    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      endpoint`${resourceId}/milestones/${milestoneId}/merge_requests`,
      options,
    );
  }

  show(resourceId: string | number, milestoneId: number, options?: Sudo) {
    return RequestHelper.get<MilestoneSchema>()(
      this,
      endpoint`${resourceId}/milestones/${milestoneId}`,
      options,
    );
  }
}
