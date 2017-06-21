const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectKeys extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  listKeys(projectId) {
    return this.get(`projects/${Utils.parse(projectId)}/deploy_keys`);
  }

  getKey(projectId, keyId) {
    return this.get(`projects/${Utils.parse(projectId)}/deploy_keys/${parseInt(keyId)}`);
  }

  addKey(projectId, options = {}) {
    return this.post(`projects/${Utils.parse(projectId)}/deploy_keys`, options);
  }
}

module.exports = ProjectKeys;
