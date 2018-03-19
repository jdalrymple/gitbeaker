"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var _ProjectRepositoryCommitComments = _interopRequireDefault(require("./ProjectRepositoryCommitComments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectRepositoryCommits extends _BaseModel.default {
  constructor(...args) {
    super(...args);
    this.comments = new _ProjectRepositoryCommitComments.default(...args);
  }

  all(projectId, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/repository/commits`, options);
  }

  diff(projectId, sha) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/repository/commits/${sha}/diff`);
  }

  show(projectId, sha) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/repository/commits/${sha}`);
  }

  statuses(projectId, sha, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/repository/commits/${sha}/statuses`, options);
  }

}

var _default = ProjectRepositoryCommits;
exports.default = _default;