const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class Runners extends BaseModel {
  all(options = {}) {
    return this.get('runners/all', options);
  }

  allOwned(options = {}) {
    return this.get('runners', options);
  }

  edit(runnerId, attributes) {
    const rId = Utils.parse(runnerId);

    return this.put(`runners/${rId}`, attributes);
  }

  remove(runnerId) {
    const rId = Utils.parse(runnerId);

    return this.delete(`runners/${rId}`);
  }

  show(runnerId) {
    const rId = Utils.parse(runnerId);

    return this.get(`runners/${rId}`);
  }

  showJobs(runnerId) {
    const rId = Utils.parse(runnerId);

    return this.get(`runners/${rId}/jobs`);
  }
}

module.exports = Runners;
