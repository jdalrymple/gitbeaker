const BaseModel = require('../BaseModel');

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
    options.page = options.page || 1;
    options.per_page = options.per_page || 100;

    return this.get("groups", options);
  }

  show(groupId) {
    return this.get(`groups/${parseInt(groupId)}`);
  }

  listMembers(groupId) {
    return this.get(`groups/${parseInt(groupId)}/members`);
  }

  addMember(groupId, userId, accessLevel) {
    hasAccess.call(this);

    return this.post(`groups/${parseInt(groupId)}/members`, {
      user_id: userId,
      access_level: accessLevel
    });
  }

  editMember(groupId, userId, accessLevel) {
    hasAccess.call(this);
   
    return this.put(`groups/${parseInt(groupId)}/members/${parseInt(userId)}`, {
      access_level: accessLevel
    });
  }

  removeMember(groupId, userId) {
    return this.delete(`groups/${parseInt(groupId)}/members/${parseInt(userId)}`);
  }

  create(options = {}) {
    return this.post("groups", options);
  }

  listProjects(groupId) {    
    return this.get(`groups/${parseInt(groupId)}/projects`);
  }

  addProject(groupId, projectId) {
    return this.post(`groups/${parseInt(groupId)}/projects/${parseInt(projectId)}`);
  }

  deleteGroup(groupId) {
    return this.delete(`groups/${parseInt(groupId)}`);
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
