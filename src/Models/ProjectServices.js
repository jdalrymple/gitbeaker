import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ProjectServices extends BaseModel {
  edit(projectId, serviceName, options = {}) {
    const pId = parse(projectId);

    return this.put(`projects/${pId}/services/${serviceName}`, options);
  }

  remove(projectId, serviceName) {
    const pId = parse(projectId);

    return this.delete(`projects/${pId}/services/${serviceName}`);
  }

  show(projectId, serviceName) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/services/${serviceName}`);
  }
}

export default ProjectServices;
