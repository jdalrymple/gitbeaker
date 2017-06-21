const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectServices extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  show(projectId, serviceName) {
    return this.get(`projects/${Utils.parse(projectId)}/services/${serviceName}`);
  }

  update(projectId, serviceName, params = {}) {
    return this.put(`projects/${Utils.parse(projectId)}/services/${serviceName}`, params);
  }

  remove(projectId, serviceName) {
    return this.delete(`projects/${Utils.parse(projectId)}/services/${serviceName}`);
  }
}

module.exports = ProjectServices;
