const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectTriggers extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  createTrigger(projectId, options = {}) {
    return this.post(`projects/${Utils.parse(projectId)}/triggers`, options);
  }

  editTrigger(projectId, triggerId, options = {}) {
    return this.put(`projects/${Utils.parse(projectId)}/triggers/${Utils.parse(triggerId)}`, options);
  }

  listTriggers(projectId) {
    return this.get(`projects/${Utils.parse(projectId)}/triggers`);
  }

  removeTrigger(projectId, triggerId) {
    return this.delete(`projects/${Utils.parse(projectId)}/triggers/${Utils.parse(triggerId)}`);
  }

  showTrigger(projectId, triggerId) {
    return this.get(`projects/${Utils.parse(projectId)}/triggers/${Utils.parse(triggerId)}`);
  }

  triggerBuild(options = {}) {
    return this.post(`projects/${Utils.parse(options.projectId)}/trigger/pipeline`, options);
  }
}

module.exports = ProjectTriggers;
