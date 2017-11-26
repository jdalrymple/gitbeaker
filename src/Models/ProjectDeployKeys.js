const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectDeployKeys extends BaseModel {
  all(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/deploy_keys`);
  }

  show(projectId, keyId) {
    const [pId, kId] = [projectId, keyId].map(Utils.parse);

    return this.get(`projects/${pId}/deploy_keys/${kId}`);
  }

  add(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/deploy_keys`, options);
  }
}

module.exports = ProjectDeployKeys;
