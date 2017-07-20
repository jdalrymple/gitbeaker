const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectMembers extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  list(projectId) {
    projectId = Utils.parse(projectId);

    return this.get(`projects/${projectId}/members`);
  }

  show(projectId, userId) {
    [projectId, userId] = Array.from(arguments).map(Utils.parse)

    return this.get(`projects/${projectId}/members/${userId}`);
  }

  add(projectId, userId, accessLevel = 30) {
    [projectId, userId] = [projectId, userId].map(Utils.parse)

    return this.post(`projects/${projectId}/members`, {
      user_id: userId,
      access_level: parseInt(accessLevel)
    });
  }

  edit(projectId, userId, accessLevel = 30) {
    [projectId, userId] = [projectId, userId].map(Utils.parse)

    return this.put(`projects/${projectId}/members/${userId}`, {
      access_level: parseInt(accessLevel)
    });
  }

  remove(projectId, userId) {
    [projectId, issueId] = Array.from(arguments).map(Utils.parse)

    return this.delete(`projects/${projectId}/members/${userId}`);
  }
}

module.exports = ProjectMembers;