const BaseModel = require('../BaseModel');
const Utils = require('../Utils');
const ProjectIssueNotes = require('./ProjectIssueNotes');

class ProjectIssues extends BaseModel {
  constructor(...args) {
    super(...args);

    this.notes = new ProjectIssueNotes(...args);
  }

  all(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    Utils.defaultPaging(options);

    return this.get(`projects/${pId}/issues`, options);
  }

  create(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/issues`, options);
  }

  edit(projectId, issueId, options = {}) {
    const [pId, iId] = [projectId, issueId].map(Utils.parse);

    return this.put(`projects/${pId}/issues/${iId}`, options);
  }

  remove(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(Utils.parse);

    return this.delete(`projects/${pId}/issues/${iId}`);
  }

  show(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(Utils.parse);

    return this.get(`projects/${pId}/issues/${iId}`);
  }

  subscribe(projectId, issueId, options = {}) {
    const [pId, iId] = [projectId, issueId].map(Utils.parse);

    return this.post(`projects/${pId}/issues/${iId}/subscribe`, options);
  }

  unsubscribe(projectId, issueId) {
    const [pId, iId] = [projectId, issueId].map(Utils.parse);

    return this.delete(`projects/${pId}/issues/${iId}/unsubscribe`);
  }
}

module.exports = ProjectIssues;
