import BaseModel from './BaseModel';
import { parse } from '../Utils';
import ProjectRepositoryBranches from './ProjectRepositoryBranches';
import ProjectRepositoryTags from './ProjectRepositoryTags';
import ProjectRepositoryCommits from './ProjectRepositoryCommits';
import ProjectRepositoryFiles from './ProjectRepositoryFiles';

class ProjectRepository extends BaseModel {
  constructor(...args) {
    super(...args);

    this.branches = new ProjectRepositoryBranches(...args);
    this.tags = new ProjectRepositoryTags(...args);
    this.commits = new ProjectRepositoryCommits(...args);
    this.files = new ProjectRepositoryFiles(...args);
  }

  compare(projectId, from, to) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/compare`, { from, to });
  }

  contributors(projectId) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/contributors`);
  }

  showArchive(projectId, { sha }) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/archive`, { sha });
  }

  showBlob(projectId, sha) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/blobs/${sha}`);
  }

  showBlobRaw(projectId, sha) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/blobs/${sha}/raw`);
  }

  tree(projectId, options = {}) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/tree`, options);
  }
}

export default ProjectRepository;
