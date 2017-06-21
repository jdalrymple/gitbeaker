const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectBuilds extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  listBuilds(projectId, options = {}) {
    options.page = options.page || 1;
    options.per_page = options.per_page || 100;

    return this.get(`projects/${Utils.parse(projectId)}/builds`, options);
  }

  showBuild(projectId, buildId) {
    return this.get(`projects/${Utils.parse(projectId)}/builds/${buildId}`);
  }

  triggerBuild(options = {}) {
    return this.post(`projects/${Utils.parse(options.projectId)}/trigger/builds`, options);
  }
}

module.exports = ProjectBuilds;
