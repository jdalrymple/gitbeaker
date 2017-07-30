const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectKeys extends BaseModel {
  listKeys(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/deploy_keys`);
  }

  getKey(projectId, keyId) {
    const [pId, kId] = [projectId, keyId].map(Utils.parse);

    return this.get(`projects/${pId}/deploy_keys/${kId}`);
  }

  addKey(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/deploy_keys`, options);
  }
}

module.exports = ProjectKeys;
