const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class GroupMilestoneIssues extends BaseModel {
  all(grougId, milestoneId) {
    const [gId, mId] = [groupId, milestoneId].map(Utils.parse);

    return this.get(`groups/${gId}/milestones/${mId}/issues`);
  }
}

module.exports = GroupMilestoneIssues;
