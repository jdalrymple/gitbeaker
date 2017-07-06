const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectRunners extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  all(projectId, options = {}) {
    if (projectId != null) {
      return this.get(`projects/${Utils.parse(projectId)}/runners`, options);
    } else {
      return this.get("runners", options);
    }
  }

  enable(projectId, runnerId) {
    return this.post(`projects/${Utils.parse(projectId)}/runners`, {
      runner_id: parseInt(runnerId)
    });
  }

  disable(projectId, runnerId) {
    return this.delete(`projects/${Utils.parse(projectId)}/runners/${parseInt(runnerId)}`);
  }

}

module.exports = ProjectRunners;
