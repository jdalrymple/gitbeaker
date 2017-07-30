const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectRepository extends BaseModel {
  listBranches(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/branches`);
  }

  showBranch(projectId, branchId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/branches/${encodeURI(branchId)}`);
  }

  protectBranch(projectId, branchId) {
    const pId = Utils.parse(projectId);

    return this.put(`projects/${pId}/repository/branches/${encodeURI(branchId)}/protect`);
  }

  unprotectBranch(projectId, branchId) {
    const pId = Utils.parse(projectId);

    return this.put(`projects/${pId}/repository/branches/${encodeURI(branchId)}/unprotect`);
  }

  createBranch(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/repository/branches`, options);
  }

  deleteBranch(projectId, branchId) {
    const pId = Utils.parse(projectId);

    return this.delete(`projects/${pId}/repository/branches/${encodeURI(branchId)}`);
  }

  addTag(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/repository/tags`, options);
  }

  deleteTag(projectId, tagName) {
    const pId = Utils.parse(projectId);

    return this.delete(`projects/${pId}/repository/tags/${encodeURI(tagName)}`);
  }

  showTag(projectId, tagName) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/tags/${encodeURI(tagName)}`);
  }

  listTags(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/tags`);
  }

  listCommits(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/commits`);
  }

  showCommit(projectId, sha) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/commits/${sha}`);
  }

  diffCommit(projectId, sha) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/commits/${sha}/diff`);
  }

  listTree(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/tree`, options);
  }

  showFile(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    if (options.file_path && options.ref) {
      return this.get(`projects/${pId}/repository/files`, options);
    } else if (options.file_path && options.file_id) {
      return this.get(`projects/${pId}/repository/raw_blobs/{options.file_id}`, options);
    }

    return null;
  }

  createFile(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/repository/files`, options);
  }

  updateFile(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.put(`projects/${pId}/repository/files`, options);
  }

  compare(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/compare`, options);
  }
}

module.exports = ProjectRepository;
