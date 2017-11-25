const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class Groups extends BaseModel {
  constructor(...args) {
    super(...args);

    this.access_levels = ACCESS_LEVELS;
    this.milestones = new GroupMilestones(...args);
    this.members = new GroupMembers(...args);
    this.projects = new GroupProjects(...args);
    this.accessLevels = new GroupAccessLevels(...args);
  }

  all(options = {}) {
    return this.get('groups', options);
  }

  show(groupId) {
    const gId = Utils.parse(groupId);

    return this.get(`groups/${gId}`);
  }

  listMembers(groupId) {
    const gId = Utils.parse(groupId);

    return this.get(`groups/${gId}/members`);
  }

  addMember(groupId, userId, accessLevel) {
    const [gId, uId] = [groupId, userId].map(Utils.parse);

    hasAccess(accessLevel);

    return this.post(`groups/${gId}/members`, {
      user_id: uId,
      access_level: accessLevel,
    });
  }

  editMember(groupId, userId, accessLevel) {
    const [gId, uId] = [groupId, userId].map(Utils.parse);

    hasAccess(accessLevel);

    return this.put(`groups/${gId}/members/${uId}`, {
      access_level: accessLevel,
    });
  }

  removeMember(groupId, userId) {
    const [gId, uId] = [groupId, userId].map(Utils.parse);

    return this.delete(`groups/${gId}/members/${uId}`);
  }

  create(options = {}) {
    return this.post('groups', options);
  }

  listProjects(groupId, options = {}) {
    const gId = Utils.parse(groupId);

    return this.get(`groups/${gId}/projects`, options);
  }

  addProject(groupId, projectId) {
    const [gId, pId] = [groupId, projectId].map(Utils.parse);

    return this.post(`groups/${gId}/projects/${pId}`);
  }

  deleteGroup(groupId) {
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
