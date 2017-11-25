const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class GroupMilestoneMergeRequests extends BaseModel {
  all(grougId, milestoneId) {
    const [gId, mId] = [groupId, milestoneId].map(Utils.parse);

    return this.get(`groups/${pId}/milestones/${mId}/merge_requests`);
  }
}

module.exports = GroupMilestoneIssues;
