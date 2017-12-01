const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class MergeRequests extends BaseModel {
  all(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.get(`merge_requests`, options);
  }
}

module.exports = MergeRequests;
