const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectMergeRequests extends BaseModel {
  add(projectId, sourceBranch, targetBranch, assigneeId, title) {
    const [pId, aId] = [projectId, assigneeId].map(Utils.parse);
    const options = {
      id: pId,
      source_branch: sourceBranch,
      target_branch: targetBranch,
      title,
    };

    if (assigneeId !== undefined) options.assigneeId = aId;

    return this.post(`projects/${pId}/merge_requests`, options);
  }

  all(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/merge_requests`, options);
  }

  comment(projectId, mergerequestId, note) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.post(`projects/${pId}/merge_requests/${mId}/comments`, {
      body: note,
    });
  }

  edit(projectId, mergerequestId, options = {}) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.put(`projects/${pId}/merge_requests/${mId}`, options);
  }

  show(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.get(`projects/${pId}/merge_requests/${mId}`);
  }
}

module.exports = ProjectMergeRequests;
