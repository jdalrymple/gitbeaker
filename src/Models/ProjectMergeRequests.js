const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectMergeRequests extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  list(projectId, options = {}) {
    options.page = options.page || 1;
    options.per_page = options.per_page || 100;

    return this.get(`projects/${Utils.parse(projectId)}/merge_requests`, options);
  }

  show(projectId, mergeRequestId) {
    return this.get(`projects/${Utils.parse(projectId)}/merge_requests/${parseInt(mergeRequestId)}`);
  }

  add(projectId, sourceBranch, targetBranch, assigneeId, title) {
    let options = {
      id: Utils.parse(projectId),
      source_branch: sourceBranch,
      target_branch: targetBranch,
      title
    };

    if (assigneeId !== undefined) options.assigneeId = parseInt(assigneeId);

    return this.post(`projects/${Utils.parse(projectId)}/merge_requests`, options);
  }

  update(projectId, mergerequestId, options = {}) {
    options.id = Utils.parse(projectId);
    options.merge_request_id = parseInt(mergerequestId);

    return this.put(`projects/${Utils.parse(projectId)}/merge_requests/${parseInt(mergerequestId)}`, options);
  }

  comment(projectId, mergerequestId, note) {
    return this.post(`projects/${Utils.parse(projectId)}/merge_requests/${parseInt(mergerequestId)}/comments`, {
      id: Utils.parse(projectId),
      merge_request_id: parseInt(mergerequestId),
      note
    });
  }
}

module.exports = ProjectMergeRequests;
