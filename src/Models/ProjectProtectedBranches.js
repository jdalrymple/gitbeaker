import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ProjectProtectedBranches extends BaseModel {
  all(projectId) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/protected_branches`);
  }

  protect(projectId, branchName, options = {}) {
    const pId = parse(projectId);

    return this.post(`projects/${pId}/protected_branches`, Object.assign(options, { name: branchName }));
  }

  show(projectId, branchName) {
    const pId = parse(projectId);

    return this.get(`projects/${pId}/protected_branches/${branchName}`);
  }

  unprotect(projectId, branchName) {
    const pId = parse(projectId);

    return this.delete(`projects/${pId}/protected_branches/${branchName}`);
  }
}

export default ProjectProtectedBranches;
