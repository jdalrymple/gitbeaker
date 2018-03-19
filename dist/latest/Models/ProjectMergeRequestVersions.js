"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectMergeRequestVersions extends _BaseModel.default {
  all(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(_Utils.parse);
    return this.get(`projects/${pId}/merge_requests/${mId}/versions`);
  }

  show(projectId, mergerequestId, versionId) {
    const [pId, mId, vId] = [projectId, mergerequestId, versionId].map(_Utils.parse);
    return this.get(`projects/${pId}/merge_requests/${mId}/versions/${vId}`);
  }

}

var _default = ProjectMergeRequestVersions;
exports.default = _default;