const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectMergeRequestCommits extends BaseModel {
  show(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.get(`projects/${pId}/merge_requests/${mId}/commits`);
  }
}

module.exports = ProjectMergeRequestCommits;
