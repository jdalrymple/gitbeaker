const BaseModel = require('./BaseModel');
const GroupMilestones = require('./GroupMilestones');
const GroupMembers = require('./GroupMembers');
const GroupProjects = require('./GroupProjects');
const GroupAccessRequests = require('./GroupAccessRequests');
const Utils = require('../Utils');

class Groups extends BaseModel {
  constructor(...args) {
    super(...args);

    this.milestones = new GroupMilestones(...args);
    this.members = new GroupMembers(...args);
    this.projects = new GroupProjects(...args);
    this.accessRequests = new GroupAccessRequests(...args);
  }

  all(options = {}) {
    return this.get('groups', options);
  }

  show(groupId) {
    const gId = Utils.parse(groupId);

    return this.get(`groups/${gId}`);
  }

  create(options = {}) {
    return this.post('groups', options);
  }

  remove(groupId) {
    const gId = Utils.parse(groupId);

    return this.delete(`groups/${gId}`);
  }

  search(nameOrPath) {
    return this.get('groups', {
      search: nameOrPath,
    });
  }
}

module.exports = Groups;
