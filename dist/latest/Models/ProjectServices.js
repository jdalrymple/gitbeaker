"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectServices extends _BaseModel.default {
  edit(projectId, serviceName, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.put(`projects/${pId}/services/${serviceName}`, options);
  }

  remove(projectId, serviceName) {
    const pId = (0, _Utils.parse)(projectId);
    return this.delete(`projects/${pId}/services/${serviceName}`);
  }

  show(projectId, serviceName) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/services/${serviceName}`);
  }

}

var _default = ProjectServices;
exports.default = _default;