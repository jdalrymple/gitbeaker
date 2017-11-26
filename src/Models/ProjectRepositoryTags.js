const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectRepositoryTags extends BaseModel {
  all(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/tags`);
  }

  create(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/repository/tags`, options);
  }

  remove(projectId, tagName) {
    const pId = Utils.parse(projectId);

    return this.delete(`projects/${pId}/repository/tags/${encodeURI(tagName)}`);
  }

  show(projectId, tagName) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/tags/${encodeURI(tagName)}`);
  }
}

module.exports = ProjectRepositoryTags;
