const BaseModel = require('../BaseModel');
const Utils = require('utils');

class Groups extends BaseModel {
  constructor(...args){
    super(...args);
    this.access_levels = {
      GUEST:      10,
      REPORTER:   20,
      DEVELOPER:  30,
      MASTER:     40,
      OWNER:      50
    }
  }

  all(options = {}) {
    Utils.defaultPaging(options);

    return this.get("groups", options);
  }

  show(groupId) {
    groupId = Utils.parse(groupId);

    return this.get(`groups/${groupId}`);
  }

  listMembers(groupId) {
    groupId = Utils.parse(groupId);

    return this.get(`groups/${groupId}/members`);
  }

  addMember(groupId, userId, accessLevel) {
    hasAccess.call(this);

    [groupId,userId] = [groupId,userId].map(Utils.parse);

    return this.post(`groups/${groupId}/members`, {
      user_id: userId,
      access_level: accessLevel
    });
  }

  editMember(groupId, userId, accessLevel) {
    hasAccess.call(this);
   
    [groupId,userId] = [groupId,userId].map(Utils.parse);

    return this.put(`groups/${groupId}/members/${userId}`, {
      access_level: accessLevel
    });
  }

  removeMember(groupId, userId) {
    [groupId,userId] = Array.from(arguments).map(Utils.parse);

    return this.delete(`groups/${groupId}/members/${userId}`);
  }

  create(options = {}) {
    return this.post("groups", options);
  }

  listProjects(groupId) {    
    groupId = Utils.parse(groupId);

    return this.get(`groups/${groupId}/projects`);
  }

  addProject(groupId, projectId) {
   [groupId,projectId] = Array.from(arguments).map(Utils.parse);

    return this.post(`groups/${groupId}/projects/${projectId}`);
  }

  deleteGroup(groupId) {
    groupId = Utils.parse(groupId);

    return this.delete(`groups/${groupId}`);
  }

  search(nameOrPath) {
    return this.get("groups", options, {
      search: nameOrPath
    });
  }
}

function hasAccess(){
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

module.exports = Groups;
