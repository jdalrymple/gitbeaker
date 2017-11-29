const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class Pipelines extends BaseModel {
  all(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/pipelines`, options);
  }
}

module.exports = Pipelines;
