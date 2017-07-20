const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectNotes extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  all(projectId, issueId, options = {}) {
    Utils.defaultPaging(options);
    [projectId, issueId] = [projectId, issueId].map(Utils.parse);

    return this.get(`projects/${projectId}/issues/${issueId}/notes`, options);
  }

  create(projectId, issueId, options = {}) {
  	if(!options.body) throw new Error('Missing required property: body');

    [projectId, issueId] = [projectId, issueId].map(Utils.parse);

    return this.post(`projects/${projectId}/issues/${issueId}/notes`, options);
  }

  edit(projectId, issueId, noteId, options = {}) {
  	if(!options.body) throw new Error('Missing required property: body');

    [projectId, issueId, noteId] = [projectId, issueId, noteId].map(Utils.parse)

    return this.put(`projects/${projectId}/issues/${issueId}/notes/${noteId}`, options);
  }

  remove(projectId, issueId, nodeId) {
    [projectId, issueId, noteId] = Array.from(arguments).map(Utils.parse)

    return this.delete(`projects/${projectId}/issues/${issueId}/notes/${noteId}`);
  }

  show(projectId, issueId, noteId) {
    [projectId, issueId, noteId] = Array.from(arguments).map(Utils.parse)

    return this.get(`projects/${projectId}/issues/${issueId}/notes/${noteId}`);
  }
}

module.exports = ProjectNotes;
