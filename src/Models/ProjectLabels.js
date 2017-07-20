const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectLabels extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  all(projectId, options = {}) {
    Utils.defaultPaging(options);
    projectId = Utils.parse(projectId);

    return this.get(`projects/${projectId}/labels`, options);
  }
}

module.exports = ProjectLabels;
