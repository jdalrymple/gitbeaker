import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import {
  RequestHelper,
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
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
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get<MilestoneSchema[]>()(this, `${rId}/milestones`, options);
  }

  create(resourceId: string | number, title: string, options?: BaseRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post<MilestoneSchema>()(this, `${rId}/milestones`, { title, ...options });
  }

  edit(resourceId: string | number, milestoneId: number, options?: BaseRequestOptions) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.put<MilestoneSchema>()(this, `${rId}/milestones/${mId}`, options);
  }

  issues(resourceId: string | number, milestoneId: number, options?: Sudo) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get<IssueSchema[]>()(this, `${rId}/milestones/${mId}/issues`, options);
  }

  mergeRequests(resourceId: string | number, milestoneId: number, options?: Sudo) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get<MergeRequestSchema[]>()(
      this,
      `${rId}/milestones/${mId}/merge_requests`,
      options,
    );
  }

  show(resourceId: string | number, milestoneId: number, options?: Sudo) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get<MilestoneSchema>()(this, `${rId}/milestones/${mId}`, options);
  }
}
