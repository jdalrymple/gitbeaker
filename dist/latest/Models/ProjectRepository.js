"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var _ProjectRepositoryBranches = _interopRequireDefault(require("./ProjectRepositoryBranches"));

var _ProjectRepositoryTags = _interopRequireDefault(require("./ProjectRepositoryTags"));

var _ProjectRepositoryCommits = _interopRequireDefault(require("./ProjectRepositoryCommits"));

var _ProjectRepositoryFiles = _interopRequireDefault(require("./ProjectRepositoryFiles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectRepository extends _BaseModel.default {
  constructor(...args) {
    super(...args);
    this.branches = new _ProjectRepositoryBranches.default(...args);
    this.tags = new _ProjectRepositoryTags.default(...args);
    this.commits = new _ProjectRepositoryCommits.default(...args);
    this.files = new _ProjectRepositoryFiles.default(...args);
  }

  compare(projectId, from, to) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/repository/compare`, {
      from,
      to
    });
  }

  contributors(projectId) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/repository/contributors`);
  }

  showArchive(projectId, {
    sha
  }) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/repository/archive`, {
      sha
    });
  }

  showBlob(projectId, sha) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/repository/blobs/${sha}`);
  }

  showBlobRaw(projectId, sha) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/repository/blobs/${sha}/raw`);
  }

  tree(projectId, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/repository/tree`, options);
  }

}

var _default = ProjectRepository;
exports.default = _default;