const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

function hasAccess() {
  let access_level;
  let hasAccess;

  for (let k in this.access_levels) {
    access_level = this.access_levels[k];
    if (accessLevel === access_level) {
      hasAccess = true;
    }
  }

  if (!hasAccess) throw `\`accessLevel\` must be one of ${JSON.stringify(this.access_levels)}`;
}

class Groups extends BaseModel {
  constructor(...args) {
    super(...args);

    this.access_levels = {
      GUEST: 10,
      REPORTER: 20,
      DEVELOPER: 30,
      MASTER: 40,
      OWNER: 50,
    };
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

    hasAccess.call(this);

    return this.post(`groups/${gId}/members`, {
      user_id: uId,
      access_level: accessLevel,
    });
  }

  editMember(groupId, userId, accessLevel) {
    const [gId, uId] = [groupId, userId].map(Utils.parse);

    hasAccess.call(this);

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
