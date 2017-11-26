const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectRepositoryBranches extends BaseModel {
  all(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/branches`);
  }

  create(projectId, branch, ref) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/repository/branches`, { branch, ref });
  }

  protect(projectId, branchName, options = {}) {
    const pId = Utils.parse(projectId);

    return this.put(`projects/${pId}/repository/branches/${encodeURI(branchName)}/protect`, options);
  }

  remove(projectId, branchId) {
    const pId = Utils.parse(projectId);

    return this.delete(`projects/${pId}/repository/branches/${encodeURI(branchId)}`);
  }

  show(projectId, branchName) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/branches/${encodeURI(branchId)}`);
  }

  unprotect(projectId, branchName) {
    const pId = Utils.parse(projectId);

    return this.put(`projects/${pId}/repository/branches/${encodeURI(branchName)}/unprotect`);
  }
}

module.exports = ProjectRepositoryBranches;
