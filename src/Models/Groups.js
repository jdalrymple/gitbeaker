const BaseModel = require('./BaseModel');
const GroupProjects = require('./GroupProjects');
const ResourceAccessRequests = require('./ResourceAccessRequests');
const ResourceCustomAttributes = require('./ResourceCustomAttributes');
const ResourceMembers = require('./ResourceMembers');
const ResourceMilestones = require('./ResourceMilestones');

const Utils = require('../Utils');

class Groups extends BaseModel {
  constructor(...args) {
    super(...args);

    this.projects = new GroupProjects(...args);
    this.accessRequests = new ResourceAccessRequests('groups', ...args);
    this.customAttributes = new ResourceCustomAttributes('groups', ...args);
    this.members = new ResourceMembers('groups', ...args);
    this.milestones = new ResourceMilestones('groups', ...args);
  }

  all(options = {}) {
    return this.get('groups', options);
  }

  allSubgroups(groupId, options = {}) {
    const gId = Utils.parse(groupId);

    return this.get(`groups/${gId}/subgroups`, options);
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
