const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class Pipelines extends BaseModel {
  all(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/pipelines`);
  }
}

module.exports = Pipelines;
