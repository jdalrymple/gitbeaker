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

  protect(projectId, branchId, options = {}) {
    const [pId, bId] = [projectId, branchId].map(Utils.parse);

    return this.put(`projects/${pId}/repository/branches/${bId}/protect`, options);
  }

  remove(projectId, branchId) {
    const [pId, bId] = [projectId, branchId].map(Utils.parse);

    return this.delete(`projects/${pId}/repository/branches/${bId}`);
  }

  show(projectId, branchId) {
    const [pId, bId] = [projectId, branchId].map(Utils.parse);

    return this.get(`projects/${pId}/repository/branches/${bId}`);
  }

  unprotect(projectId, branchId) {
    const [pId, bId] = [projectId, branchId].map(Utils.parse);

    return this.put(`projects/${pId}/repository/branches/${bId}/unprotect`);
  }
}

module.exports = ProjectRepositoryBranches;
