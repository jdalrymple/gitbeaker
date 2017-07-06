const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class Pipelines extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  all(projectId) {
    return this.get(`projects/${Utils.parse(projectId)}/pipelines`);
  }
}

module.exports = Pipelines
