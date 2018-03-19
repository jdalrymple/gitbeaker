"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectRepositoryCommitComments extends _BaseModel.default {
  all(projectId, sha, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/repository/commits/${sha}/comments`, options);
  }

  create(projectId, sha, note, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.post(`projects/${pId}/repository/commits/${sha}/comments`, Object.assign({
      note
    }, options));
  }

}

var _default = ProjectRepositoryCommitComments;
exports.default = _default;