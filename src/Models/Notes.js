const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class Notes extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  create(projectId, issueId, options = {}) {    
    return this.post(`projects/${Utils.parse(projectId)}/issues/${parseInt(issueId)}/notes`, options);
  }
}

module.exports = Notes;
