import BaseModel from './BaseModel';
import { parse } from '../Utils';

class ProjectMergeRequestCommits extends BaseModel {
  show(projectId, mergerequestId) {
    const [pId, mId] = [projectId, mergerequestId].map(parse);

    return this.get(`projects/${pId}/merge_requests/${mId}/commits`);
  }
}

export default ProjectMergeRequestCommits;
