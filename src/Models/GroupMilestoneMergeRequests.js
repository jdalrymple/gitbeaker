const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class GroupMilestoneMergeRequests extends BaseModel {
  all(groupId, milestoneId) {
    const [gId, mId] = [groupId, milestoneId].map(Utils.parse);

    return this.get(`groups/${gId}/milestones/${mId}/merge_requests`);
  }
}

module.exports = GroupMilestoneMergeRequests;
