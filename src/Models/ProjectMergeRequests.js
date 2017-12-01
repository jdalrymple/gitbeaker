const BaseModel = require('./BaseModel');
const Utils = require('../Utils');
const ProjectMergeRequestVersions = require('./ProjectMergeRequestVersions');
const ProjectMergeRequestChanges = require('./ProjectMergeRequestChanges');
const ProjectMergeRequestCommits = require('./ProjectMergeRequestCommits');
const ResourceNotes = require('./ResourceNotes');

class ProjectMergeRequests extends BaseModel {
  constructor(...args) {
    super(...args);

    this.commits = new ProjectMergeRequestCommits(...args);
    this.changes = new ProjectMergeRequestChanges(...args);
    this.versions = new ProjectMergeRequestVersions(...args);
    this.notes = new ResourceNotes('projects', 'merge_requests', ...args);
  }

  accept(projectId, mergerequestId, options = {}) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.put(`projects/${pId}/merge_requests/${mId}/merge`, options);
  }

  all(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/merge_requests`, options);
  }

  cancelOnPipelineSucess(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.put(`projects/${pId}/merge_requests/${mId}/cancel_merge_when_pipeline_succeeds`);
  }

  closesIssues(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.get(`projects/${pId}/merge_requests/${mId}/closes_issues`);
  }

  create(projectId, sourceBranch, targetBranch, title, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/merge_requests`, Object.assign({
      id: pId,
      source_branch: sourceBranch,
      target_branch: targetBranch,
      title,
    }, options));
  }

  createTodo(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.post(`projects/${pId}/merge_requests/${mId}/todo`);
  }

  edit(projectId, mergerequestId, options = {}) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.put(`projects/${pId}/merge_requests/${mId}`, options);
  }

  remove(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.delete(`projects/${pId}/merge_requests/${mId}`);
  }

  show(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.get(`projects/${pId}/merge_requests/${mId}`);
  }

  subscribe(projectId, mergerequestId, options = {}) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.post(`projects/${pId}/merge_requests/${mId}/subscribe`, options);
  }

  resetSpentTime(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.post(`projects/${pId}/merge_requests/${mId}/reset_spent_time`);
  }

  resetTimeEstimate(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.post(`projects/${pId}/merge_requests/${mId}/reset_time_estimate`);
  }

  spentTime(projectId, mergerequestId, duration) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.post(`projects/${pId}/merge_requests/${mId}/add_spent_time`, { duration });
  }

  timeEstimate(projectId, mergerequestId, duration) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.post(`projects/${pId}/merge_requests/${mId}/time_estimate`, { duration });
  }

  timeStats(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.get(`projects/${pId}/merge_requests/${mId}/time_stats`);
  }

  unsubscribe(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(Utils.parse);

    return this.delete(`projects/${pId}/merge_requests/${mId}/unsubscribe`);
  }
}

module.exports = ProjectMergeRequests;
