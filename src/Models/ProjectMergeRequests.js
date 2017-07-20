const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectMergeRequests extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  list(projectId, options = {}) {
    Utils.defaultPaging(options);

    projectId = Utils.parse(projectId);

    return this.get(`projects/${Utils.parse(projectId)}/merge_requests`, options);
  }

  show(projectId, mergeRequestId) {
    [projectId, hookId] = Array.from(arguments).map(Utils.parse);

    return this.get(`projects/${projectId}/merge_requests/${mergerequestId}`);
  }

  add(projectId, sourceBranch, targetBranch, assigneeId, title) {
    [projectId, assigneeId] = [projectId, assigneeId].map(Utils.parse);

    let options = {
      id: projectId,
      source_branch: sourceBranch,
      target_branch: targetBranch,
      title
    };

    if (assigneeId !== undefined) options.assigneeId = assigneeId;

    return this.post(`projects/${projectId}/merge_requests`, options);
  }

  update(projectId, mergerequestId, options = {}) {
    [projectId, mergerequestId] = [projectId, mergerequestId].map(Utils.parse);

    options.id = projectId;
    options.merge_request_id = mergerequestId;

    return this.put(`projects/${projectId}/merge_requests/${mergerequestId}`, options);
  }

  comment(projectId, mergerequestId, note) {
    [projectId, mergerequestId] = [projectId, mergerequestId].map(Utils.parse);

    return this.post(`projects/${projectId}/merge_requests/${mergerequestId}/comments`, {
      id: projectId,
      merge_request_id: mergerequestId,
      note
    });
  }
}

module.exports = ProjectMergeRequests;