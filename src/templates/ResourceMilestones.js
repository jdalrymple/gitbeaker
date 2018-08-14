import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { api } from '../cli/worker';

class ResourceMilestones extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.url = URLJoin(this.url, resourceType);
  }

  @api('<resourceId>', { options: true, method: 'GET' })
  all(resourceId, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.get(this, `${rId}/milestones`, options);
  }

  @api('<resourceId>', '<title>', { options: true, method: 'POST' })
  create(resourceId, title, options) {
    const rId = encodeURIComponent(resourceId);

    return RequestHelper.post(this, `${rId}/milestones`, { title, ...options });
  }

  @api('<resourceId>', '<milestoneId>', { options: true, method: 'PUT' })
  edit(resourceId, milestoneId, options) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/milestones/${mId}`, options);
  }

  @api('<resourceId>', '<milestoneId>', { method: 'GET' })
  issues(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/milestones/${mId}/issues`);
  }

  @api('<resourceId>', '<milestoneId>', { method: 'GET' })
  mergeRequests(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/milestones/${mId}/merge_requests`);
  }

  @api('<resourceId>', '<milestoneId>', { method: 'GET' })
  show(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/milestones/${mId}`);
  }
}

export default ResourceMilestones;
