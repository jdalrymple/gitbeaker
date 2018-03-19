"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

var _Utils = require("../Utils");

var _ProjectMergeRequestVersions = _interopRequireDefault(require("./ProjectMergeRequestVersions"));

var _ProjectMergeRequestChanges = _interopRequireDefault(require("./ProjectMergeRequestChanges"));

var _ProjectMergeRequestCommits = _interopRequireDefault(require("./ProjectMergeRequestCommits"));

var _ResourceNotes = _interopRequireDefault(require("./ResourceNotes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectMergeRequests extends _BaseModel.default {
  constructor(...args) {
    super(...args);
    this.commits = new _ProjectMergeRequestCommits.default(...args);
    this.changes = new _ProjectMergeRequestChanges.default(...args);
    this.versions = new _ProjectMergeRequestVersions.default(...args);
    this.notes = new _ResourceNotes.default('projects', 'merge_requests', ...args);
  }

  accept(projectId, mergerequestId, options = {}) {
    const [pId, mId] = [projectId, mergerequestId].map(_Utils.parse);
    return this.put(`projects/${pId}/merge_requests/${mId}/merge`, options);
  }

  all(projectId, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.get(`projects/${pId}/merge_requests`, options);
  }

  cancelOnPipelineSucess(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(_Utils.parse);
    return this.put(`projects/${pId}/merge_requests/${mId}/cancel_merge_when_pipeline_succeeds`);
  }

  closesIssues(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(_Utils.parse);
    return this.get(`projects/${pId}/merge_requests/${mId}/closes_issues`);
  }

  create(projectId, sourceBranch, targetBranch, title, options = {}) {
    const pId = (0, _Utils.parse)(projectId);
    return this.post(`projects/${pId}/merge_requests`, Object.assign({
      id: pId,
      source_branch: sourceBranch,
      target_branch: targetBranch,
      title
    }, options));
  }

  createTodo(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(_Utils.parse);
    return this.post(`projects/${pId}/merge_requests/${mId}/todo`);
  }

  edit(projectId, mergerequestId, options = {}) {
    const [pId, mId] = [projectId, mergerequestId].map(_Utils.parse);
    return this.put(`projects/${pId}/merge_requests/${mId}`, options);
  }

  remove(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(_Utils.parse);
    return this.delete(`projects/${pId}/merge_requests/${mId}`);
  }

  show(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(_Utils.parse);
    return this.get(`projects/${pId}/merge_requests/${mId}`);
  }

  subscribe(projectId, mergerequestId, options = {}) {
    const [pId, mId] = [projectId, mergerequestId].map(_Utils.parse);
    return this.post(`projects/${pId}/merge_requests/${mId}/subscribe`, options);
  }

  resetSpentTime(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(_Utils.parse);
    return this.post(`projects/${pId}/merge_requests/${mId}/reset_spent_time`);
  }

  resetTimeEstimate(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(_Utils.parse);
    return this.post(`projects/${pId}/merge_requests/${mId}/reset_time_estimate`);
  }

  spentTime(projectId, mergerequestId, duration) {
    const [pId, mId] = [projectId, mergerequestId].map(_Utils.parse);
    return this.post(`projects/${pId}/merge_requests/${mId}/add_spent_time`, {
      duration
    });
  }

  timeEstimate(projectId, mergerequestId, duration) {
    const [pId, mId] = [projectId, mergerequestId].map(_Utils.parse);
    return this.post(`projects/${pId}/merge_requests/${mId}/time_estimate`, {
      duration
    });
  }

  timeStats(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(_Utils.parse);
    return this.get(`projects/${pId}/merge_requests/${mId}/time_stats`);
  }

  unsubscribe(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(_Utils.parse);
    return this.delete(`projects/${pId}/merge_requests/${mId}/unsubscribe`);
  }

}

var _default = ProjectMergeRequests;
exports.default = _default;