const BaseModel = require('./BaseModel');
const Utils = require('../Utils');

class ProjectRepositoryFiles extends BaseModel {
  create(projectId, filePath, branch, options = {}) {
    const pId = Utils.parse(projectId);

    return this.post(`projects/${pId}/repository/files/${filePath}`, Object.assign({ branch }, options));
  }

  edit(projectId, filePath, branch, options = {}) {
    const pId = Utils.parse(projectId);

    return this.put(`projects/${pId}/repository/files/${filePath}`, Object.assign({ branch }, options));
  }

  remove(projectId, filePath, branch, options = {}) {
    const pId = Utils.parse(projectId);

    return this.delete(`projects/${pId}/repository/files/${filePath}`, Object.assign({ branch }, options));
  }

  show(projectId, filePath, ref) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/files/${filePath}`, { ref });
  }

  showRaw(projectId, filePath, ref) {
    const pId = Utils.parse(projectId);

    return this.get(`projects/${pId}/repository/files/${filePath}/raw`, { ref });
  }
}

module.exports = ProjectRepositoryFiles;
