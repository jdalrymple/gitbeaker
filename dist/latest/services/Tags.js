"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class Tags extends _infrastructure.BaseService {
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/repository/tags`, options);
  }

  create(projectId, options) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/repository/tags`, options);
  }

  remove(projectId, tagName) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `projects/${pId}/repository/tags/${tId}`);
  }

  show(projectId, tagName) {
    const [pId, tId] = [projectId, tagName].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/repository/tags/${tId}`);
  }

}

var _default = Tags;
exports.default = _default;