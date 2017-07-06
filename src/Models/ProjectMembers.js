const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectMembers extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  list(projectId) {
    return this.get(`projects/${Utils.parse(projectId)}/members`);
  }

  show(projectId, userId) {
    return this.get(`projects/${Utils.parse(projectId)}/members/${parseInt(userId)}`);
  }

  add(projectId, userId, accessLevel = 30) {
    return this.post(`projects/${Utils.parse(projectId)}/members`, {
      user_id: parseInt(userId),
      access_level: parseInt(accessLevel)
    });
  }

  edit(projectId, userId, accessLevel = 30) {
    return this.put(`projects/${Utils.parse(projectId)}/members/${parseInt(userId)}`,{ 
      access_level: parseInt(accessLevel)
    });
  }

  remove(projectId, userId) {
    return this.delete(`projects/${Utils.parse(projectId)}/members/${parseInt(userId)}`);
  }
}

module.exports = ProjectMembers;
