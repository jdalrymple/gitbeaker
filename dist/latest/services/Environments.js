"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class Environments extends _infrastructure.BaseService {
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/environments`, options);
  }

  create(projectId, options) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.put(this, `projects/${pId}/environments`, options);
  }

  edit(projectId, environmentId, options) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.put(this, `projects/${pId}/environments/${eId}`, options);
  }

  remove(projectId, environmentId) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.delete(this, `projects/${pId}/environments/${eId}`);
  }

  stop(projectId, environmentId) {
    const [pId, eId] = [projectId, environmentId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/environments/${eId}/stop`);
  }

}

var _default = Environments;
exports.default = _default;