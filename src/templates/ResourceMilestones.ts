import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';
import { RequestOptions } from '../infrastructure/RequestHelper';

export type MilestoneId = string;
class ResourceMilestones extends BaseService {
  constructor(resourceType: string, baseParams: BaseModelContructorOptions) {
    super(baseParams);

    this.url = URLJoin(this.url, resourceType);
  }

  all(resourceId: ResourceId, options: RequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/milestones`, options);
  }

  create(resourceId: ResourceId, title: string, options: RequestOptions) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/milestones`, { title, ...options });
  }

  edit(resourceId: ResourceId, milestoneId: MilestoneId, options: RequestOptions) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/milestones/${mId}`, options);
  }

  issues(resourceId: ResourceId, milestoneId: MilestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/milestones/${mId}/issues`);
  }

  mergeRequests(resourceId: ResourceId, milestoneId: MilestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/milestones/${mId}/merge_requests`);
  }

  show(resourceId: ResourceId, milestoneId: MilestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/milestones/${mId}`);
  }
}

export default ResourceMilestones;
