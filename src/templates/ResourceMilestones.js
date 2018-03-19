import { BaseService, RequestHelper } from '../infrastructure';

class ResourceMilestones extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.resourceType = resourceType;
  }

  all(resourceId, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${this.resourceType}/${rId}/milestones`, options);
  }

  create(resourceId, title, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${this.resourceType}/${rId}/milestones`, options);
  }

  edit(resourceId, milestoneId, options) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.put(this, `${this.resourceType}/${rId}/milestones/${mId}`, options);
  }

  issues(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get(this, `${this.resourceType}/${rId}/milestones/${mId}/issues`);
  }

  mergeRequests(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get(this, `${this.resourceType}/${rId}/milestones/${mId}/merge_requests`);
  }

  show(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get(this, `${this.resourceType}/${rId}/milestones/${mId}`);
  }
}

export default ResourceMilestones;
