const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class Labels extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  all(projectId, options = {}) {
    Utils.defaultPaging(options);

    projectId = Utils.parse(projectId);

    return this.get(`projects/${projectId}/labels`, options);
  }

  create(projectId, options = {}) {
    projectId = Utils.parse(projectId);

    return this.post(`projects/${projectId}/labels`, options);
  }

  edit(projectId, labelName, options = {}) {
    projectId = Utils.parse(projectId);
    options.name = labelName

    return this.put(`projects/${projectId}/labels`, options);
  }

  remove(projectId, labelName) {
    projectId = Utils.parse(projectId);

    return this.delete(`projects/${projectId}/labels`, { name: labelName });
  }

  subscribe(projectId, labelId, options = {}) {
    [projectId, labelId] = [projectId, labelId].map(Utils.parse);

    return this.post(`projects/${projectId}/issues/${labelId}/subscribe`, options);
  }

  unsubscribe(projectId, labelId) {
    [projectId, labelId] = [projectId, labelId].map(Utils.parse);

    return this.delete(`projects/${projectId}/issues/${labelId}/unsubscribe`);
  }
}

module.exports = Labels;
