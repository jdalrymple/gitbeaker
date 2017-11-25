const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectRepository extends BaseModel {
  listBranches(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/branches`);
  }

  showBranch(projectId, branchName) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/branches/${encodeURI(branchId)}`);
  }

  protectBranch(projectId, branchName, options = {}) {
    const pId = Utils.parse(projectId);

    return this.put(`projects/${pId}/repository/branches/${encodeURI(branchName)}/protect`, options);
  }

  unprotectBranch(projectId, branchName) {
    const pId = Utils.parse(projectId);

    return this.put(`projects/${pId}/repository/branches/${encodeURI(branchName)}/unprotect`);
  }

  createBranch(projectId, branch, ref) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/repository/branches`, { branch, ref });
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

  showFile(projectId, filePath, ref) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/files/${filePath}`, { ref: options.ref });
  }

  showRawFile(projectId, filePath, ref) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/files/${filePath}/raw`, { ref: options.ref });
  }

  createFile(projectId, filePath, branch, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/repository/files/${filePath}`, Object.assign({ branch }, options));
  }

  updateFile(projectId, filePath, branch, options = {}) {
    const pId = Utils.parse(projectId);

    return this.put(`projects/${pId}/repository/files/${filePath}`, Object.assign({ branch }, options));
  }

  deleteFile(projectId, filePath, branch, options = {}) {
    const pId = Utils.parse(projectId);

    return this.delete(`projects/${pId}/repository/files/${filePath}`, Object.assign({ branch }, options));
  }

  compare(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/compare`, options);
  }
}

module.exports = ProjectRepository;