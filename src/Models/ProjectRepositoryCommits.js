const BaseModel = require('./BaseModel');
const Utils = require('../Utils');
const ProjectRepositoryCommitComments = require('./ProjectRepositoryCommitComments');

class ProjectRepositoryCommits extends BaseModel {
  constructor(...args){
    super(...args);

    this.comments = new ProjectRepositoryCommitComments(...args);
  }

  all(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/commits`);
  }

  diff(projectId, sha) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/commits/${sha}/diff`);
  }

  show(projectId, sha) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/commits/${sha}`);
  }

  statuses(projectId, sha, options = {}) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/commits/${sha}/statuses`, options);
  }
}

module.exports = ProjectRepositoryCommits;
