import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ProjectTriggers extends BaseModel {
  add(projectId, options = {}) {
    const pId = parse(projectId);

    return this.post(`projects/${pId}/triggers`, options);
  }

  all(projectId) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/triggers`);
  }

  edit(projectId, triggerId, options = {}) {
    const [pId, tId] = [projectId, triggerId].map(parse);

    return this.put(`projects/${pId}/triggers/${tId}`, options);
  }

  remove(projectId, triggerId) {
    const [pId, tId] = [projectId, triggerId].map(parse);

    return this.delete(`projects/${pId}/triggers/${tId}`);
  }

  show(projectId, triggerId) {
    const [pId, tId] = [projectId, triggerId].map(parse);

    return this.get(`projects/${pId}/triggers/${tId}`);
  }
}

export default ProjectTriggers;
