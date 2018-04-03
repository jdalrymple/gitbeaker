"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class Branches extends _infrastructure.BaseService {
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/repository/branches`, options);
  }

  create(projectId, branchName, ref) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/repository/branches`, {
      branch: branchName,
      ref
    });
  }

  protect(projectId, branchName, options) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.put(this, `projects/${pId}/repository/branches/${branchName}/protect`, options);
  }

  remove(projectId, branchName) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.delete(this, `projects/${pId}/repository/branches/${branchName}`);
  }

  show(projectId, branchName) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/repository/branches/${branchName}`);
  }

  unprotect(projectId, branchName) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.put(this, `projects/${pId}/repository/branches/${branchName}/unprotect`);
  }

}

var _default = Branches;
exports.default = _default;