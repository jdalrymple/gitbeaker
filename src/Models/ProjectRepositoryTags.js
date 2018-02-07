import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ProjectRepositoryTags extends BaseModel {
  all(projectId, options = {}) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/tags`, options);
  }

  create(projectId, options = {}) {
    const pId = parse(projectId);

    return this.post(`projects/${pId}/repository/tags`, options);
  }

  remove(projectId, tagName) {
    const pId = parse(projectId);

    return this.delete(`projects/${pId}/repository/tags/${encodeURI(tagName)}`);
  }

  show(projectId, tagName) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/tags/${encodeURI(tagName)}`);
  }
}

export default ProjectRepositoryTags;
