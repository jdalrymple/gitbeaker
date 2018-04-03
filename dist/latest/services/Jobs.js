"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _infrastructure = require("../infrastructure");

class Jobs extends _infrastructure.BaseService {
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);
    return _infrastructure.RequestHelper.get(this, `projects/${pId}/jobs`, options);
  }

}

var _default = Jobs;
exports.default = _default;