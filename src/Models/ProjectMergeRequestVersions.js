const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectMergeRequestVersions extends BaseModel {
  all(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.get(`projects/${pId}/merge_requests/${mId}/versions`);
  }

  show(projectId, mergerequestId, versionId) {
    const [pId, mId, vId] = [projectId, mergerequestId, versionId].map(Utils.parse);

    return this.get(`projects/${pId}/merge_requests/${mId}/versions/${vId}`);
  }
}

module.exports = ProjectMergeRequestVersions;
