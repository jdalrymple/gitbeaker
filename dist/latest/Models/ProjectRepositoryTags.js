"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectRepositoryTags extends _BaseModel.default {
  all(projectId, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/repository/tags`, options);
  }

  create(projectId, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.post(`projects/${pId}/repository/tags`, options);
  }

  remove(projectId, tagName) {
    const pId = (0, _Utils.parse)(projectId);
    return this.delete(`projects/${pId}/repository/tags/${encodeURI(tagName)}`);
  }

  show(projectId, tagName) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/repository/tags/${encodeURI(tagName)}`);
  }

}

var _default = ProjectRepositoryTags;
exports.default = _default;