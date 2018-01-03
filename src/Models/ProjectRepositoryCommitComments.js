import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ProjectRepositoryCommitComments extends BaseModel {
  all(projectId, sha, options = {}) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/commits/${sha}/comments`, options);
  }

  create(projectId, sha, note, options = {}) {
    const pId = parse(projectId);

    return this.post(`projects/${pId}/repository/commits/${sha}/comments`, Object.assign({ note }, options));
  }
}

export default ProjectRepositoryCommitComments;
