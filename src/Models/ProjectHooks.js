const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectHooks extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  list(projectId) {
    return this.get(`projects/${Utils.parse(projectId)}/hooks`);
  }

  show(projectId, hookId) {
    return this.get(`projects/${Utils.parse(projectId)}/hooks/${parseInt(hookId)}`);
  }

  add(projectId, options) {
    if (typeof options === 'string') options = {url: options};
    
    return this.post(`projects/${Utils.parse(projectId)}/hooks`, options);
  }

  update(projectId, hookId, url) {
    return this.put(`projects/${Utils.parse(projectId)}/hooks/${parseInt(hookId)}`,{
      access_level: parseInt(accessLevel)
    });
  }

  remove(projectId, hookId) {    
    return this.delete(`projects/${Utils.parse(projectId)}/hooks/${parseInt(hookId)}`);
  }
}

module.exports = ProjectHooks;
