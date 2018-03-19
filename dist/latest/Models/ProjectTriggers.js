"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectTriggers extends _BaseModel.default {
  add(projectId, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.post(`projects/${pId}/triggers`, options);
  }

  all(projectId) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/triggers`);
  }

  edit(projectId, triggerId, options = {}) {
    const [pId, tId] = [projectId, triggerId].map(_Utils.parse);
    return this.put(`projects/${pId}/triggers/${tId}`, options);
  }

  remove(projectId, triggerId) {
    const [pId, tId] = [projectId, triggerId].map(_Utils.parse);
    return this.delete(`projects/${pId}/triggers/${tId}`);
  }

  show(projectId, triggerId) {
    const [pId, tId] = [projectId, triggerId].map(_Utils.parse);
    return this.get(`projects/${pId}/triggers/${tId}`);
  }

}

var _default = ProjectTriggers;
exports.default = _default;