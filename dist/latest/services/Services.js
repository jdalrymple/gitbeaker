"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class Services extends _infrastructure.BaseService {
  edit(projectId, serviceName, options) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.put(this, `projects/${pId}/services/${serviceName}`, options);
  }

  remove(projectId, serviceName) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.delete(this, `projects/${pId}/services/${serviceName}`);
  }

  show(projectId, serviceName) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/services/${serviceName}`);
  }

}

var _default = Services;
exports.default = _default;