const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectRepositoryCommitComments extends BaseModel {
  all(projectId, sha) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/commits/${sha}/comments`);
  }

  create(projectId, sha, note, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/repository/commits/${sha}/comments`, Object.assign({ note }, options));
  }
}

module.exports = ProjectRepositoryCommitComments;