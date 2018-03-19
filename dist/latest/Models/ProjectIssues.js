"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var _ResourceNotes = _interopRequireDefault(require("./ResourceNotes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectIssues extends _BaseModel.default {
  constructor(...args) {
    super(...args);
    this.notes = new _ResourceNotes.default('projects', 'issues', ...args);
  }

  all(projectId, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/issues`, options);
  }

  create(projectId, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.post(`projects/${pId}/issues`, options);
  }

  edit(projectId, issueId, options = {}) {
    const [pId, iId] = [projectId, issueId].map(_Utils.parse);
    return this.put(`projects/${pId}/issues/${iId}`, options);
  }

  link(projectId, issueIId, targetProjectId, targetIssueId, options = {}) {
    const [pId, iId] = [projectId, issueIId].map(_Utils.parse);
    const [targetpId, targetIId] = [targetProjectId, targetIssueId].map(_Utils.parse);
    return this.post(`projects/${pId}/issues/${iId}/links`, Object.assign({
      target_project_id: targetpId,
      target_issue_id: targetIId
    }, options));
  }

  remove(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(_Utils.parse);
    return this.delete(`projects/${pId}/issues/${iId}`);
  }

  show(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(_Utils.parse);
    return this.get(`projects/${pId}/issues/${iId}`);
  }

  subscribe(projectId, issueId, options = {}) {
    const [pId, iId] = [projectId, issueId].map(_Utils.parse);
    return this.post(`projects/${pId}/issues/${iId}/subscribe`, options);
  }

  unsubscribe(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(_Utils.parse);
    return this.delete(`projects/${pId}/issues/${iId}/unsubscribe`);
  }

}

var _default = ProjectIssues;
exports.default = _default;