import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ProjectRunners extends BaseModel {
  all(projectId, options = {}) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/runners`, options);
  }

  enable(projectId, runnerId) {
    const [pId, rId] = [projectId, runnerId].map(parse);

    return this.post(`projects/${pId}/runners`, {
      runner_id: rId,
    });
  }

  disable(projectId, runnerId) {
    const [pId, rId] = [projectId, runnerId].map(parse);

    return this.delete(`projects/${pId}/runners/${rId}`);
  }
}

export default ProjectRunners;
