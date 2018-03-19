"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectMergeRequestCommits extends _BaseModel.default {
  show(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(_Utils.parse);
    return this.get(`projects/${pId}/merge_requests/${mId}/commits`);
  }

}

var _default = ProjectMergeRequestCommits;
exports.default = _default;