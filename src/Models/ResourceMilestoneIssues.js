import BaseModel from './BaseModel';
import { parse } from '../Utils';

class GroupMilestoneIssues extends BaseModel {
  constructor(resourceType, ...args) {
    super(...args);

    this.resourceType = resourceType;
  }

  all(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(parse);

    return this.get(`${this.resourceType}/${rId}/milestones/${mId}/issues`);
  }
}

export default GroupMilestoneIssues;
