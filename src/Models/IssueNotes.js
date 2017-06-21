const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class IssueNotes extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  all(projectId, issueId, options = {}) {
  	options.page = options.page || 1;
    options.per_page = options.per_page || 100;

    return this.get(`projects/${Utils.parse(projectId)}/issues/${parseInt(issueId)}/notes`, options);
  }
}

module.exports = IssueNotes;
