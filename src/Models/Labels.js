const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class Labels extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  create(projectId, options = {}) {
    return this.post(`projects/${Utils.parse(projectId)}/labels`, options);
  }
}

module.exports = Labels;
