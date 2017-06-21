const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectLabels extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  all(projectId, options = {}) {
  	options.page = options.page || 1;
    options.per_page = options.per_page || 100;

    return this.get(`projects/${Utils.parse(projectId)}/labels`, options);
  }
}

module.exports = ProjectLabels;
