"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectRepositoryFiles extends _BaseModel.default {
  create(projectId, filePath, branch, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    const path = (0, _Utils.parse)(filePath);
    const extendedOptions = Object.assign({
      branch
    }, options);
    return this.post(`projects/${pId}/repository/files/${path}`, extendedOptions);
  }

  edit(projectId, filePath, branch, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    const path = (0, _Utils.parse)(filePath);
    const extendedOptions = Object.assign({
      branch
    }, options);
    return this.put(`projects/${pId}/repository/files/${path}`, extendedOptions);
  }

  remove(projectId, filePath, branch, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    const path = (0, _Utils.parse)(filePath);
    const extendedOptions = Object.assign({
      branch
    }, options);
    return this.delete(`projects/${pId}/repository/files/${path}`, extendedOptions);
  }

  show(projectId, filePath, ref) {
    const pId = (0, _Utils.parse)(projectId);
    const path = (0, _Utils.parse)(filePath);
    return this.get(`projects/${pId}/repository/files/${path}`, {
      ref
    });
  }

  showRaw(projectId, filePath, ref) {
    const pId = (0, _Utils.parse)(projectId);
    const path = (0, _Utils.parse)(filePath);
    return this.get(`projects/${pId}/repository/files/${path}/raw`, {
      ref
    });
  }

}

var _default = ProjectRepositoryFiles;
exports.default = _default;