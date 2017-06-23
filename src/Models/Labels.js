const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class Labels extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  all(options = {}) {
    options.page = options.page || 1;
    options.per_page = options.per_page || 100;

    return this.get(`projects/${Utils.parse(projectId)}/labels`, options);
  }

  create(projectId, options = {}) {
    return this.post(`projects/${Utils.parse(projectId)}/labels`, options);
  }

  edit(projectId, labelName, options = {}) {
    projectId = Utils.parse(projectId);
    options.name = labelName

    return this.put(`projects/${Utils.parse(projectId)}/labels`, options);
  }

  remove(projectId, labelName) {
    projectId = Utils.parse(projectId);

    return this.delete(`projects/${Utils.parse(projectId)}/labels`, { name: labelName });
  }

  subscribe(projectId, labelId, options = {}) {
    projectId = Utils.parse(projectId);
    labelId = Utils.parse(labelId);

    return this.post(`projects/${projectId}/issues/${labelId}/subscribe`, options);
  }

  unsubscribe(projectId, labelId) {
    projectId = Utils.parse(projectId);
    labelId = Utils.parse(labelId);

    return this.delete(`projects/${projectId}/issues/${labelId}/unsubscribe`);
  }
}

module.exports = Labels;
