import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import {
  RequestHelper,
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
} from '../infrastructure';

export class ResourceMilestones<C extends boolean = false> extends BaseService<C> {
  constructor(resourceType: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all(resourceId: string | number, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get()(this, `${rId}/milestones`, options);
  }

  create(resourceId: string | number, title: string, options?: BaseRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post()(this, `${rId}/milestones`, { title, ...options });
  }

  edit(resourceId: string | number, milestoneId: number, options?: BaseRequestOptions) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.put()(this, `${rId}/milestones/${mId}`, options);
  }

  issues(resourceId: string | number, milestoneId: number, options?: Sudo) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get()(this, `${rId}/milestones/${mId}/issues`, options);
  }

  mergeRequests(resourceId: string | number, milestoneId: number, options?: Sudo) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get()(this, `${rId}/milestones/${mId}/merge_requests`, options);
  }

  show(resourceId: string | number, milestoneId: number, options?: Sudo) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get()(this, `${rId}/milestones/${mId}`, options);
  }
}
