"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class DeployKeys extends _infrastructure.BaseService {
  add(projectId, options) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.post(this, `projects/${pId}/deploy_keys`, options);
  }

  all(projectId) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/deploy_keys`);
  }

  show(projectId, keyId) {
    const [pId, kId] = [projectId, keyId].map(encodeURIComponent);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/deploy_keys/${kId}`);
  }

}

var _default = DeployKeys;
exports.default = _default;