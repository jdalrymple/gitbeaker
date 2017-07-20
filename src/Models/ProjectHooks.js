const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectHooks extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  list(projectId) {
    projectId = Utils.parse(projectId);

    return this.get(`projects/${projectId}/hooks`);
  }

  show(projectId, hookId) {
    [projectId, hookId] = Array.from(arguments).map(Utils.parse);

    return this.get(`projects/${projectId}/hooks/${hookId}`);
  }

  add(projectId, options) {
    if (typeof options === 'string') options = { url: options };
    projectId = Utils.parse(projectId);

    return this.post(`projects/${projectId}/hooks`, options);
  }

  edit(projectId, hookId, url) {
    [projectId, hookId] = [projectId, hookId].map(Utils.parse);

    return this.put(`projects/${projectId}/hooks/${hookId}`, {
      access_level: parseInt(accessLevel)
    });
  }

  remove(projectId, hookId) {
    [projectId, hookId] = Array.from(arguments).map(Utils.parse);

    return this.delete(`projects/${projectId}/hooks/${hookId}`);
  }
}

module.exports = ProjectHooks;