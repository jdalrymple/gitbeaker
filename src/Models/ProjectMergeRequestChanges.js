import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ProjectMergeRequestChanges extends BaseModel {
  show(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(parse);

    return this.get(`projects/${pId}/merge_requests/${mId}/changes`);
  }
}

export default ProjectMergeRequestChanges;
