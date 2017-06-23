const BaseModel = require('../BaseModel');
const Utils = require('../Utils');
const IssueNotes = require('./IssueNotes');

class ProjectIssues extends BaseModel {
  constructor(...args) {
    super(...args);
    this.notes = IssueNotes;
  }

  all(projectId, options = {}) {
    options.page = options.page || 1;
    options.per_page = options.per_page || 100;

    return this.get(`projects/${Utils.parseProjectId(projectId)}/issues`, options);
  }

  create(projectId, options = {}) {
    projectId = Utils.parse(projectId);

    return this.post(`projects/${projectId}/issues`, options);
  }

  edit(projectId, issueId, options = {}) {
    projectId = Utils.parse(projectId);
    issueId = Utils.parse(issueId);

    return this.put(`projects/${projectId}/issues/${issueId}`, options);
  }

  remove(projectId, issueId) {
    projectId = Utils.parse(projectId);
    issueId = Utils.parse(issueId);

    return this.delete(`projects/${projectId}/issues/${issueId}`);
  }

  show(projectId, issueId) {
    projectId = Utils.parse(projectId);
    issueId = Utils.parse(issueId);

    return this.get(`projects/${projectId}/issues/${issueId}`);
  }

  subscribe(projectId, issueId, options = {}) {
    projectId = Utils.parse(projectId);
    issueId = Utils.parse(issueId);

    return this.post(`projects/${projectId}/issues/${issueId}/subscribe`, options);
  }

  unsubscribe(projectId, issueId) {
    projectId = Utils.parse(projectId);
    issueId = Utils.parse(issueId);

    return this.delete(`projects/${projectId}/issues/${issueId}/unsubscribe`);
  }
}

module.exports = ProjectIssues;
