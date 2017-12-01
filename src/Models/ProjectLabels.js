const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectLabels extends BaseModel {
  all(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/labels`, options);
  }

  create(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/labels`, options);
  }

  edit(projectId, labelName, options = {}) {
    const pId = Utils.parse(projectId);

    return this.put(`projects/${pId}/labels`, Object.assign({ name: labelName }, options));
  }

  remove(projectId, labelName) {
    const pId = Utils.parse(projectId);

    return this.delete(`projects/${pId}/labels`, { name: labelName });
  }

  subscribe(projectId, labelId, options = {}) {
    const [pId, lId] = [projectId, labelId].map(Utils.parse);

    return this.post(`projects/${pId}/issues/${lId}/subscribe`, options);
  }

  unsubscribe(projectId, labelId) {
    const [pId, lId] = [projectId, labelId].map(Utils.parse);

    return this.delete(`projects/${pId}/issues/${lId}/unsubscribe`);
  }
}

module.exports = ProjectLabels;
