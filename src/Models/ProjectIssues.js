const BaseModel = require('../BaseModel');
const Utils = require('../Utils');
const ProjectIssueNotes = require('./ProjectIssueNotes');

class ProjectIssues extends BaseModel {
  constructor(...args) {
    super(...args);

    this.notes = ProjectIssueNotes;
  }

  all(projectId, options = {}) {
    Utils.defaultPaging(options);

    projectId = Utils.parse(projectId);

    return this.get(`projects/${projectId}/issues`, options);
  }

  create(projectId, options = {}) {
    projectId = Utils.parse(projectId);

    return this.post(`projects/${projectId}/issues`, options);
  }

  edit(projectId, issueId, options = {}) {
    [projectId, issueId] = [projectId, issueId].map(Utils.parse)

    return this.put(`projects/${projectId}/issues/${issueId}`, options);
  }

  remove(projectId, issueId) {
    [projectId, issueId] = Array.from(arguments).map(Utils.parse)


    return this.delete(`projects/${projectId}/issues/${issueId}`);
  }

  show(projectId, issueId) {
    [projectId, issueId] = Array.from(arguments).map(Utils.parse)


    return this.get(`projects/${projectId}/issues/${issueId}`);
  }

  subscribe(projectId, issueId, options = {}) {
    [projectId, issueId] = Array.from(arguments).map(Utils.parse)

    return this.post(`projects/${projectId}/issues/${issueId}/subscribe`, options);
  }

  unsubscribe(projectId, issueId) {
    [projectId, issueId] = Array.from(arguments).map(Utils.parse)

    return this.delete(`projects/${projectId}/issues/${issueId}/unsubscribe`);
  }
}

module.exports = ProjectIssues;
