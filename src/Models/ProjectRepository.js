const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectRepository extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  listBranches(projectId) {
    return this.get(`projects/${Utils.parse(projectId)}/repository/branches`);
  }

  showBranch(projectId, branchId) {
    return this.get(`projects/${Utils.parse(projectId)}/repository/branches/${encodeURI(branchId)}`);
  }

  protectBranch(projectId, branchId) {
    return this.put(`projects/${Utils.parse(projectId)}/repository/branches/${encodeURI(branchId)}/protect`);
  }

  unprotectBranch(projectId, branchId) {
    return this.put(`projects/${Utils.parse(projectId)}/repository/branches/${encodeURI(branchId)}/unprotect`);
  }

  createBranch(options = {}) {
    return this.post(`projects/${Utils.parse(options.projectId)}/repository/branches`, options);
  }

  deleteBranch(projectId, branchId) {
      return this.delete(`projects/${Utils.parse(projectId)}/repository/branches/${encodeURI(branchId)}`);
    }

  addTag(options = {}) {
    return this.post(`projects/${Utils.parse(options.id)}/repository/tags`, options);
  }

  deleteTag(projectId, tagName) {
    return this.delete(`projects/${Utils.parse(projectId)}/repository/tags/${encodeURI(tagName)}`);
  }

  showTag(projectId, tagName) {
    return this.get(`projects/${Utils.parse(projectId)}/repository/tags/${encodeURI(tagName)}`);
  }

  listTags(projectId) {
    return this.get(`projects/${Utils.parse(projectId)}/repository/tags`);
  }

  listCommits(projectId) {
    return this.get(`projects/${Utils.parse(projectId)}/repository/commits`);
  }

  showCommit(projectId, sha) {
    return this.get(`projects/${Utils.parse(projectId)}/repository/commits/${sha}`);
  }

  diffCommit(projectId, sha) {
    return this.get(`projects/${Utils.parse(projectId)}/repository/commits/${sha}/diff`);
  }

  listTree(projectId, options = {}) {  
    return this.get(`projects/${Utils.parse(projectId)}/repository/tree`, options);
  }

  showFile(projectId, options = {}) {
    if (options.file_path && options.ref) {
      return this.get(`projects/${Utils.parse(projectId)}/repository/files`, options);
    } else if (options.file_path && options.file_id) {
      return this.get(`projects/${Utils.parse(projectId)}/repository/raw_blobs/` + options.file_id, options);
    }
  }

  createFile(projectId, options = {}) {
    return this.post(`projects/${Utils.parse(projectId)}/repository/files`, options);
  }

  updateFile(projectId, options = {}) {
    return this.put(`projects/${Utils.parse(projectId)}/repository/files`, options);
  }

  compare(projectId, options = {}) {
    return this.get(`projects/${Utils.parse(projectId)}/repository/compare`, options);
  }
}

module.exports = ProjectRepository;
