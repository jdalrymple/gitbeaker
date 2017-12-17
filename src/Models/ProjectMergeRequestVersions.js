import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ProjectMergeRequestVersions extends BaseModel {
  all(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(parse);

    return this.get(`projects/${pId}/merge_requests/${mId}/versions`);
  }

  show(projectId, mergerequestId, versionId) {
    const [pId, mId, vId] = [projectId, mergerequestId, versionId].map(parse);

    return this.get(`projects/${pId}/merge_requests/${mId}/versions/${vId}`);
  }
}

export default ProjectMergeRequestVersions;
