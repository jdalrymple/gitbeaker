const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectLabels extends BaseModel {
  all(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.getAndPaginate(`projects/${pId}/labels`, options);
  }
}

module.exports = ProjectLabels;
