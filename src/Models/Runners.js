const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class Runners extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  show(runnerId) {
    return this.get(`runners/${parseInt(runnerId)}`);
  }

  update(runnerId, attributes) {
    return this.put(`runners/${parseInt(runnerId)}`, attributes);
  }

  remove(runnerId, projectId, enable) {
    return this.delete(`runners/${parseInt(runnerId)}`);
  }
}

module.exports = Runners;
