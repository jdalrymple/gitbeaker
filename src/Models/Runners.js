const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class Runners extends BaseModel {
  all(options = {}) {
    return this.get('runners/all', options);
  }

  remove(runnerId) {
    const rId = Utils.parse(runnerId);

    return this.delete(`runners/${rId}`);
  }

  show(runnerId) {
    const rId = Utils.parse(runnerId);

    return this.get(`runners/${rId}`);
  }

  update(runnerId, attributes) {
    const rId = Utils.parse(runnerId);

    return this.put(`runners/${rId}`, attributes);
  }
}

module.exports = Runners;
