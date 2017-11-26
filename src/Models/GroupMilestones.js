const BaseModel = require('./BaseModel');
const GroupMilestoneIssues = require('./GroupMilestoneIssues');
const GroupMilestoneMergeRequests = require('./GroupMilestoneMergeRequests');

const Utils = require('../Utils');

class GroupMilestones extends BaseModel {
  constructor(...args) {
    super(...args);

    this.issues = new GroupMilestoneIssues(...args);
    this.mergeRequests = new GroupMilestoneMergeRequests(...args);
  }

  all(groupId, options = {}) {
    const gId = Utils.parse(groupId);

    return this.get(`groups/${gId}/milestones`, options);
  }

  show(groupId, milestoneId) {
    const [gId, mId] = [groupId, milestoneId].map(Utils.parse);

    return this.get(`groups/${gId}/milestones/${mId}`);
  }

  create(groupId, title, options) {
    const gId = Utils.parse(groupId);

    return this.post(`groups/${gId}/milestones`, options);
  }

  update(groupId, milestoneId, options) {
    const [gId, mId] = [groupId, milestoneId].map(Utils.parse);

    return this.put(`groups/${gId}/milestones/${mId}`, options);
  }
}

module.exports = GroupMilestones;
