"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class Triggers extends _infrastructure.BaseService {
  add(projectId, options) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/triggers`, options);
  }

  all(projectId) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/triggers`);
  }

  edit(projectId, triggerId, options) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.put(this, `projects/${pId}/triggers/${tId}`, options);
  }

  remove(projectId, triggerId) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `projects/${pId}/triggers/${tId}`);
  }

  show(projectId, triggerId) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/triggers/${tId}`);
  }

}

var _default = Triggers;
exports.default = _default;