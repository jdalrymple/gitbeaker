import BaseModel from './BaseModel';
import { parse } from '../Utils';
import ResourceMilestoneIssues from './ResourceMilestoneIssues';
import ResourceMilestoneMergeRequests from './ResourceMilestoneMergeRequests';

class ResourceMilestones extends BaseModel {
  constructor(resourceType, ...args) {
    super(...args);

    this.resourceType = resourceType;
    this.issues = new ResourceMilestoneIssues(resourceType, ...args);
    this.mergeRequests = new ResourceMilestoneMergeRequests(resourceType, ...args);
  }

  all(resourceId, options = {}) {
    const rId = parse(resourceId);

    return this.get(`${this.resourceType}/${rId}/milestones`, options);
  }

  create(resourceId, title, options) {
    const rId = parse(resourceId);

    return this.post(`${this.resourceType}/${rId}/milestones`, options);
  }

  edit(resourceId, milestoneId, options) {
    const [rId, mId] = [resourceId, milestoneId].map(parse);

    return this.put(`${this.resourceType}/${rId}/milestones/${mId}`, options);
  }

  show(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(parse);

    return this.get(`${this.resourceType}/${rId}/milestones/${mId}`);
  }
}

export default ResourceMilestones;
