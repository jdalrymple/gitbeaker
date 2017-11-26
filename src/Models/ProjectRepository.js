const BaseModel = require('./BaseModel');
const ProjectRepositoryBranches = require('./ProjectRepositoryBranches');
const ProjectRepositoryTags = require('./ProjectRepositoryTags');
const ProjectRepositoryCommits = require('./ProjectRepositoryCommits');
const ProjectRepositoryFiles = require('./ProjectRepositoryFiles');
const Utils = require('../Utils');

class ProjectRepository extends BaseModel {
  constructor(...args) {
    super(...args);

    this.branches = new ProjectRepositoryBranches(...args);
    this.tags = new ProjectRepositoryTags(...args);
    this.commits = new ProjectRepositoryCommits(...args);
    this.files = new ProjectRepositoryFiles(...args);
  }

  compare(projectId, from, to) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/compare`, { from, to });
  }

  contributors(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/contributors`);
  }

  showArchive(projectId, { sha }) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/archive`, { sha });
  }

  showBlob(projectId, sha) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/blobs/${sha}`);
  }

  showBlobRaw(projectId, sha) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/blobs/${sha}/raw`);
  }

  tree(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/tree`, options);
  }
}

module.exports = ProjectRepository;
