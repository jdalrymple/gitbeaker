import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class ResourceMilestones extends BaseService {
  constructor(resourceType, baseParams: BaseModelContructorOptions) {
    super(baseParams);

    this.url = URLJoin(this.url, resourceType);
  }

  all(resourceId, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/milestones`, options);
  }

  create(resourceId, title, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/milestones`, { title, ...options });
  }

  edit(resourceId, milestoneId, options) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/milestones/${mId}`, options);
  }

  issues(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/milestones/${mId}/issues`);
  }

  mergeRequests(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/milestones/${mId}/merge_requests`);
  }

  show(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/milestones/${mId}`);
  }
}

export default ResourceMilestones;
