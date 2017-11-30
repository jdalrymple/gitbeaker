const BaseModel = require('./BaseModel');
const ResourceMilestoneIssues = require('./GroupMilestoneIssues');
const ResourceMilestoneMergeRequests = require('./GroupMilestoneMergeRequests');

const Utils = require('../Utils');

class ResourceMilestones extends BaseModel {
  constructor(resourceType, ...args) {
    super(...args);

    this.resourceType = resourceType;
    this.issues = new ResourceMilestoneIssues(resourceType, ...args);
    this.mergeRequests = new ResourceMilestoneMergeRequests(resourceType, ...args);
  }

  all(resourceId, options = {}) {
    const rId = Utils.parse(resourceId);

    return this.get(`${this.resourceType}/${rId}/milestones`, options);
  }

  create(resourceId, title, options) {
    const rId = Utils.parse(resourceId);

    return this.post(`${this.resourceType}/${rId}/milestones`, options);
  }

  edit(resourceId, milestoneId, options) {
    const [rId, mId] = [resourceId, milestoneId].map(Utils.parse);

    return this.put(`${this.resourceType}/${rId}/milestones/${mId}`, options);
  }

  show(resourceId, milestoneId) {
    const [rId, mId] = [resourceId, milestoneId].map(Utils.parse);

    return this.get(`${this.resourceType}/${rId}/milestones/${mId}`);
  }
}

module.exports = ResourceMilestones;
