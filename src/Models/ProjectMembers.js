const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectMembers extends BaseModel {
  all(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/members`);
  }

  add(projectId, userId, accessLevel = 30) {
    const [pId, uId] = [projectId, userId].map(Utils.parse);

    return this.post(`projects/${pId}/members`, {
      user_id: uId,
      access_level: parseInt(accessLevel, 10),
    });
  }

  edit(projectId, userId, accessLevel = 30) {
    const [pId, uId] = [projectId, userId].map(Utils.parse);

    return this.put(`projects/${pId}/members/${uId}`, {
      access_level: parseInt(accessLevel, 10),
    });
  }

  remove(projectId, userId) {
    const [pId, uId] = [projectId, userId].map(Utils.parse);

    return this.delete(`projects/${pId}/members/${uId}`);
  }

  show(projectId, userId) {
    const [pId, uId] = [projectId, userId].map(Utils.parse);

    return this.get(`projects/${pId}/members/${uId}`);
  }
}

module.exports = ProjectMembers;
