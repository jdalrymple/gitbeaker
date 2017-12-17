import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ProjectRepositoryFiles extends BaseModel {
  create(projectId, filePath, branch, options = {}) {
    const pId = parse(projectId);

    return this.post(`projects/${pId}/repository/files/${filePath}`, Object.assign({ branch }, options));
  }

  edit(projectId, filePath, branch, options = {}) {
    const pId = parse(projectId);

    return this.put(`projects/${pId}/repository/files/${filePath}`, Object.assign({ branch }, options));
  }

  remove(projectId, filePath, branch, options = {}) {
    const pId = parse(projectId);

    return this.delete(`projects/${pId}/repository/files/${filePath}`, Object.assign({ branch }, options));
  }

  show(projectId, filePath, ref) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/files/${filePath}`, { ref });
  }

  showRaw(projectId, filePath, ref) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/files/${filePath}/raw`, { ref });
  }
}

export default ProjectRepositoryFiles;
