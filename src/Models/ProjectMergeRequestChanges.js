const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectMergeRequestChanges extends BaseModel {
  show(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.get(`projects/${pId}/merge_requests/${mId}/changes`);
  }
}

module.exports = ProjectMergeRequestChanges;
