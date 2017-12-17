import BaseModel from './BaseModel';
import { parse } from '../Utils';
import ProjectRepositoryCommitComments from './ProjectRepositoryCommitComments';

class ProjectRepositoryCommits extends BaseModel {
  constructor(...args) {
    super(...args);

    this.comments = new ProjectRepositoryCommitComments(...args);
  }

  all(projectId) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/commits`);
  }

  diff(projectId, sha) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/commits/${sha}/diff`);
  }

  show(projectId, sha) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/commits/${sha}`);
  }

  statuses(projectId, sha, options = {}) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/commits/${sha}/statuses`, options);
  }
}

export default ProjectRepositoryCommits;
