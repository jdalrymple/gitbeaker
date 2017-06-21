const BaseModel = require('../BaseModel');
const Utils = require('../Utils');
const IssueNotes = require('./IssueNotes');

class ProjectIssues extends BaseModel {
  constructor(...args) {
    super(...args);
    this.notes = IssueNotes;
  }

  list(projectId, options = {}) {
  	options.page = options.page || 1;
    options.per_page = options.per_page || 100;

    return this.get(`projects/${Utils.parseProjectId(projectId)}/issues`, options);
  }
}

module.exports = ProjectIssues;
