import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ProjectRepositoryFiles extends BaseModel {
  create(projectId, filePath, branch, options = {}) {
    const pId = parse(projectId);
    const path = parse(filePath);
    const extendedOptions = Object.assign({ branch }, options);

    return this.post(`projects/${pId}/repository/files/${path}`, extendedOptions);
  }

  edit(projectId, filePath, branch, options = {}) {
    const pId = parse(projectId);
    const path = parse(filePath);
    const extendedOptions = Object.assign({ branch }, options);

    return this.put(`projects/${pId}/repository/files/${path}`, extendedOptions);
  }

  remove(projectId, filePath, branch, options = {}) {
    const pId = parse(projectId);
    const path = parse(filePath);
    const extendedOptions = Object.assign({ branch }, options);

    return this.delete(`projects/${pId}/repository/files/${path}`, extendedOptions);
  }

  show(projectId, filePath, ref) {
    const pId = parse(projectId);
    const path = parse(filePath);

    return this.get(`projects/${pId}/repository/files/${path}`, { ref });
  }

  showRaw(projectId, filePath, ref) {
    const pId = parse(projectId);
    const path = parse(filePath);

    return this.get(`projects/${pId}/repository/files/${path}/raw`, { ref });
  }
}

export default ProjectRepositoryFiles;
