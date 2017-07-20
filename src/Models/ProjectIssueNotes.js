const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectIssueNotes extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  all(projectId, issueId, options = {}) {
    options.page = options.page || 1;
    options.per_page = options.per_page || 100;

    return this.get(`projects/${Utils.parse(projectId)}/issues/${parseInt(issueId)}/notes`, options);
  }

  create(projectId, issueId, options = {}) {
  	if(!options.body) throw new Error('Missing required property: body');

    console.log(this.post)
  
    return this.post(`projects/${Utils.parse(projectId)}/issues/${parseInt(issueId)}/notes`, options);
  }

  edit(projectId, issueId, noteId, options = {}) {
  	if(!options.body) throw new Error('Missing required property: body');

    projectId = Utils.parse(projectId);
    issueId = Utils.parse(issueId);
    noteId = Utils.parse(noteId);

    return this.put(`projects/${Utils.parse(projectId)}/issues/${parseInt(issueId)}/notes/${noteId}`, options);
  }

  remove(projectId, issueId, nodeId) {
    projectId = Utils.parse(projectId);
    issueId = Utils.parse(issueId);
    noteId = Utils.parse(noteId);

    return this.delete(`projects/${Utils.parse(projectId)}/issues/${parseInt(issueId)}/notes/${noteId}`);
  }

  show(projectId, issueId, noteId) {
    projectId = Utils.parse(projectId);
    issueId = Utils.parse(issueId);
    noteId = Utils.parse(noteId);

    return this.get(`projects/${Utils.parse(projectId)}/issues/${parseInt(issueId)}/notes/${noteId}`);
  }
}

module.exports = ProjectIssueNotes;
