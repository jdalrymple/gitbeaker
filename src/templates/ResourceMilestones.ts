import { BaseService, RequestHelper } from '../infrastructure';

class ResourceMilestones extends BaseService {
  constructor(resourceType: string, options: BaseServiceOptions) {
    super({ url: resourceType, ...options });
  }

  all(resourceId: ResourceId, options?: PaginatedRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/milestones`, options);
  }

  create(resourceId: ResourceId, title: string, options?: BaseRequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/milestones`, { title, ...options });
  }

  edit(resourceId: ResourceId, milestoneId: MilestoneId, options?: BaseRequestOptions) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/milestones/${mId}`, options);
  }

  issues(resourceId: ResourceId, milestoneId: MilestoneId, options?: Sudo) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/milestones/${mId}/issues`, options);
  }

  mergeRequests(resourceId: ResourceId, milestoneId: MilestoneId, options?: Sudo) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/milestones/${mId}/merge_requests`, options);
  }

  show(resourceId: ResourceId, milestoneId: MilestoneId, options?: Sudo) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/milestones/${mId}`, options);
  }
}

export default ResourceMilestones;
