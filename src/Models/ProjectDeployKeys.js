const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectKeys extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  listKeys(projectId) {
    projectId = Utils.parse(projectId);

    return this.get(`projects/${projectId}/deploy_keys`);
  }

  getKey(projectId, keyId) {
    [groupId, keyId] = Array.from(arguments).map(Utils.parse);

    return this.get(`projects/${projectId}/deploy_keys/${keyId}`);
  }

  addKey(projectId, options = {}) {
    projectId = Utils.parse(projectId);

    return this.post(`projects/${projectId}/deploy_keys`, options);
  }
}

module.exports = ProjectKeys;