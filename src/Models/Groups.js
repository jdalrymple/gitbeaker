const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

const ACCESS_LEVELS = {
  GUEST: 10,
  REPORTER: 20,
  DEVELOPER: 30,
  MASTER: 40,
  OWNER: 50,
};

function hasAccess(accessLevel) {
  let valid = false;

  Object.values(ACCESS_LEVELS).forEach((level) => {
    if (accessLevel === level) {
      valid = true;
    }
  });

  if (!valid) throw new Error(`\`accessLevel\` must be one of ${JSON.stringify(ACCESS_LEVELS)}`);
}

class Groups extends BaseModel {
  constructor(...args) {
    super(...args);

    this.access_levels = ACCESS_LEVELS;
  }

  all(options = {}) {
    Utils.defaultPaging(options);

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

  listProjects(groupId) {
    const gId = Utils.parse(groupId);

    return this.get(`groups/${gId}/projects`);
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
