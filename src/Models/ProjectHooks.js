const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectHooks extends BaseModel {
  all(projectId) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/hooks`);
  }

  show(projectId, hookId) {
    const [pId, hId] = [projectId, hookId].map(Utils.parse);

    return this.get(`projects/${pId}/hooks/${hId}`);
  }

  add(projectId, url, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/hooks`, Object.assign({ url }, options));
  }

  edit(projectId, hookId, url, options = {}) {
    const [pId, hId] = [projectId, hookId].map(Utils.parse);

    return this.put(`projects/${pId}/hooks/${hId}`, Object.assign({ url }, options));
  }

  remove(projectId, hookId) {
    const [pId, hId] = [projectId, hookId].map(Utils.parse);

    return this.delete(`projects/${pId}/hooks/${hId}`);
  }
}

module.exports = ProjectHooks;
