const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class GroupMilestoneIssues extends BaseModel {
  constructor(resourceType, ...args) {
    super(...args);

    this.resourceType = resourceType;
  }

  all(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(Utils.parse);

    return this.get(`${this.resourceType}/${rId}/milestones/${mId}/issues`);
  }
}

module.exports = GroupMilestoneIssues;
