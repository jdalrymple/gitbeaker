const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class GroupMilestones extends BaseModel {
  constructor(..args){
    this.issues = new GroupMilestoneIssues(..args);
    this.mergeRequests = new GroupMilestoneMergeRequests(..args);
  }

  all(groupId, options = {}) {
    const pId = Utils.parse(groupId);

    return this.get(`groups/${pId}/milestones`, options);
  }

  show(groupId, milestoneId) {
    const [pId, mId] = [groupId, milestoneId].map(Utils.parse);

    return this.get(`groups/${pId}/milestones/${mId}`);
  }

  create(groupId, title, { description, due_date, start_date }) {
    const pId = Utils.parse(groupId);

    return this.post(`groups/${pId}/milestones`, {
      title,
      description,
      due_date,
      start_date,
    });
  }

  update(groupId, milestoneId, { title, description, due_date, start_date, state_event }) {
    const [pId, mId] = [projectId, milestoneId].map(Utils.parse);

    return this.put(`groups/${pId}/milestones/${mId}`, {
      title,
      description,
      due_date,
      start_date,
      state_event,
    });
  }
}

module.exports = GroupMilestones;
