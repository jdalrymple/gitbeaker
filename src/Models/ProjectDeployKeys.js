import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ProjectDeployKeys extends BaseModel {
  add(projectId, options = {}) {
    const pId = parse(projectId);

    return this.post(`projects/${pId}/deploy_keys`, options);
  }

  all(projectId) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/deploy_keys`);
  }

  show(projectId, keyId) {
    const [pId, kId] = [projectId, keyId].map(parse);

    return this.get(`projects/${pId}/deploy_keys/${kId}`);
  }
}

export default ProjectDeployKeys;
