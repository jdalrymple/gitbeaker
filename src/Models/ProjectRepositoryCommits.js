const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectRepositoryCommits extends BaseModel {
  all(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/commits`);
  }

  show(projectId, sha) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/commits/${sha}`);
  }

  diff(projectId, sha) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/commits/${sha}/diff`);
  }
}

module.exports = ProjectRepositoryCommits;
