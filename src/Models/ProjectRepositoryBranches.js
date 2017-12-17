import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ProjectRepositoryBranches extends BaseModel {
  all(projectId) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/branches`);
  }

  create(projectId, branchName, ref) {
    const pId = parse(projectId);

    return this.post(`projects/${pId}/repository/branches`, { branch: branchName, ref });
  }

  protect(projectId, branchName, options = {}) {
    const pId = parse(projectId);

    return this.put(`projects/${pId}/repository/branches/${branchName}/protect`, options);
  }

  remove(projectId, branchName) {
    const pId = parse(projectId);

    return this.delete(`projects/${pId}/repository/branches/${branchName}`);
  }

  show(projectId, branchName) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/repository/branches/${branchName}`);
  }

  unprotect(projectId, branchName) {
    const pId = parse(projectId);

    return this.put(`projects/${pId}/repository/branches/${branchName}/unprotect`);
  }
}

export default ProjectRepositoryBranches;
