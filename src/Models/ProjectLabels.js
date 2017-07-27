const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectLabels extends BaseModel {
  all(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    Utils.defaultPaging(options);

    return this.get(`projects/${pId}/labels`, options);
  }
}

module.exports = ProjectLabels;
