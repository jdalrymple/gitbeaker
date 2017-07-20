const BaseModel = require('../BaseModel');
const Utils = require('../Utils');

class ProjectRunners extends BaseModel {
  all(projectId, options = {}) {
    const pId = Utils.parse(projectId);

    if (projectId != null) {
      return this.get(`projects/${pId}/runners`, options);
    }

    return this.get('runners', options);
  }

  enable(projectId, runnerId) {
    const [pId, rId] = [projectId, runnerId].map(Utils.parse);

    return this.post(`projects/${pId}/runners`, {
      runner_id: rId,
    });
  }

  disable(projectId, runnerId) {
    const [pId, rId] = [projectId, runnerId].map(Utils.parse);

    return this.delete(`projects/${pId}/runners/${rId}`);
  }

}

module.exports = ProjectRunners;
