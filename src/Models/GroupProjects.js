const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class GroupProjects extends BaseModel {
  all(groupId, options = {}) {
    const gId = Utils.parse(groupId);

    return this.get(`groups/${gId}/projects`, options);
  }

  add(groupId, projectId) {
    const [gId, pId] = [groupId, projectId].map(Utils.parse);

    return this.post(`groups/${gId}/projects/${pId}`);
  }
}

module.exports = GroupProjects;
