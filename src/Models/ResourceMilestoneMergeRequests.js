import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ResourceMilestoneMergeRequests extends BaseModel {
  constructor(resourceType, ...args) {
    super(...args);

    this.resourceType = resourceType;
  }

  all(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(parse);

    return this.get(`${this.resourceType}/${rId}/milestones/${mId}/merge_requests`);
  }
}

export default ResourceMilestoneMergeRequests;
