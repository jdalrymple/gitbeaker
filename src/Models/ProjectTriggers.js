const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectTriggers extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  add(projectId, options = {}) {
    return this.post(`projects/${Utils.parse(projectId)}/triggers`, options);
  }

  edit(projectId, triggerId, options = {}) {
    return this.put(`projects/${Utils.parse(projectId)}/triggers/${Utils.parse(triggerId)}`, options);
  }

  list(projectId) {
    return this.get(`projects/${Utils.parse(projectId)}/triggers`);
  }

  remove(projectId, triggerId) {
    return this.delete(`projects/${Utils.parse(projectId)}/triggers/${Utils.parse(triggerId)}`);
  }

  show(projectId, triggerId) {
    return this.get(`projects/${Utils.parse(projectId)}/triggers/${Utils.parse(triggerId)}`);
  }
}

module.exports = ProjectTriggers;
