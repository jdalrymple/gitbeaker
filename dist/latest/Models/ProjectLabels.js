"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectLabels extends _BaseModel.default {
  all(projectId, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/labels`, options);
  }

  create(projectId, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.post(`projects/${pId}/labels`, options);
  }

  edit(projectId, labelName, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.put(`projects/${pId}/labels`, Object.assign({
      name: labelName
    }, options));
  }

  remove(projectId, labelName) {
    const pId = (0, _Utils.parse)(projectId);
    return this.delete(`projects/${pId}/labels`, {
      name: labelName
    });
  }

  subscribe(projectId, labelId, options = {}) {
    const [pId, lId] = [projectId, labelId].map(_Utils.parse);
    return this.post(`projects/${pId}/issues/${lId}/subscribe`, options);
  }

  unsubscribe(projectId, labelId) {
    const [pId, lId] = [projectId, labelId].map(_Utils.parse);
    return this.delete(`projects/${pId}/issues/${lId}/unsubscribe`);
  }

}

var _default = ProjectLabels;
exports.default = _default;