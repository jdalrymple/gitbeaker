"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class Repositories extends _infrastructure.BaseService {
  compare(projectId, from, to) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/repository/compare`, {
      from,
      to
    });
  }

  contributors(projectId) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/repository/contributors`);
  }

  showArchive(projectId, {
    sha
  }) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/repository/archive`, {
      sha
    });
  }

  showBlob(projectId, sha) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/repository/blobs/${sha}`);
  }

  showBlobRaw(projectId, sha) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/repository/blobs/${sha}/raw`);
  }

  tree(projectId, options) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/repository/tree`, options);
  }

}

var _default = Repositories;
exports.default = _default;