const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectTriggers extends BaseModel {
  add(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/triggers`, options);
  }

  all(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/triggers`);
  }

  edit(projectId, triggerId, options = {}) {
    const [pId, tId] = [projectId, triggerId].map(Utils.parse);

    return this.put(`projects/${pId}/triggers/${tId}`, options);
  }

  remove(projectId, triggerId) {
    const [pId, tId] = [projectId, triggerId].map(Utils.parse);

    return this.delete(`projects/${pId}/triggers/${tId}`);
  }

  show(projectId, triggerId) {
    const [pId, tId] = [projectId, triggerId].map(Utils.parse);

    return this.get(`projects/${pId}/triggers/${tId}`);
  }
}

module.exports = ProjectTriggers;
