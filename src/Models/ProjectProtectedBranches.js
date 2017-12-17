const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectProtectedBranches extends BaseModel {
  all(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/protected_branches`);
  }

  protect(projectId, branchName, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/protected_branches`, Object.assign(options, { name: branchName }));
  }

  show(projectId, branchName) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/protected_branches/${branchName}`);
  }

  unprotect(projectId, branchName) {
    const pId = Utils.parse(projectId);

    return this.delete(`projects/${pId}/protected_branches/${branchName}`);
  }
}

module.exports = ProjectProtectedBranches;
